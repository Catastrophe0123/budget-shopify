import { NextFunction, Request, Response } from 'express';
import { RequestError } from '../utils/errors/request-error';
import { jwtPayload } from '../utils/jwt-payload';
import jwt from 'jsonwebtoken';

declare global {
	namespace Express {
		interface Request {
			currentUser?: jwtPayload;
		}
	}
}

export const currentUser = (
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
		req.currentUser = decodedToken;
		// TODO: should get the user data from the backend
		console.log('decoded token : ', decodedToken);
		return next();
	} else {
		// res.status(401).json({message: ""})
		throw new RequestError('Unauthorised. Session invalid', 401);
	}
};
