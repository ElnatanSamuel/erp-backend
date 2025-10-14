import { HydratedDocument } from 'mongoose';
export declare class TaxDefinition {
    taxType: string;
    percent: number;
}
export type TaxDefinitionDocument = HydratedDocument<TaxDefinition>;
export declare const TaxDefinitionSchema: import("mongoose").Schema<TaxDefinition, import("mongoose").Model<TaxDefinition, any, any, any, import("mongoose").Document<unknown, any, TaxDefinition, any, {}> & TaxDefinition & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TaxDefinition, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TaxDefinition>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TaxDefinition> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=tax-definition.schema.d.ts.map