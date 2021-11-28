import axios from 'axios';

export const API_ENDPOINTS = {
  addUser: '/add-user',
  createScope: '/create-scope',
  getRandomKeyword: 'get-random-keyword',
  checkAnswer: '/check-answer',
  updateScore: '/update-score',
  leaderBoard: '/leaderboard',
  resetScope: '/reset-scope',
};

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://guessipedia.herokuapp.com/'
    : 'http://localhost:5000/';
console.log(`Server URL: ${baseURL}`);
export const API = axios.create({
  baseURL,
});
