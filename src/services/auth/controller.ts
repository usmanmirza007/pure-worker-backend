import { PrismaClient, UserType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { secret_key } from '../../../secret';
const jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");

const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
	const { firstName, lastName, phoneNumber, email, userType, dob, businessName, cacNo, location, address, gender, nationality } = req.body

	if (userType == UserType.FREELANCER || userType == UserType.BUSINESS) {
		if (!businessName || !cacNo || !location || !email || !address) {
			return res.status(400).json({ message: `Request should have all parameters for ${userType}` })
		}
	} else if (userType == UserType.PROVIDER || userType == UserType.CUSTOMER) {
		if (!firstName || !lastName || !phoneNumber || !email) {
			return res.status(400).json({ message: `Request should have all parameters for ${userType}` })
		}
	}

	let type: UserType = userType
	const exsistingUser = await prisma.user.findUnique({
		where: {
			email: email
		}

	})
	if (exsistingUser) {

		return res.status(409).json({ message: "User already registered" })
	}

	if (type == UserType.FREELANCER) {
		type = UserType.FREELANCER
	} else if (type == UserType.PROVIDER) {
		type = UserType.PROVIDER
	} else if (type == UserType.BUSINESS) {
		type = UserType.BUSINESS
	} else {
		type = UserType.CUSTOMER
	}


	try {

		const user = await prisma.user.create({
			data: {
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber,
				address: address,
				businessName: businessName,
				cacNo: cacNo,
				location: location,
				dob: new Date(dob),
				email: email,
				userType: type,
				otp: 0,
				gender: gender,
				nationality: nationality
			}
		})

		if (user) {
			await createOtp(req, res)
		}
	} catch (error) {
		console.log('err', error);
		return res.status(500).json(error)
	}
};

export const createOtp = async (req: Request, res: Response) => {
	const { email } = req.body
	console.log('otp create', req.body);


	if (!email) {
		return res.status(400).json({ message: "Request should have email" })
	}
	try {
		const exsistingUser = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		const rundomOTP = Math.floor(100000 + Math.random() * 9000)
		const mailerConfig = {
			service: 'gmail',
			secure: true,
			port: 465,
			// debug: true,
			auth: {
				user: "pureworkerapp@gmail.com",
				pass: "mphtgdqcapmvmyll"
			}
		};

		const transporter = nodemailer.createTransport(mailerConfig);

		const mailOptions = {
			from: mailerConfig.auth.user,
			to: exsistingUser?.email,
			subject: "Pure Worker",
			// attachments: [
			//     {
			//         filename: 'badge_code.txt',
			//         content: String('123')0
			//     }],
			html: `<body>` +
				`<p style="font-size: 1rem">Your OTP: <span style="font-weight: bold; font-size: 1rem">${rundomOTP}</span></p>` +
				`</body>`
		};

		transporter.sendMail(mailOptions, async function (error: any, info: any) {

			if (error) {
				console.log('mail error', error);
				return res.status(500).json(error)
			} else {
				console.log('success', info);

				const data = await prisma.user.update({
					where: { email: email },
					data: {
						otp: rundomOTP,
					}
				})

				return res.status(200).json({ success: true })
			}
		});

	} catch (error) {
		console.log('err', error);
		return res.status(500).json(error)
	}
};

export const resetOtp = async (req: Request, res: Response) => {
	const { email } = req.body

	if (!email) {
		return res.status(400).json({ message: "Request should have email" })
	}
	try {
		
		const data = await prisma.user.update({
			where: { email: email },
			data: {
				otp: 0,
			}
		})
		return res.status(200).json({ success: true })
	} catch (error) {
		console.log('err', error);
		return res.status(500).json(error)
	}
};


export const verifyOtp = async (req: Request, res: Response) => {
	const { email, otp } = req.body;

	if (!email || !otp) {
		return res.status(400).json({ message: "Incomplet Parameter" });
	} else {
		try {
			const user = await prisma.user.findUnique({ where: { email: email } })
			if (user) {
				if (user.otp === parseInt(otp)) {
					const data = await jwt.sign({
						username: email,
						UserType: user.userType,
						id: user.id,
					}, secret_key.secret, {
						expiresIn: '365d',
						algorithm: secret_key.algorithms[0]
					});
					const verifyUser = await prisma.user.update({
						where: { email: email },
						data: {
							isVerified: true,
						}
					})
					return res.status(200).json({ token: data, type: verifyUser.userType, isverifyied: verifyUser.isVerified })
				} else {
					return res.status(400).json({ message: "OTP does not match" })
				}
			} else {
				return res.status(404).json({ message: "User not found" })
			}
		} catch (error) {
			console.log('dff', error)
			return res.status(500).json({ message: "Something went erong" })
		}
	}
}


export const login = async (req: Request, res: Response) => {
	const { email } = req.body;
	console.log('login', email);

	if (!email) {
		return res.status(400).json({ message: "Incomplet Parameter" });

	} else {
		const user = await prisma.user.findUnique({ where: { email: email } })

		if (user) {

			// if (!user.isVerified) {
			// 	return res.status(401).json({ message: "User is not verified. please verify your email" })
			// }

			try {
				

				// const data = await jwt.sign({
				// 	username: email,
				// 	UserType: user.userType,
				// 	id: customerData.id,

				// }, secret_key.secret, {
				// 	expiresIn: '4h',
				// 	algorithm: secret_key.algorithms[0]
				// });
				// return res.status(200).json({ token: data, type: user.userType })

				await createOtp(req, res)
			} catch (error) {
				console.log('dff', error)
				return res.status(500).json({ message: "Something went erong" })
			}

		} else {
			return res.status(404).json({ message: "User not found" })
		}
	}
}