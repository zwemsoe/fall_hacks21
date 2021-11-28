const { API, API_ENDPOINTS } = require('./config');

const {
  addUser,
  createScope,
  getRandomKeyword,
  checkAnswer,
  updateScore,
  leaderBoard,
  resetScope,
} = API_ENDPOINTS;

const printApiError = (api, err) => console.log(`${api} error: ${err}`);

export const addUserReq = async data => {
  try {
    const res = await API.post(addUser, data);
    return res.data;
  } catch (e) {
    printApiError(addUser, e);
  }
};

export const createScopeReq = async data => {
  try {
    const res = await API.post(createScope, data);
    return res.data;
  } catch (e) {
    printApiError(createScope, e);
  }
};

export const getRandomKeywordReq = async data => {
  try {
    const res = await API.post(getRandomKeyword, data);
    return res.data;
  } catch (e) {
    printApiError(checkAnswer, e);
  }
};

export const checkAnswerReq = async data => {
  try {
    const res = await API.post(checkAnswer, data);
    return res.data;
  } catch (e) {
    printApiError(checkAnswer, e);
  }
};

export const updateScoreReq = async data => {
  try {
    const res = await API.post(updateScore, data);
    return res.data;
  } catch (e) {
    printApiError(updateScore, e);
  }
};

export const leaderBoardReq = async () => {
  try {
    const res = await API.get(leaderBoard);
    return res.data ?? { users: [] };
  } catch (e) {
    printApiError(leaderBoard, e);
  }
};

export const resetScopeReq = async data => {
  try {
    const res = await API.post(resetScope, data);
    return res.data;
  } catch (e) {
    printApiError(leaderBoard, e);
  }
};
