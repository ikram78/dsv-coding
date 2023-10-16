interface addressType {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
export interface userData {
  id: number;
  userId: string;
  username: string;
  name: string;
  age: number;
  companyName: string;
  address: addressType;
}
