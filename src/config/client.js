import axios from 'axios';
// import { retrieveToken } from 'src/hooks/AuthHooks/AuthHooks';

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain',
    // 'Access-Control-Allow-Credentials': true,
  },
  withCredentials: false,
});

export const client = request;

export const errorModifier = (e) => e?.response?.data?.message || 'Some error Occoured';
