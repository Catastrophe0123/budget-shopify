import {
	prop,
	getModelForClass,
	pre,
	modelOptions,
	DocumentType,
	Ref,
} from '@typegoose/typegoose';
import { ItemClass } from './Item';
import { UserClass } from './User';

@modelOptions({
	options: { customName: 'Stores' },
})
class StoreClass {
	@prop({ required: true, unique: true })
	public name!: string;

	// @prop()
	// public ownerName?: string;

	@prop({ ref: () => UserClass })
	public owner?: Ref<UserClass>;

	@prop({ ref: () => ItemClass })
	public inventory?: Ref<ItemClass>[];

	// TODO: HAVE TO FILL WITH MORE DATA
}

const Store = getModelForClass(StoreClass);

export { Store };
