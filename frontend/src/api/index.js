// API utility for backend requests
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
});

export default API;
