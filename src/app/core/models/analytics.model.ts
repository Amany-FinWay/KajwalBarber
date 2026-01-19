export interface Analytics{
    summary: Summary;
    topEmployees: TopEmployees[];
    topClients: TopClient[];
}

export interface Summary {
  todayGrossRevenue: number;
  todayNetRevenue: number;
  monthGrossRevenue: number;
  monthNetRevenue: number;
  yearGrossRevenue: number;
  yearNetRevenue: number;
  todayCutsCount: number;
  monthCutsCount: number;
  yearCutsCount: number;
}

export interface TopEmployees {
  employeeId: number;
  employeeName: string;
  cutsCount: number;
  grossRevenue: number;
  commissionAmount: number;
  netRevenue: number;
}

export interface TopClient {
  clientName: string;
  visitsCount: number;
  totalSpent: number;
  lastVisit: Date;
}
