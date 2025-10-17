import { HydratedDocument } from 'mongoose';
export declare class StaffApplication {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    position?: string;
    qualification?: string;
    experience?: string;
    coverLetter?: string;
    resumeUrl?: string;
    status?: string;
    appliedDate: Date;
}
export type StaffApplicationDocument = HydratedDocument<StaffApplication>;
export declare const StaffApplicationSchema: import("mongoose").Schema<StaffApplication, import("mongoose").Model<StaffApplication, any, any, any, import("mongoose").Document<unknown, any, StaffApplication, any, {}> & StaffApplication & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StaffApplication, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StaffApplication>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<StaffApplication> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=staff-application.schema.d.ts.map