if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const wiki = require("wikijs").default;
const userStore = require("./user-store");
const wikiStore = require("./wiki-store");
const { getRandom } = require("./helper");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static(path.join(__dirname, "frontend/build")));

const verifyKey = (req, res, next) => {
  const { key } = req.body;
  if (key === process.env.SECRET_KEY) {
    return next();
  }
  return res.send("good try");
};

app.post("/reset-scope", verifyKey, (req, res) => {
  const { id } = req.body;
  const updated = userStore.updateUserScope(id, "");
  return res.status(200).send({ user: updated });
});

app.post("/add-user", verifyKey, (req, res) => {
  const { name } = req.body;
  const added = userStore.addUser(name);
  return res.status(200).send({ user: added });
});

app.post("/create-scope", verifyKey, async (req, res) => {
  const { title, id } = req.body;
  const exists = wikiStore.getWiki(title);
  if (!exists) {
    try {
      await wikiStore.addWiki(title);
    } catch (err) {
      return res
        .status(400)
        .send({ error: "It's not a valid wikipedia page." });
    }
  }
  const updated = userStore.updateUserScope(id, title);
  if (updated) {
    return res.status(200).send({ user: updated });
  } else {
    return res.status(400).send({ error: "User not found." });
  }
});

app.post("/get-random-keyword", verifyKey, async (req, res) => {
  try {
    const { id } = req.body;
    const scope = userStore.getUser(id).scope;
    const wiki_keywords = wikiStore.getWiki(scope);
    const random_keywords = await wiki().random(10);
    const random_correct_keywords = getRandom(wiki_keywords, 5);

    const picked = getRandom(
      [...random_keywords, ...random_correct_keywords],
      1
    );
    return res.status(200).send({ keyword: picked[0] });
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

app.post("/check-answer", verifyKey, (req, res) => {
  const { keyword, included, id } = req.body;
  const scope = userStore.getUser(id).scope;
  const wiki_keywords = wikiStore.getWiki(scope);
  const answer = wiki_keywords.includes(keyword);
  return res.status(200).send({ correct: answer === included });
});

app.post("/update-score", verifyKey, (req, res) => {
  const { id, newScore } = req.body;
  const updated = userStore.updateUserScore(id, newScore);
  if (updated) {
    return res.status(200).send({ user: updated });
  } else {
    return res.status(400).send({ error: "User not found." });
  }
});

app.get("/leaderboard", (req, res) => {
  return res.status(200).send({ users: userStore.getLeaderboard() });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

// send back a 404 error for any unknown api route
app.use((req, res, next) => {
  res.send("404");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
