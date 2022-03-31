import axios from "axios";
import url from "./url.js";

const route = url + "/cards";

export const createCard = (cardData, token) =>
  axios.post(route, cardData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const fetchCards = (columnId, token) =>
  axios.get(route + "/column/" + columnId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const deleteCard = (cardId, token) =>
  axios.delete(route + "/" + cardId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const updateCard = (cardId, cardData, token) =>
  axios.patch(route + "/" + cardId, cardData, {
    headers: { Authorization: "Bearer " + token },
  });
