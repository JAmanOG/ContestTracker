import express from "express";
import cors from "cors";
import axios from "axios";
import { codeChef } from "./codeChef.js";
import dotenv from "dotenv";
import { XMLParser } from "fast-xml-parser";
import { searchVideos } from "./ytapi.js";
// create express app
const app = express();
dotenv.config();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// enable cors
app.use(cors());

// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/contest/:platform", async (req, res) => {
  const platform = req.params.platform;

  console.log(`${platform} Contest`);

  try {
    if (platform === "codeforces") {
      const response = await axios.get(
        "https://codeforces.com/api/contest.list"
      );

      if (response.data.status !== "OK") {
        throw new Error("Invalid API response from Codeforces");
      }

      // console.log(response.data);

      // Get current time in Unix timestamp
      const currentTime = Math.floor(Date.now() / 1000);

      // Filter upcoming contests
      const upcomingContests = response.data.result.filter(
        (contest) =>
          contest.phase === "BEFORE" && contest.startTimeSeconds > currentTime
      );

      // Filter finished contests
      const finishedContests = response.data.result.filter(
        (contest) => contest.phase === "FINISHED"
      );

      // console.log("Upcoming Contests:", upcomingContests);
      // console.log("Finished Contests:", finishedContests);

      res.json({
        platform: "codeforces",
        contests: {
          upcoming: upcomingContests,
          finished: finishedContests,
        },
      });
    } else if (platform === "codechef") {
      console.log("CodeChef Contest");
      const contests = await codeChef();
      res.send(contests);
    } else {
      res.status(400).send("Invalid platform");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the contest list.");
  }
});

app.post("/api/contests/codeChef", async (req, res) => {
  console.log("CodeChef Contest Request Received");
  const { query = {} } = req.body;
  console.log("Query:", query);

  const username = process.env.CLIST_USERNAME;
  const api_key = process.env.CLIST_API_KEY;

  if (!username || !api_key) {
    return res.status(400).json({ error: "Username or API key not found" });
  }

  try {
    const response = await axios.get(`https://clist.by/api/v4/contest/`, {
      params: {
        username,
        api_key,
        upcoming: query.upcoming || "true",
        host: "codechef.com",
        order_by: query.order_by || "start",
        limit: query.limit || 5,
        start__gte: query?.start__gte || "",
        end__lte: query?.end__lte || "",
      },
      headers: {
        Accept: "application/json", // Request JSON response
      },
    });

    res.json(response.data); // Send JSON response
  } catch (error) {
    console.error("Error fetching contests:", error.message);
    res.status(500).json({ error: "An error occurred while fetching contests." });
  }
});


app.post("/api/contests/leetcode", async (req, res) => {
  console.log("LeetCode Contest Request Received");

  const { query = {} } = req.body;
  console.log("Query:", query);

  const username = process.env.CLIST_USERNAME;
  const api_key = process.env.CLIST_API_KEY;

  if (!username || !api_key) {
    return res.status(400).json({ error: "Username or API key not found" });
  }

  try {
    const response = await axios.get(`https://clist.by/api/v4/contest/`, {
      params: {
        username,
        api_key,
        upcoming: query.upcoming || "true",
        host: "leetcode.com",
        order_by: query.order_by || "start",
        limit: query.limit || 5,
        start__gte: query?.start__gte || "",
        end__lte: query?.end__lte || "",
      },
      headers: {
        Accept: "application/json", // Request JSON response
      },
    });

    res.json(response.data); // Send JSON response
  } catch (error) {
    console.error("Error fetching contests:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching contests." });
  }
});

app.post("/api/contestSolution", async (req, res) => {
  const { platform, searchQuery } = req.body;
  console.log("Platform:", platform, "Search Query:", searchQuery);
  if (!platform || !searchQuery) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  let query = searchQuery;
  let playlistId;
  if(platform === "codeforces"){
    console.log("Codeforces Playlist");
    // Codeforces Round 1009 (Div. 3) removing the '.'
    query = searchQuery.replace(/\./g, "");
    playlistId = process.env.CodeForcesPlaylist
  } else if(platform === "codechef"){
    playlistId = process.env.CodeChefPlaylist
    console.log("CodeChef Playlist");
    //keep two word only
    query = searchQuery.split(" ").slice(0, 2).join(" ");
    query = "Codechef " + query;
  } else if(platform === "leetcode"){
    console.log("Leetcode Playlist");
    playlistId = process.env.LeetcodePlaylist
  } else {
    console.log("Invalid Platform");
    return res.status(400).json({ error: "Invalid platform" });
  }

  try {
    const video = await searchVideos(playlistId, query , platform);
    console.log("Video:", video);
    res.json(video);
  } catch (error) {
    console.error("Error fetching video:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the video." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
