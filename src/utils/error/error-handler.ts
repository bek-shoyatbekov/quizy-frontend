/** @format */

import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";

const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.log("Axios error", error.response?.data);
    return error.response?.data?.message || error.response?.data.error;
  }
  if (error instanceof FirebaseError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
};

export default handleError;
