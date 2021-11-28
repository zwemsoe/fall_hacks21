const wiki = require("wikijs").default;

const getRandom = (arr, n) => {
  const result = [];
  while (n) {
    const picked = arr[Math.floor(Math.random() * arr.length)];
    if (!result.includes(picked)) {
      result.push(picked);
      n--;
    }
  }
  return result;
};

const getPageLinks = async (title) => {
  try {
    const page = await wiki().page(title);
    return page.links();
  } catch (e) {
    console.log("Error fetching page: ", e);
    throw new Error(e);
  }
};

module.exports = {
  getRandom,
  getPageLinks,
};
