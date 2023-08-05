import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient()

export const getAllProviderProfile = async (req: Request, res: Response, next: NextFunction) => {

	try {
		const servicesProfile = await prisma.service.findMany({include: {ServicePotfolio: true}})

		return res.status(200).json(servicesProfile);
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
