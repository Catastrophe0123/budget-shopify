import {
	prop,
	getModelForClass,
	pre,
	modelOptions,
	DocumentType,
} from '@typegoose/typegoose';
import { Password } from '../utils/Password';

// roles are : CUSTOMER, ADMIN, SUPER-ADMIN?
@modelOptions({
	options: { customName: 'Users' },
	schemaOptions: {
		toJSON: {
			transform: (doc: DocumentType<UserClass>, ret) => {
				delete ret.password;
				delete ret.__v;
			},
		},
	},
})
@pre<UserClass>('save', async function (next) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	next();
})
export class UserClass {
	@prop({ required: true, unique: true })
	public email!: string;

	@prop({ required: true, minlength: 4 })
	public password!: string;

	@prop({ default: 'CUSTOMER' })
	public role?: string;
}

const User = getModelForClass(UserClass);

export { User };
// let User = await Userschema.create({ name: 'Kitty' });
