import axios from 'axios';
import { API_ROOT } from 'utilities/constants';

export const getAllBoards = async () => {
   const request = await axios.get(`${API_ROOT}/v1/boards`);
   return request.data;
};

export const getDeletedBoards = async () => {
   const request = await axios.get(`${API_ROOT}/v1/boards/deleted`);
   return request.data;
};

export const createNewBoard = async (data) => {
   const request = await axios.post(`${API_ROOT}/v1/boards`, data);
   return request.data;
};

export const fetchBoardDetails = async (id) => {
   const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);
   return request.data;
};

export const updateBoard = async (id, data) => {
   const request = await axios.put(`${API_ROOT}/v1/boards/${id}`, data);
   return request.data;
};

export const createNewColumn = async (data) => {
   const request = await axios.post(`${API_ROOT}/v1/columns`, data);
   return request.data;
};
// Update or remove(_destroy: true) column
export const updateColumn = async (id, data) => {
   const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data);
   return request.data;
};

export const createNewCard = async (data) => {
   const request = await axios.post(`${API_ROOT}/v1/cards`, data);
   return request.data;
};

// Update or remove(_destroy: true) column
export const updateCard = async (id, data) => {
   const request = await axios.put(`${API_ROOT}/v1/cards/${id}`, data);
   return request.data;
};
