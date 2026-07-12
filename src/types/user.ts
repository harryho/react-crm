export type Address = {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  countryCode: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
};

export type User = {
  userId: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phone?: string;
  isActive: boolean;
  addresses: Address[];
};
