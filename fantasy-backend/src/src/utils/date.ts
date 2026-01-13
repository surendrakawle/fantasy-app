export function getFinancialYear(date = new Date()): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return month <= 3 ? `${year - 1}-${year}` : `${year}-${year + 1}`;
  }
  
  export function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
  