import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalaryDefinition, SalaryDefinitionDocument } from './schemas/salary-definition.schema';
import { TaxDefinition, TaxDefinitionDocument } from './schemas/tax-definition.schema';
import { Payslip, PayslipDocument } from './schemas/payslip.schema';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(SalaryDefinition.name) private model: Model<SalaryDefinitionDocument>,
    @InjectModel(TaxDefinition.name) private taxModel: Model<TaxDefinitionDocument>,
    @InjectModel(Payslip.name) private payslipModel: Model<PayslipDocument>,
  ) {}

  async createDefinition(input: {
    title: string;
    level: string;
    basicSalary: number;
    allowance: number;
    grossSalary: number;
    deductions: number;
    netSalary: number;
  }) {
    const doc = new this.model({
      title: input.title,
      level: input.level,
      basicSalary: Number(input.basicSalary),
      allowance: Number(input.allowance),
      grossSalary: Number(input.grossSalary),
      deductions: Number(input.deductions),
      netSalary: Number(input.netSalary),
    });
    await doc.save();
    return { id: String(doc._id) };
  }

  // ---- Tax Definitions ----
  async createTaxDefinition(input: { taxType: string; percent: number }) {
    const taxType = (input.taxType || '').trim();
    const percent = Number(input.percent);
    if (!taxType) throw new BadRequestException('Tax type is required');
    if (!Number.isFinite(percent) || percent < 0) throw new BadRequestException('Percent must be a non-negative number');
    const doc = new this.taxModel({ taxType, percent });
    await doc.save();
    return { id: String(doc._id) };
  }

  async listTaxDefinitions({ page = 1, limit = 50 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.taxModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.taxModel.countDocuments().exec(),
    ]);
    return {
      items: items.map((x) => ({ id: String(x._id), taxType: x.taxType, percent: x.percent })),
      total,
      page,
      limit,
    };
  }

  async getTaxDefinition(id: string) {
    const x = await this.taxModel.findById(id).lean();
    if (!x) return null;
    return { id: String(x._id), taxType: x.taxType, percent: x.percent };
  }

  async updateTaxDefinition(id: string, input: Partial<{ taxType: string; percent: number }>) {
    const update: any = {};
    if (input.taxType !== undefined) {
      const v = String(input.taxType).trim();
      if (!v) throw new BadRequestException('Tax type is required');
      update.taxType = v;
    }
    if (input.percent !== undefined) {
      const p = Number(input.percent);
      if (!Number.isFinite(p) || p < 0) throw new BadRequestException('Percent must be a non-negative number');
      update.percent = p;
    }
    await this.taxModel.findByIdAndUpdate(id, { $set: update }).exec();
    return { ok: true } as const;
  }

  async deleteTaxDefinition(id: string) {
    await this.taxModel.findByIdAndDelete(id).exec();
    return { ok: true } as const;
  }

  // ---- Payslips ----
  async createPayslip(input: Partial<Payslip>) {
    const numbers = [
      'basicSalary','housingAllowance','transportAllowance','utilityAllowance','productivityAllowance','communicationAllowance','inconvenienceAllowance','grossSalary','taxPayee','employeePension','totalDeduction','netSalary',
    ] as const;
    for (const k of numbers) {
      const v = Number((input as any)[k] ?? 0);
      if (!Number.isFinite(v) || v < 0) throw new BadRequestException(`${k} must be a non-negative number`);
    }
    const grossSalary = Number(input.grossSalary ?? 0);
    const totalDeduction = Number(input.totalDeduction ?? 0);
    const netSalary = Number(input.netSalary ?? Math.max(0, grossSalary - totalDeduction));
    const doc = new this.payslipModel({
      staffName: input.staffName,
      title: input.title,
      level: input.level,
      paymentName: (input as any).paymentName,
      payMonth: (input as any).payMonth,
      payYear: (input as any).payYear,
      basicSalary: Number(input.basicSalary ?? 0),
      housingAllowance: Number(input.housingAllowance ?? 0),
      transportAllowance: Number(input.transportAllowance ?? 0),
      utilityAllowance: Number(input.utilityAllowance ?? 0),
      productivityAllowance: Number(input.productivityAllowance ?? 0),
      communicationAllowance: Number(input.communicationAllowance ?? 0),
      inconvenienceAllowance: Number(input.inconvenienceAllowance ?? 0),
      grossSalary,
      taxPayee: Number(input.taxPayee ?? 0),
      employeePension: Number(input.employeePension ?? 0),
      totalDeduction,
      netSalary,
    } as any);
    await doc.save();
    return { id: String(doc._id) };
  }

  async listPayslips({ page = 1, limit = 50 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.payslipModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.payslipModel.countDocuments().exec(),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        staffName: x.staffName,
        title: x.title,
        level: x.level,
        paymentName: (x as any).paymentName,
        payMonth: (x as any).payMonth,
        payYear: (x as any).payYear,
        basicSalary: x.basicSalary,
        allowances: (x.housingAllowance||0)+(x.transportAllowance||0)+(x.utilityAllowance||0)+(x.productivityAllowance||0)+(x.communicationAllowance||0)+(x.inconvenienceAllowance||0),
        grossSalary: x.grossSalary,
        deduction: x.totalDeduction,
        netSalary: x.netSalary,
        createdAt: (x as any).createdAt,
      })),
      total,
      page,
      limit,
    };
  }

  async getPayslip(id: string) {
    const x = await this.payslipModel.findById(id).lean();
    if (!x) return null;
    return { id: String(x._id), ...x } as any;
  }

  async updatePayslip(id: string, input: Partial<Payslip>) {
    const update: any = {};
    const allowed: (keyof Payslip)[] = [
      'staffName','title','level','basicSalary','housingAllowance','transportAllowance','utilityAllowance','productivityAllowance','communicationAllowance','inconvenienceAllowance','grossSalary','taxPayee','employeePension','totalDeduction','netSalary',
    ];
    for (const k of allowed) {
      if (k in input && (input as any)[k] !== undefined) {
        const numeric = ['basicSalary','housingAllowance','transportAllowance','utilityAllowance','productivityAllowance','communicationAllowance','inconvenienceAllowance','grossSalary','taxPayee','employeePension','totalDeduction','netSalary'];
        if ((numeric as string[]).includes(k as string)) {
          const v = Number((input as any)[k]);
          if (!Number.isFinite(v) || v < 0) throw new BadRequestException(`${k} must be a non-negative number`);
          (update as any)[k] = v;
        } else {
          (update as any)[k] = (input as any)[k];
        }
      }
    }
    await this.payslipModel.findByIdAndUpdate(id, { $set: update }).exec();
    return { ok: true } as const;
  }

  async deletePayslip(id: string) {
    await this.payslipModel.findByIdAndDelete(id).exec();
    return { ok: true } as const;
  }

  async createPayslipsBatch(items: Partial<Payslip>[], date?: string) {
    if (!Array.isArray(items) || items.length === 0) return { created: 0, ids: [] as string[] };
    const docs: any[] = [];
    const dt = date ? new Date(date) : undefined;
    const useDate = dt && !isNaN(dt.getTime()) ? dt : undefined;
    for (const input of items) {
      const numbers = [
        'basicSalary','housingAllowance','transportAllowance','utilityAllowance','productivityAllowance','communicationAllowance','inconvenienceAllowance','grossSalary','taxPayee','employeePension','totalDeduction','netSalary',
      ] as const;
      const accum: any = {};
      for (const k of numbers) {
        const v = Number((input as any)[k] ?? 0);
        if (!Number.isFinite(v) || v < 0) throw new BadRequestException(`${k} must be a non-negative number`);
        accum[k] = v;
      }
      const grossSalary = Number((input as any).grossSalary ?? 0);
      const totalDeduction = Number((input as any).totalDeduction ?? 0);
      const netSalary = Number((input as any).netSalary ?? Math.max(0, grossSalary - totalDeduction));
      // derive month/year from date if not provided
      let payMonth = (input as any).payMonth as string | undefined;
      let payYear = (input as any).payYear as string | undefined;
      if ((!payMonth || !payYear) && useDate) {
        const m = useDate.toLocaleString('en-US', { month: 'long' });
        const y = String(useDate.getFullYear());
        payMonth = payMonth || m;
        payYear = payYear || y;
      }

      const candidate = {
        staffName: (input as any).staffName,
        title: (input as any).title,
        level: (input as any).level,
        paymentName: (input as any).paymentName,
        payMonth,
        payYear,
        basicSalary: accum.basicSalary,
        housingAllowance: accum.housingAllowance,
        transportAllowance: accum.transportAllowance,
        utilityAllowance: accum.utilityAllowance,
        productivityAllowance: accum.productivityAllowance,
        communicationAllowance: accum.communicationAllowance,
        inconvenienceAllowance: accum.inconvenienceAllowance,
        grossSalary,
        taxPayee: accum.taxPayee,
        employeePension: accum.employeePension,
        totalDeduction,
        netSalary,
        ...(useDate ? { createdAt: useDate } : {}),
      } as any;

      // skip duplicates by staffName + payMonth + payYear (+ paymentName if provided)
      const criteria: any = {
        staffName: candidate.staffName,
        ...(candidate.payMonth ? { payMonth: candidate.payMonth } : {}),
        ...(candidate.payYear ? { payYear: candidate.payYear } : {}),
      };
      if (candidate.paymentName) criteria.paymentName = candidate.paymentName;
      const exists = await this.payslipModel.findOne(criteria).lean();
      if (exists) continue;
      docs.push(candidate);
    }
    const res = await this.payslipModel.insertMany(docs);
    return { created: res.length, ids: res.map((d) => String((d as any)._id)) };
  }

  async getDefinition(id: string) {
    const x = await this.model.findById(id).lean();
    if (!x) return null;
    return {
      id: String(x._id),
      title: x.title,
      level: x.level,
      basicSalary: x.basicSalary,
      allowance: x.allowance,
      grossSalary: x.grossSalary,
      deductions: x.deductions,
      netSalary: x.netSalary,
    };
  }

  async updateDefinition(id: string, input: Partial<{
    title: string;
    level: string;
    basicSalary: number;
    allowance: number;
    grossSalary: number;
    deductions: number;
    netSalary: number;
  }>) {
    const update: any = {};
    for (const k of ['title','level','basicSalary','allowance','grossSalary','deductions','netSalary'] as const) {
      if (k in input && (input as any)[k] !== undefined) update[k] = (input as any)[k];
    }
    await this.model.findByIdAndUpdate(id, { $set: update }).exec();
    return { ok: true } as const;
  }

  async deleteDefinition(id: string) {
    await this.model.findByIdAndDelete(id).exec();
    return { ok: true } as const;
  }

  async listDefinitions({ page = 1, limit = 50 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.model.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments().exec(),
    ]);
    return {
      items: items.map((x) => ({
        id: String(x._id),
        title: x.title,
        level: x.level,
        basicSalary: x.basicSalary,
        allowance: x.allowance,
        grossSalary: x.grossSalary,
        deductions: x.deductions,
        netSalary: x.netSalary,
      })),
      total,
      page,
      limit,
    };
  }

  async kpis() {
    // Compute gross/net from Salary Definitions
    const sums = await this.model.aggregate([
      {
        $group: {
          _id: null,
          gross: { $sum: '$grossSalary' },
          net: { $sum: '$netSalary' },
        },
      },
    ]);
    const gross = sums[0]?.gross || 0;
    const net = sums[0]?.net || 0;
    // Keep tax and loan constants per product requirement
    const tax = 500_000;
    const loan = 150_000;
    return { gross, tax, loan, net };
  }

  async summary() {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const currentYear = new Date().getFullYear();
    
    // Aggregate payslips by month for the current year
    const payslipData = await this.payslipModel.aggregate([
      {
        $match: {
          payYear: String(currentYear),
        },
      },
      {
        $group: {
          _id: '$payMonth',
          totalGross: { $sum: '$grossSalary' },
          totalNet: { $sum: '$netSalary' },
          totalTax: { $sum: '$taxPayee' },
          totalPension: { $sum: '$employeePension' },
        },
      },
    ]);

    // Create a map of month -> data
    const dataMap = new Map<string, { gross: number; net: number; tax: number; loan: number }>();
    for (const item of payslipData) {
      const monthName = item._id;
      dataMap.set(monthName, {
        gross: item.totalGross || 0,
        net: item.totalNet || 0,
        tax: item.totalTax || 0,
        loan: item.totalPension || 0, // Using pension as "loan" for chart
      });
    }

    // Build series with actual data or zeros
    const series = months.map((month) => {
      const data = dataMap.get(month);
      if (data) {
        return data;
      }
      return { gross: 0, net: 0, tax: 0, loan: 0 };
    });

    return { months, series };
  }
}
