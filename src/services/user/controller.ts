import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { categories } from '../../../provider/serviceData';

const prisma = new PrismaClient()

export const userDetail = async (req: Request, res: Response) => {
	const userId = (req as any).user.id

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		})

		return res.status(200).json(user)
	} catch (error) {
		console.log('err', error);
		return res.status(500).json(error)
	}
}


export const getCategory = async (req: Request, res: Response, next: NextFunction) => {

	try {

		// for (const cate of categories) {
		// 	const category = await prisma.category.create({ data: { name: cate.categoryName } })
		// 	for await (const subCatory of cate.subCatory) {
		// 		await prisma.subCategory.create({ data: { label: subCatory.label, value: subCatory.value, categoryId: category.id } })
		// 	}
		// }
		const category = await prisma.category.findMany()

		return res.status(200).json(category);
	} catch (error) {
		return res.status(500).json(error);
	}
}

export const getSubcategoryFromCategory = async (req: Request, res: Response, next: NextFunction) => {

	const { categoryId } = req.params

	try {
		const subCategory = await prisma.subCategory.findMany({ where: { categoryId: parseInt(categoryId) } })
		return res.status(200).json(subCategory);
	} catch (error) {
		return res.status(500).json(error);
	}
}

export const createService = async (req: Request, res: Response, next: NextFunction) => {

	const { serviceId, description, servicesDescription, servicePrice, city, potfolioFirst, potfolioSecond, idNumber, businessName, cac, scheduleDate, appointmentTime,
		addressFirst, fullNameFirst, relationFirst, emailFirst, phoneNumberFirst, fullNameSecond, relationSecond, emailSecond, phoneNumberSecond, addressSecond, } = req.body
	const userId = (req as any).user.id

	var profilePicture: any = ''
	var serviceImageFirst: any = ''
	var serviceImageSecond: any = ''
	var serviceImageThird: any = ''
	const images = JSON.parse(JSON.stringify(req.files))
	let currentService: any
	if (serviceId) {
		currentService = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } })
		if (currentService) {
			profilePicture = currentService?.profilePicture
			serviceImageFirst = currentService?.serviceImageFirst
			serviceImageSecond = currentService?.serviceImageSecond
			serviceImageThird = currentService?.serviceImageThird
		}
	}


	if (Array.isArray(images?.profilePicture) && images?.profilePicture[0].filename) {
		profilePicture = images?.profilePicture[0].filename
	}
	if (Array.isArray(images?.serviceImageFirst) && images?.serviceImageFirst[0].filename) {
		serviceImageFirst = images?.serviceImageFirst[0].filename
	}
	if (Array.isArray(images?.serviceImageSecond) && images?.serviceImageSecond[0].filename) {
		serviceImageSecond = images?.serviceImageSecond[0].filename
	}
	if (Array.isArray(images?.serviceImageThird) && images?.serviceImageThird[0].filename) {
		serviceImageThird = images?.serviceImageThird[0].filename
	}
	try {
		let service: any
		if (serviceId) {
			service = await prisma.service.update({
				where: { id: parseInt(serviceId) },
				data: {
					description: currentService?.description ? currentService.description : description,
					serviceDetail: JSON.stringify(currentService?.serviceDetail),
					price: JSON.stringify(currentService?.price),
					city: currentService?.city ? currentService.city : city,
					potfolioFirst: currentService?.potfolioFirst ? currentService.potfolioFirst : potfolioFirst,
					potfolioSecond: currentService?.potfolioSecond ? currentService.potfolioSecond : potfolioSecond,
					profilePicture: profilePicture,
					serviceImageFirst: serviceImageFirst,
					serviceImageSecond: serviceImageSecond,
					serviceImageThird: serviceImageThird,
					addressFirst: currentService?.addressFirst ? currentService.addressFirst : addressFirst,
					fullNameFirst: currentService?.fullNameFirst ? currentService.fullNameFirst : fullNameFirst,
					relationFirst: currentService?.relationFirst ? currentService.relationFirst : relationFirst,
					emailFirst: currentService?.emailFirst ? currentService.emailFirst : emailFirst,
					phoneNumberFirst: currentService?.phoneNumberFirst ? currentService.phoneNumberFirst : phoneNumberFirst,
					fullNameSecond: currentService?.fullNameSecond ? currentService.fullNameSecond : fullNameSecond,
					relationSecond: currentService?.relationSecond ? currentService.relationSecond : relationSecond,
					emailSecond: currentService?.emailSecond ? currentService.emailSecond : emailSecond,
					phoneNumberSecond: currentService?.phoneNumberSecond ? currentService.phoneNumberSecond : phoneNumberSecond,
					addressSecond: currentService?.addressSecond ? currentService.addressSecond : addressSecond,
					idNumber: idNumber ? idNumber:  currentService.idNumber ,
					businessName: businessName ? businessName : currentService.businessName ,
					cac: cac ? cac : currentService.cac ,
					scheduleDate: scheduleDate ? scheduleDate : currentService?.scheduleDate,
					appointmentTime: appointmentTime ? appointmentTime : currentService?.appointmentTime ,
					userId: userId,
				}
			})
		} else {
			service = await prisma.service.create({
				data: {
					description: description,
					serviceDetail: servicesDescription,
					price: servicePrice,
					city: city,
					potfolioFirst: potfolioFirst,
					potfolioSecond: potfolioSecond,
					profilePicture: profilePicture,
					serviceImageFirst: serviceImageFirst,
					serviceImageSecond: serviceImageSecond,
					serviceImageThird: serviceImageThird,
					userId: userId,
				}
			})
		}

		return res.status(200).json({ serviceId: service.id });
	} catch (error) {
		console.log('error', error);

		return res.status(500).json(error);
	}
}
