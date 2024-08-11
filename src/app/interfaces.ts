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

export interface ViewBookingListResponse {
  idbooking: number;
  bookingno: string;
  startdatetime: string;
  enddatetime: string;
  driversinformation: string;
  paymentmethod: string;
  status: string;
  carIdcar: number;
  carIdcarowner: number;
  userIduser: number;
}

export interface EditBookingDetailsRequest {
  bookingno: string;
  startdatetime: string;
  enddatetime: string;
  driversinformation: string;
  paymentmethod: string;
  status: string;
  carIdcar: number;
  carIdcarowner: number;
  userIduser: number;
}

export interface TransactionResponse {
  idtransactions: number;
  amount: number;
  type: string;
  datetime: string;
  bookingno: string;
  carname: string;
  note: string;
}

export interface ViewWalletResponse {
  userId: number;
  walletBalance: number;
  instruction: string;
  paymentStatus: string;
  transactions: TransactionResponse[];
}

export interface FeedbackResponse {
  feedbackId: number;
  rate: number;
  content: string;
  datetime: string;
  bookingId: number;
  carId: number;
  carOwnerId: number;
  userId: number;
  carName: string;
  carModel: string;
  bookingStartDate: string;
  bookingEndDate: string;
}

export interface TopUpRequest {
  userId: number;
  amount: number;
}

export interface WithdrawRequest {
  userId: number;
  amount: number;
}

export interface SearchCarNewRequest{
  address: string;
  startDateTime: string; // ISO 8601 string
  endDateTime: string;   // ISO 8601 string
}
