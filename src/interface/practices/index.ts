export interface DateFormat {
  epoch: number;
  iso_8601_datetime_tz: string;
}

export interface Practices {
  code: string;
  nameGP: string;
  nameCompany: string;
  city: string;
  startYear: string;
  startMonth: string;
  ''?: string;
}
