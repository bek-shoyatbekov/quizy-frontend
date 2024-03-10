/** @format */

import api from "..";

const login = async (firebaseToken: string, method?: "login" | "signup") => {
  try {
    const response = await api.post(
      "/login" + "?method=" + method,
      {},
      {
        headers: {
          authorization: firebaseToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error logging in", err);
    throw err;
  }
};

export default login;
