export interface Employee {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  department: string;
  post: string;
  photo?: string;
}
