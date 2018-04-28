import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burgerbuilder-86f26.firebaseio.com/'
});


export default instance;
