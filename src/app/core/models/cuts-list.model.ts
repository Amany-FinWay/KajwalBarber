export interface CutsList {
  businessDate: Date;
  employees: CutBarber[];
  totalGrossRevenue: number;
  totalCommission: number;
  totalNetRevenue: number;
}

export interface CreateCut {
  employeeId: number;
  serviceName: string;
  price: number;
  clientName: string;
  businessDate: Date;
  cutDateTime?: Date;
}

export interface Cut {
  cutId: number;
  serviceName: string;
  price: number;
  clientName: string;
  time: Date;
}

export interface CutBarber {
  employeeId: number;
  employeeName: string;
  cuts: Cut[];
  grossRevenue: number;
  commissionAmount: number;
  netRevenue: number;
  fixedAmount: number;
}


/* ============================ Create Response =========================== */
export interface CutCreateResponse {
  isValid: Boolean;
  message: string;
  data: ResponseData;
}

export interface ResponseData {
  businessDate: Date;
  employees: CutBarber[];
  totalGrossRevenue: number;
  totalCommission: number;
  totalNetRevenue: number;
}