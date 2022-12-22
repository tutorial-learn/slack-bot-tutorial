import { WebClient } from "@slack/web-api";
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();

const token = process.env.SLACK_TOKEN;
const channelId = process.env.CHANNEL_ID;

const web = new WebClient(token);
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ response: "hello world!" });
});
app.post("/", (req, res) => {
  const slack_event = req.body;
  if ("challenge" in slack_event) {
    res
      .setHeader("content-type", "application/json")
      .status(200)
      .json(slack_event["challenge"]);
  }
  console.log(slack_event);
  res.json({ response: "hello world!" });
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
