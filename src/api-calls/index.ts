/** @format */

import axios from "axios";
import configs from "../configs";

const api = axios.create({
  baseURL: configs.api.baseUrl + "/api/v1",
});

export default api;
