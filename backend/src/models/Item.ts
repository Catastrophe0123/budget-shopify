import {
	prop,
	getModelForClass,
	pre,
	modelOptions,
	DocumentType,
	Ref,
} from '@typegoose/typegoose';
import { UserClass } from './User';

@modelOptions({
	options: { customName: 'Stores' },
})
export class ItemClass {
	@prop({ required: true })
	public name!: string;

	@prop({ required: true })
	public price!: string;

	@prop({ required: true })
	public category!: string;

	@prop()
	public quantityAvailable?: number;

	@prop({ default: 'https://semantic-ui.com/images/wireframe/image.png' })
	public image?: string;

	// @prop()
	// public ownerName?: string;

	@prop({ ref: () => UserClass })
	public owner: Ref<UserClass>;
	// TODO: HAVE TO FILL WITH MORE DATA
}

const Item = getModelForClass(ItemClass);

export { Item };
