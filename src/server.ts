import { WebClient } from "@slack/web-api";
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ response: "hello world!" });
});
app.post("/", (req, res) => {
  const slack_event = req.body;

  console.log(slack_event);

  if ("challenge" in slack_event) {
    res.status(200).json(slack_event["challenge"]);
  }

  if ("event" in slack_event) {
    const channelId = slack_event["event"]["channel"];
    if (slack_event["event"]["text"].includes("라라")) {
      web.chat.postMessage({
        channel: channelId,
        text: "from 슬랙봇",
      });

      res.status(200).json({ status: "success" });
    }

    res.status(400).json({ status: "fail" });
  }

  res.status(400).end();
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
