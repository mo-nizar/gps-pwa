"use client";
import 'dotenv/config';

export const ENVS = {
  GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};


export const COMMON_ERROR = 'Something went wrong, Please try again later.'
export const EXCLUDE_EDIT = ['service', 'createdDate', 'updatedDate', 'previousStatus', 'key', 'user', 'address', 'id', 'date', 'time', "email", 'status', 'dateTime'];
export const EXCLUDE_SHOW =['service', 'createdDate', 'updatedDate', 'previousStatus', 'key', 'user', 'dateTime'];

export const EXCLUDE_USER_EDIT = [...EXCLUDE_EDIT ,'type'];


export interface FormattedKeys {
  id: string;
  service: string;
  user: string;
  key: string;
  surgeon: string;
  email: string;
  phone: string;
  patientsCount: string;
  poNumber: string;
  hospitalName: string;
  streetName: string;
  locality: string;
  postTown: string;
  postCode: string;
  address: string;
  date: string;
  time: string;
  type: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  previousStatus: string;
}


export const FORMATTED_KEYS: FormattedKeys = {
  "id": "Id",
  "service": "Service",
  "user": "User",
  "key": "Key",
  "surgeon": "Surgeon",
  "email": "Email",
  "phone": "Phone",
  "patientsCount": "Patients Count",
  "poNumber": "Po Number",
  "hospitalName": "Hospital Name",
  "streetName": "Street Name",
  "locality": "Locality",
  "postTown": "Post Town",
  "postCode": "Post Code",
  "address": "Address",
  "date": "Date",
  "time": "Time",
  "type": "Type",
  "status": "Status",
  "createdDate": "Created Date",
  "updatedDate": "Updated Date",
  "previousStatus": "Previous Status"
}


export const inputKeys = {
  ADDRESS: 'address',
  SURGEON:'surgeon',
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  PO_NUMBER: 'poNumber',
  PATIENTS_COUNT: 'patientsCount',
  DATE_TIME: 'dateTime',
  SERVICE: 'service'
};