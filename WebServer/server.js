const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

app.listen(80, () => {
  console.log("Express server running on port 80");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get("/resources/:name", (req, res) => {
  const options = {
    root: path.join(__dirname, "client"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  res.sendFile(req.params.name, options, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500).end();
    }
  });
});

app.get("/json/:name", (req, res) => {
  const options = {
    root: "/home/pi/clock/",
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  res.sendFile(req.params.name, options, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status || 500).end();
    }
  });
});

app.post("/json", (req, res) => {
  const filePath = "/home/pi/clock/settings.json";
  fs.writeFile(filePath, JSON.stringify(req.body), "utf8", (err) => {
    if (err) {
      console.error("Failed to write file:", err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});
