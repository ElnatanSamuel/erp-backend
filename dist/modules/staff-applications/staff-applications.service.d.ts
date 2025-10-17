import { Model } from 'mongoose';
import { StaffApplication, StaffApplicationDocument } from './schemas/staff-application.schema';
export declare class StaffApplicationsService {
    private model;
    constructor(model: Model<StaffApplicationDocument>);
    create(input: Partial<StaffApplication>): Promise<{
        id: string;
    }>;
    list({ q, status, page, limit }: {
        q?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            fullName: string;
            email: string;
            phone: string;
            position: string | undefined;
            status: string | undefined;
            appliedDate: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    get(id: string): Promise<any>;
    update(id: string, input: Partial<StaffApplication>): Promise<{
        _id: import("mongoose").Types.ObjectId;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, keyof Paths> & Paths;
        $clearModifiedPaths: () => import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $clone: () => import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $createModifiedPathsSnapshot: () => import("mongoose").ModifiedPathsSnapshot;
        $getAllSubdocs: () => import("mongoose").Document[];
        $ignore: (path: string) => void;
        $isDefault: (path?: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => import("mongoose").Document[];
        $inc: (path: string | string[], val?: number) => import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
        $markValid: (path: string) => void;
        $model: {
            <ModelType = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(name: string): ModelType;
            <ModelType = Model<StaffApplication, {}, {}, {}, import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(): ModelType;
        };
        $op: "save" | "validate" | "remove" | null;
        $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
        };
        $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
        baseModelName?: string | undefined;
        collection: import("mongoose").FlattenMaps<import("mongoose").Collection<import("bson").Document>>;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions) => import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, StaffApplication, "deleteOne", Record<string, never>>;
        depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, Paths>;
        directModifiedPaths: () => Array<string>;
        equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>, {}>) => boolean;
        errors?: import("mongoose").Error.ValidationError | undefined;
        get: {
            <T extends keyof StaffApplication>(path: T, type?: any, options?: any): StaffApplication[T];
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        id: any;
        increment: () => import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        invalidate: {
            <T extends keyof StaffApplication>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
        };
        isDirectModified: {
            <T extends keyof StaffApplication>(path: T | T[]): boolean;
            (path: string | Array<string>): boolean;
        };
        isDirectSelected: {
            <T extends keyof StaffApplication>(path: T): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T extends keyof StaffApplication>(path: T): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T extends keyof StaffApplication>(path?: T | T[] | undefined, options?: {
                ignoreAtomics?: boolean;
            } | null): boolean;
            (path?: string | Array<string>, options?: {
                ignoreAtomics?: boolean;
            } | null): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T extends keyof StaffApplication>(path: T): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T extends keyof StaffApplication>(path: T, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType = Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(name: string): ModelType;
            <ModelType = Model<StaffApplication, {}, {}, {}, import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(): ModelType;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => Array<string>;
        overwrite: (obj: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $parent: () => import("mongoose").Document | undefined;
        populate: {
            <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, Paths>>;
            <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, Paths>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, unknown, "find", Record<string, never>>;
        save: (options?: import("mongoose").SaveOptions) => Promise<import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: number]: unknown;
            [x: symbol]: unknown;
            [x: string]: unknown;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            [x: number]: unknown;
            [x: symbol]: unknown;
            [x: string]: unknown;
        }>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
            [x: number]: unknown;
            [x: symbol]: unknown;
            [x: string]: unknown;
        }> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>>;
        set: {
            <T extends keyof StaffApplication>(path: T, val: StaffApplication[T], type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
        };
        toJSON: {
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
                virtuals: true;
                flattenObjectIds: true;
            }): Omit<{
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
            }, "__v">;
            (options: import("mongoose").ToObjectOptions & {
                virtuals: true;
                flattenObjectIds: true;
            }): {
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
                virtuals: true;
            }): Omit<StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            }, "__v">;
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
                flattenObjectIds: true;
            }): {
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
            };
            (options: import("mongoose").ToObjectOptions & {
                virtuals: true;
            }): StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
            }): Omit<StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            }, "__v">;
            (options?: import("mongoose").ToObjectOptions & {
                flattenMaps?: true;
                flattenObjectIds?: false;
            }): import("mongoose").FlattenMaps<StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>;
            (options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: false;
            }): import("mongoose").FlattenMaps<StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>;
            (options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: true;
            }): {
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                flattenMaps: false;
            }): StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                flattenMaps: false;
                flattenObjectIds: true;
            }): {
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
                __v: number;
            };
            <T = StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options?: import("mongoose").ToObjectOptions & {
                flattenMaps?: true;
                flattenObjectIds?: false;
            }): import("mongoose").FlattenMaps<T>;
            <T = StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: false;
            }): import("mongoose").FlattenMaps<T>;
            <T = StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: true;
            }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T>>;
            <T = StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options: import("mongoose").ToObjectOptions & {
                flattenMaps: false;
            }): T;
            <T = StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options: import("mongoose").ToObjectOptions & {
                flattenMaps: false;
                flattenObjectIds: true;
            }): import("mongoose").ObjectIdToString<T>;
        };
        toObject: {
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
                virtuals: true;
                flattenObjectIds: true;
            }): Omit<{
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
            }, "__v">;
            (options: import("mongoose").ToObjectOptions & {
                virtuals: true;
                flattenObjectIds: true;
            }): {
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
                flattenObjectIds: true;
            }): Omit<{
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
            }, "__v">;
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
                virtuals: true;
            }): Omit<StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            }, "__v">;
            (options: import("mongoose").ToObjectOptions & {
                virtuals: true;
            }): StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
            }): Omit<StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            }, "__v">;
            (options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: true;
            }): {
                fullName: string;
                email: string;
                phone: string;
                address?: string | undefined;
                position?: string | undefined;
                qualification?: string | undefined;
                experience?: string | undefined;
                coverLetter?: string | undefined;
                resumeUrl?: string | undefined;
                status?: string | undefined;
                appliedDate: Date;
                _id: string;
                __v: number;
            };
            (options?: import("mongoose").ToObjectOptions): StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            <T>(options?: import("mongoose").ToObjectOptions): import("mongoose").Require_id<T> & {
                __v: number;
            };
        };
        unmarkModified: {
            <T extends keyof StaffApplication>(path: T): void;
            (path: string): void;
        };
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, StaffApplication, {}, {}> & StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, unknown, "find", Record<string, never>>;
        validate: {
            <T extends keyof StaffApplication>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): Promise<void>;
            (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
                [k: string]: any;
            }): import("mongoose").Error.ValidationError | null;
            <T extends keyof StaffApplication>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
            (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
        };
        fullName: string;
        email: string;
        phone: string;
        address?: string | undefined;
        position?: string | undefined;
        qualification?: string | undefined;
        experience?: string | undefined;
        coverLetter?: string | undefined;
        resumeUrl?: string | undefined;
        status?: string | undefined;
        appliedDate: Date;
        __v: number;
    }>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
    countAll(): Promise<number>;
    getStats(): Promise<{
        pending: number;
        reviewed: number;
        approved: number;
        rejected: number;
    }>;
}
//# sourceMappingURL=staff-applications.service.d.ts.map