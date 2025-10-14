import { HydratedDocument } from 'mongoose';
export declare class Training {
    description: string;
    trainingType?: string;
    duration?: string;
    mode?: string;
    date: Date;
    staff?: string[];
    status?: 'To-do' | 'Inprogress' | 'Completed' | string;
}
export type TrainingDocument = HydratedDocument<Training>;
export declare const TrainingSchema: import("mongoose").Schema<Training, import("mongoose").Model<Training, any, any, any, import("mongoose").Document<unknown, any, Training, any, {}> & Training & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Training, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Training>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Training> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=training.schema.d.ts.map