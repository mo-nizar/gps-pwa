"use client";
import 'dotenv/config';

export const ENVS = {
  GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};


export const COMMON_ERROR = 'Something went wrong, Please try again later.'
