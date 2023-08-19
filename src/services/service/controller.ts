import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient()

export const getAllProviderProfile = async (req: Request, res: Response, next: NextFunction) => {
	const userId = (req as any).user.id

	try {
		const favorite = await prisma.favoriteServiceProvider.findMany({ where: { userId: userId } })
		const servicesProfiles = await prisma.service.findMany({ include: { ServicePotfolio: true } })
		const allServiceProviderWithUserFavorite: any = []
		for (const servicesProfile of servicesProfiles) {
			if (Array.isArray(favorite) && favorite.length) {
				const isFavorite = favorite.filter((item) => servicesProfile.id == item.serviceId)
				if (isFavorite.length) {
					allServiceProviderWithUserFavorite.push({
						...servicesProfile,
						isFavorite: true
					})
				} else {
					allServiceProviderWithUserFavorite.push({
						...servicesProfile,
						isFavorite: false
					})
				}

			} else {
				allServiceProviderWithUserFavorite.push(servicesProfile)
			}
		}

		return res.status(200).json(allServiceProviderWithUserFavorite);
	} catch (error) {
		console.log('err', error);

		return res.status(500).json(error);
	}
}

export const getSingleProviderService = async (req: Request, res: Response, next: NextFunction) => {
	const userId = (req as any).user.id
	const { serviceId } = req.params
	
	try {
		const user = await prisma.service.findUnique({where: {id: parseInt(serviceId)}, include: {ServicePotfolio: true, User: true} })
		return res.status(200).json(user);
	} catch (error) {
		console.log('err', error);

		return res.status(500).json(error);
	}
}

export const getSingleProviderServices = async (req: Request, res: Response, next: NextFunction) => {

	const { serviceId } = req.params
	
	try {
		const service = await prisma.service.findUnique({where: {id: parseInt(serviceId)} })
		if (service?.userId) {
			
			const allService = await prisma.service.findMany({where: {userId: service?.userId}})
			return res.status(200).json(allService);
		} else {
			return res.status(404).json({message: 'Service not found'});
		}
	} catch (error) {
		console.log('err', error);

		return res.status(500).json(error);
	}
}

export const getAllPotfolio = async (req: Request, res: Response, next: NextFunction) => {

	try {
		const servicesPotfolio = await prisma.servicePotfolio.findMany()

		return res.status(200).json(servicesPotfolio);
	} catch (error) {
		console.log('err', error);

		return res.status(500).json(error);
	}
}


export const favoriteServiceProvider = async (req: Request, res: Response, next: NextFunction) => {

	const userId = (req as any).user.id
	const { serviceId, favorite } = req.body
	if (!serviceId)
		return res
			.status(400)
			.json({ message: 'Request should have serviceId' });

	try {

		if (favorite) {

			await prisma.favoriteServiceProvider.upsert({
				where: {
					unique_favorite_products: {
						userId: userId,
						serviceId: serviceId
					}
				},
				create: {
					userId: userId,
					serviceId: serviceId
				},
				update: {
					userId: userId,
					serviceId: serviceId
				},
			})

			return res.status(200).json({ success: true });
		} else {

			await prisma.favoriteServiceProvider.delete({
				where: {
					unique_favorite_products: {
						userId: userId,
						serviceId: serviceId
					}
				}
			})
			return res.status(200).json({ success: false });
		}


	} catch (error) {
		return res.status(500).json(error);
	}
}

export const getFavoriteServiceProvider = async (req: Request, res: Response, next: NextFunction) => {

	const userId = (req as any).user.id
	try {
		const favoriteLists = await prisma.favoriteServiceProvider.findMany({ where: { userId: userId }, include: { service: true } })
		const data = favoriteLists.map((item) => {
			return {
				...item.service,
				isFavorite: true
			}
		})
		return res.status(200).json(data);

	} catch (error) {
		console.log('error', error);
		return res.status(500).json(error);
	}
}