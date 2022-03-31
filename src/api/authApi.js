import axios from "axios";
import url from './url.js'

const route = url + "/users";

export const createUser = (userData) => axios.post(route, userData);
export const loginUser = (credentials) => axios.post(route + "/login", credentials);
