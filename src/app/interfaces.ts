export interface ProfileData {
  iduser: number; // Chuyển thành number
  name: string;
  dateofbirth: string;
  nationalidno: number; // Giữ nguyên kiểu number
  phoneno: string;
  email: string;
  address: string;
  drivinglicense: string;
  password: string;
  // role: string;
  // wallet: number; // Giữ nguyên kiểu number
}

export interface SearchCarRequest {
  address: string;
}

export interface Props {
  params: { idcar: number };
}


export interface Car {
  idcar: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  status: string;
  address: string;
  numberofseats: number;
  productionyears: number;
  tranmissiontype?: string;
  fueltype?: string;
  mileage: number;
  fuelconsumption: number;
  baseprice: number;
  deposite: number;
  descripton: string;
  images?: string;
  idcarowner: number;

}

export interface SearchCarResponse {
  car: Car;
  bookingNumber: number;
  rate: number;
}


export interface Termofuse {
  idcar: number;
  nameterms: string;
}

export interface Additionalfunctions {
  idcar: number;
  namefunctions: string;
}

export interface Car {
  idcar: number;
  make: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  status: string;
  address: string;
}

export interface ViewCarDetailsResponse {
  car: Car;
  termsOfUse: Termofuse;
  additionalFunctions: Additionalfunctions;
}