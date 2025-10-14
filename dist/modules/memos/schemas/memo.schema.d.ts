import { HydratedDocument } from 'mongoose';
export declare class Memo {
    title: string;
    sentFrom?: string;
    sentTo?: string;
    date: Date;
    hasAttachment?: boolean;
    type?: 'Sent' | 'Received' | string;
    action?: string;
    attachmentType?: string;
    body?: string;
    cc?: string[];
    attachmentName?: string;
    attachmentUrl?: string;
}
export type MemoDocument = HydratedDocument<Memo>;
export declare const MemoSchema: import("mongoose").Schema<Memo, import("mongoose").Model<Memo, any, any, any, import("mongoose").Document<unknown, any, Memo, any, {}> & Memo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Memo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Memo>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Memo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=memo.schema.d.ts.map