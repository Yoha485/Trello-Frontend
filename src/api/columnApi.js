import axios from "axios";
import url from "./url.js";

const route = url + "/columns";

export const createColumn = (columnName, token) =>
  axios.post(route, columnName, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const fetchColumns = (token) =>
  axios.get(route, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const deleteColumn = (columnId, token) =>
  axios.delete(route + "/" + columnId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const updateColumn = (columnId, newName, token) =>
  axios.patch(route + "/" + columnId, newName, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
