import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient()

export const userDetail = async (req: Request, res: Response) => {
	const users = (req as any).user
	//   const userId = (req as any).user.payload.id
	// 
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: users.id
			}
		})

		return res.status(200).json(user)
	} catch (error) {
		console.log('err', error);
		return res.status(500).json(error)
	}
}
