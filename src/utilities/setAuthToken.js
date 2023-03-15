import axios from 'axios';

const setAuthToken = async (token) => {
   if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   } else {
      axios.defaults.headers.common['Authorization'] = null;
      delete axios.defaults.headers.common['Authorization'];
   }
};

export default setAuthToken;
