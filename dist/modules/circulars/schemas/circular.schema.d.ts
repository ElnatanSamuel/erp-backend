import { HydratedDocument } from 'mongoose';
export declare class Circular {
    title: string;
    body?: string;
    sentFrom?: string;
    sentTo?: string;
    date: Date;
    type?: string;
}
export type CircularDocument = HydratedDocument<Circular>;
export declare const CircularSchema: import("mongoose").Schema<Circular, import("mongoose").Model<Circular, any, any, any, import("mongoose").Document<unknown, any, Circular, any, {}> & Circular & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Circular, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Circular>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Circular> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=circular.schema.d.ts.map