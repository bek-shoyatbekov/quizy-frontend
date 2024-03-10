/** @format */

import { initializeApp } from "firebase/app";
import configs from "../../configs";
import { getAuth } from "firebase/auth";

const firebaseConfig = configs.firebase;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
