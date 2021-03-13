import { Request, Response } from 'express';
import { User } from '../models/User';
import { RequestError } from '../utils/errors/request-error';
import jwt from 'jsonwebtoken';
import { Password } from '../utils/Password';
import { Store } from '../models/Store';
import { mongoose } from '@typegoose/typegoose';

// create
export const registerUser = async (req: Request, res: Response) => {
	// res.send('hello wrodlsd');
	let { email, password, role } = req.body;
	if (role === null) {
		role = 'CUSTOMER';
	}

	// let storeid = req.query.store;

	// body contains username and password and store name
	const userExists = await User.findOne({ email: email });
	if (userExists) {
		// TODO: have to check for shop id too later.
		throw new RequestError('Email already in use', 400);
	}
	if (req.query.store) {
		let storeid = mongoose.Types.ObjectId(req.query.store as string);
		const store = await Store.findById(storeid);
		if (!store) throw new RequestError('Store doesnt exist', 400);
		if (role === 'CUSTOMER') {
			let user = await User.create({
				email,
				password,
				role,
			});
			await user.save();
			const payload = {
				id: user.id,
				email: user.email,
				role: user.role,
				store: store.id,
			};

			let token = jwt.sign(payload, process.env.JWT_SECRET!, {
				expiresIn: '1h',
			});

			req.session = { jwt: token };

			return res.status(201).json({
				message: 'New User Created successfully',
				user,
				token: token,
			});
		}
	}

	// CREATE ADMIN
	let user = await User.create({ email, password, role });
	await user.save();
	let newStore = await Store.create({ owner: user.id });
	await newStore.save();
	const payload = {
		id: user.id,
		email: user.email,
		role: user.role,
		store: newStore.id,
		// TODO: Should have shop id too
	};

	let token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

	req.session = { jwt: token };

	return res.status(201).json({
		message: 'New User Created successfully',
		user,
		store: newStore.id,
		token: token,
	});
};

export const loginuser = async (req: Request, res: Response) => {
	let { email, password, role } = req.body;
	if (!role) {
		role = 'CUSTOMER';
	}

	const dbuser = await User.findOne({ email: email });
	if (!dbuser) {
		// TODO: have to check for shop id too later.
		throw new RequestError('Invalid Credentials', 400);
	}
	// user exists
	const bool = await Password.compare(dbuser.password, password);
	if (bool) {
		// matching
		// let store = await Store.
		const payload = {
			id: dbuser.id,
			email: dbuser.email,
			role: dbuser.role,
			// store:
			// TODO: Should have shop id too
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET!, {
			expiresIn: '1h',
		});
		req.session = { jwt: token };

		const store = await Store.findOne({ owner: dbuser.id });

		return res.status(200).json({
			message: 'login successful',
			user: dbuser,
			store: store?.id,
			token,
		});
	} else {
		throw new RequestError('Invalid Credentials', 400);
	}
};
