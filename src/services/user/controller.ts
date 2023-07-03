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

	const { serviceId, description, serviceDetail, price, city, potfolioFirst, potfolioSecond, idNumber, businessName, cac, scheduleDate, appointmentTime } = req.body
	const userId = (req as any).user.id

	const images = JSON.parse(JSON.stringify(req.files))
	var profilePicture = ''
	var serviceImageFirst = ''
	var serviceImageSecond = ''
	var serviceImageThird = ''

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
		if (serviceId) {
			await prisma.service.update({
				where: { id: parseInt(serviceId) },
				data: {
					description: description,
					serviceDetail: serviceDetail,
					price: price,
					city: city,
					potfolioFirst: potfolioFirst,
					potfolioSecond: potfolioSecond,
					idNumber: idNumber,
					businessName: businessName,
					cac: cac,
					scheduleDate: scheduleDate,
					appointmentTime: appointmentTime,
					profilePicture: profilePicture,
					serviceImageFirst: serviceImageFirst,
					serviceImageSecond: serviceImageSecond,
					serviceImageThird: serviceImageThird,
					userId: userId
				}
			})
		} else {
			await prisma.service.create({
				data: {
					description: description,
					serviceDetail: serviceDetail,
					price: price,
					city: city,
					potfolioFirst: potfolioFirst,
					potfolioSecond: potfolioSecond,
					idNumber: idNumber,
					businessName: businessName,
					cac: cac,
					scheduleDate: scheduleDate,
					appointmentTime: appointmentTime,
					profilePicture: profilePicture,
					serviceImageFirst: serviceImageFirst,
					serviceImageSecond: serviceImageSecond,
					serviceImageThird: serviceImageThird,
					userId: userId
				}
			})
		}

		return res.status(200).json({ success: true });
	} catch (error) {
		return res.status(500).json(error);
	}
}