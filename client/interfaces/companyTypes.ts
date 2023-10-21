export interface User {
  _id: string;
  company: string;
  email: string;
  password: string;
  plan: string;
  billing: {
    company: string;
    orgNumber: string;
    address: string;
    email: string;
    phone: number;
  };
  departments: {
    department: string;
    manager: string;
  }[];
}
