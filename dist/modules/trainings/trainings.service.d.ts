import { Model } from 'mongoose';
import { Training, TrainingDocument } from './schemas/training.schema';
export declare class TrainingsService {
    private model;
    constructor(model: Model<TrainingDocument>);
    create(input: Partial<Training>): Promise<{
        readonly id: string;
    }>;
    list({ q, page, limit }: {
        q?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            description: string;
            trainingType: string | undefined;
            duration: string | undefined;
            mode: string | undefined;
            date: Date;
            staff: string[] | undefined;
            status: string | undefined;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    kpis(): Promise<{
        readonly totalRequests: number;
        readonly totalStaffTrained: number;
        readonly totalTrainingDone: number;
        readonly trainingRatePct: number;
    }>;
    get(id: string): Promise<any>;
    setStatus(id: string, status: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=trainings.service.d.ts.map