import axios from "axios";
import url from "./url.js";

const route = url + "/user";

export const updateUser = (userData, token) =>
  axios.patch(route, userData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const getUser = (token) =>
  axios.get(route, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
