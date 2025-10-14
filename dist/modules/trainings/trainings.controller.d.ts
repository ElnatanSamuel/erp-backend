import { TrainingsService } from './trainings.service';
export declare class TrainingsController {
    private readonly svc;
    constructor(svc: TrainingsService);
    create(body: any): Promise<{
        readonly id: string;
    }>;
    list(q?: string, pageRaw?: string, limitRaw?: string): Promise<{
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
    setStatus(id: string, body: {
        status: string;
    }): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=trainings.controller.d.ts.map