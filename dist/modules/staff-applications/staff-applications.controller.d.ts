import { StaffApplicationsService } from './staff-applications.service';
export declare class StaffApplicationsController {
    private readonly svc;
    constructor(svc: StaffApplicationsService);
    uploadFile(file: any): Promise<{
        name: any;
        url: string;
    }>;
    create(body: any): Promise<{
        id: string;
    }>;
    list(q?: string, status?: string, pageRaw?: string, limitRaw?: string): Promise<{
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
    update(id: string, body: any): Promise<{
        _id: import("mongoose").Types.ObjectId;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths> | undefined) => Omit<import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, keyof Paths> & Paths;
        $clearModifiedPaths: () => import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $clone: () => import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
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
        $inc: (path: string | string[], val?: number) => import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
        $markValid: (path: string) => void;
        $model: {
            <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(name: string): ModelType;
            <ModelType = import("mongoose").Model<import("./schemas/staff-application.schema").StaffApplication, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(): ModelType;
        };
        $op: "save" | "validate" | "remove" | null;
        $restoreModifiedPathsSnapshot: (snapshot: import("mongoose").ModifiedPathsSnapshot) => import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
        };
        $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
        baseModelName?: string | undefined;
        collection: import("mongoose").FlattenMaps<import("mongoose").Collection<import("bson").Document>>;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions) => import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("./schemas/staff-application.schema").StaffApplication, "deleteOne", Record<string, never>>;
        depopulate: <Paths = {}>(path?: string | string[]) => import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, Paths>;
        directModifiedPaths: () => Array<string>;
        equals: (doc: import("mongoose").Document<unknown, any, any, Record<string, any>, {}>) => boolean;
        errors?: import("mongoose").Error.ValidationError | undefined;
        get: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T, type?: any, options?: any): import("./schemas/staff-application.schema").StaffApplication[T];
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        id: any;
        increment: () => import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        invalidate: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
        };
        isDirectModified: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T | T[]): boolean;
            (path: string | Array<string>): boolean;
        };
        isDirectSelected: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path?: T | T[] | undefined, options?: {
                ignoreAtomics?: boolean;
            } | null): boolean;
            (path?: string | Array<string>, options?: {
                ignoreAtomics?: boolean;
            } | null): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown, {}, {}> & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(name: string): ModelType;
            <ModelType = import("mongoose").Model<import("./schemas/staff-application.schema").StaffApplication, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, any>>(): ModelType;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => Array<string>;
        overwrite: (obj: import("mongoose").AnyObject) => import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        $parent: () => import("mongoose").Document | undefined;
        populate: {
            <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, Paths>>;
            <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }, Paths>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, unknown, "find", Record<string, never>>;
        save: (options?: import("mongoose").SaveOptions) => Promise<import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
        schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
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
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T, val: import("./schemas/staff-application.schema").StaffApplication[T], type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (value: string | Record<string, any>): import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
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
            }): Omit<import("./schemas/staff-application.schema").StaffApplication & {
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
            }): import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
            }): Omit<import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            }, "__v">;
            (options?: import("mongoose").ToObjectOptions & {
                flattenMaps?: true;
                flattenObjectIds?: false;
            }): import("mongoose").FlattenMaps<import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>;
            (options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: false;
            }): import("mongoose").FlattenMaps<import("./schemas/staff-application.schema").StaffApplication & {
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
            }): import("./schemas/staff-application.schema").StaffApplication & {
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
            <T = import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options?: import("mongoose").ToObjectOptions & {
                flattenMaps?: true;
                flattenObjectIds?: false;
            }): import("mongoose").FlattenMaps<T>;
            <T = import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: false;
            }): import("mongoose").FlattenMaps<T>;
            <T = import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options: import("mongoose").ToObjectOptions & {
                flattenObjectIds: true;
            }): import("mongoose").ObjectIdToString<import("mongoose").FlattenMaps<T>>;
            <T = import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }>(options: import("mongoose").ToObjectOptions & {
                flattenMaps: false;
            }): T;
            <T = import("./schemas/staff-application.schema").StaffApplication & {
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
            }): Omit<import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            }, "__v">;
            (options: import("mongoose").ToObjectOptions & {
                virtuals: true;
            }): import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            (options: import("mongoose").ToObjectOptions & {
                versionKey: false;
            }): Omit<import("./schemas/staff-application.schema").StaffApplication & {
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
            (options?: import("mongoose").ToObjectOptions): import("./schemas/staff-application.schema").StaffApplication & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            <T>(options?: import("mongoose").ToObjectOptions): import("mongoose").Require_id<T> & {
                __v: number;
            };
        };
        unmarkModified: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(path: T): void;
            (path: string): void;
        };
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("mongoose").Document<unknown, {}, import("./schemas/staff-application.schema").StaffApplication, {}, {}> & import("./schemas/staff-application.schema").StaffApplication & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, unknown, "find", Record<string, never>>;
        validate: {
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): Promise<void>;
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
            <T extends keyof import("./schemas/staff-application.schema").StaffApplication>(pathsToValidate?: T | T[] | undefined, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
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
}
//# sourceMappingURL=staff-applications.controller.d.ts.map