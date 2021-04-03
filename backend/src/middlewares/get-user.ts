import { NextFunction, Request, Response } from 'express';
import { RequestError } from '../utils/errors/request-error';
import { jwtPayload } from '../utils/jwt-payload';
import jwt from 'jsonwebtoken';
import { Store } from '../models/Store';
import { DocumentType } from '@typegoose/typegoose';
import { User, UserClass } from '../models/User';

declare global {
	namespace Express {
		interface Request {
			currentUser?: DocumentType<UserClass> | undefined;
		}
	}
}

export const currentUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// get the current user
	// authenticated route
	// console.log(req.session);
	if (req.session?.jwt) {
		const token = req.session.jwt;
		let decodedToken = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as jwtPayload;

		// find the store associated with the user
		// const store = await Store.findOne({})

		const currUser = await User.findById(decodedToken.id);

		// req.currentUser = decodedToken;
		req.currentUser = currUser;
		// TODO: should get the user data from the backend
		console.log('decoded token : ', decodedToken);
		return next();
	} else {
		// res.status(401).json({message: ""})
		throw new RequestError('Unauthorised. Session invalid', 401);
	}
};
