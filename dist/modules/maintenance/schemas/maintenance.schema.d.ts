import { HydratedDocument } from 'mongoose';
export type MaintenanceDocument = HydratedDocument<Maintenance>;
export declare class Maintenance {
    title: string;
    date: Date;
    status?: 'Scheduled' | 'Completed' | 'Pending' | 'Overdue' | string;
    description?: string;
    itemName?: string;
    itemNumber?: string;
    maintenanceType?: string;
    recurringOption?: string;
    attachmentName?: string;
    attachmentUrl?: string;
}
export declare const MaintenanceSchema: import("mongoose").Schema<Maintenance, import("mongoose").Model<Maintenance, any, any, any, import("mongoose").Document<unknown, any, Maintenance, any, {}> & Maintenance & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Maintenance, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Maintenance>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Maintenance> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=maintenance.schema.d.ts.map