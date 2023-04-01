import axios from 'axios';
import { API_ROOT } from 'utilities/constants';

export const getAllBoards = async () => {
   const request = await axios.get(`${API_ROOT}/v1/boards`, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};

export const getDeletedBoards = async () => {
   const request = await axios.get(`${API_ROOT}/v1/boards/deleted`, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};

export const createNewBoard = async (data) => {
   const request = await axios.post(`${API_ROOT}/v1/boards`, data, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};

export const fetchBoardDetails = async (id) => {
   const request = await axios.get(`${API_ROOT}/v1/boards/${id}`, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};

export const updateBoard = async (id, data) => {
   const request = await axios.put(`${API_ROOT}/v1/boards/${id}`, data, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};

export const createNewColumn = async (data) => {
   const request = await axios.post(`${API_ROOT}/v1/columns`, data, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};
// Update or remove(_destroy: true) column
export const updateColumn = async (id, data) => {
   const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};

export const createNewCard = async (data) => {
   const request = await axios.post(`${API_ROOT}/v1/cards`, data, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};

// Update or remove(_destroy: true) column
export const updateCard = async (id, data) => {
   const request = await axios.put(`${API_ROOT}/v1/cards/${id}`, data, {
      withCredentials: true,
      credentials: 'include',
   });
   return request.data;
};
