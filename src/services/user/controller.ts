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
		console.log('err', error);

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

	const { serviceId, profilePicture, description, servicesDescription, servicePrice, city, idNumber, businessName, cac, scheduleDate, appointmentTime,
		addressFirst, fullNameFirst, relationFirst, emailFirst, phoneNumberFirst, fullNameSecond, relationSecond, emailSecond, phoneNumberSecond, addressSecond, potfolios } = req.body

	const userId = (req as any).user.id
		
	let currentService: any
	try {

		if (serviceId) {
			currentService = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } })
		}

		let service: any
		if (serviceId) {
			service = await prisma.service.update({
				where: { id: parseInt(serviceId) },
				data: {
					description: currentService?.description ? currentService.description : description,
					serviceDetail: JSON.stringify(currentService?.serviceDetail),
					price: JSON.stringify(currentService?.price),
					city: currentService?.city ? currentService.city : city,
					profilePicture: profilePicture,
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
					idNumber: idNumber ? idNumber : currentService.idNumber,
					businessName: businessName ? businessName : currentService.businessName,
					cac: cac ? cac : currentService.cac,
					scheduleDate: scheduleDate ? scheduleDate?.toString() : currentService?.scheduleDate?.toString(),
					appointmentTime: appointmentTime ? appointmentTime?.toString() : currentService?.appointmentTime?.toString(),
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
					profilePicture: profilePicture,
					userId: userId,
					
				}
			})
		}

		if (service?.id && Array.isArray(potfolios) && potfolios.length) {
			for (const potfolio of potfolios) {
				await prisma.servicePotfolio.create({
					data: {
						serviceId: service.id,
						description: potfolio.shortDescription,
						potfolioImageFirst: potfolio.potfolioImages?.length ? potfolio.potfolioImages[0] : '',
						potfolioImageSecond: potfolio.potfolioImages?.length > 1 ? potfolio.potfolioImages[1] : '',
						potfolioImageThird: potfolio.potfolioImages?.length > 2 ? potfolio.potfolioImages[2] : ''
					}
				})
			}
		}
		return res.status(200).json({ serviceId: service.id });
	} catch (error) {
		console.log('error', error);

		return res.status(500).json(error);
	}
}
