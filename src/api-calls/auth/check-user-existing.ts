/** @format */

import api from "..";

const login = async (firebaseToken: string) => {
  try {
    const response = await api.post(
      "/check-user",
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
