export interface Company {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  website: string;
  companyId: number;
}
