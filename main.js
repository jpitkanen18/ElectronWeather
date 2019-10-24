const express = require("express");
const api = express();
const apijs = require("./api");
const { app, BrowserWindow } = require("electron");

//API shit
const port = 4200;
api.listen(port, () => {
  console.log("Listening on port: " + port);
});

api.get("/", (req, res) => {
  console.log("Responding to root request");
  res.send("root");
});
//Electron poopoo
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    minWidth: 475,
    minHeight: 500,
    frame: false,
    titleBarStyle: "hidden",
    backgroundColor: "#000",
    opacity: 0.9,
    vibrancy: "sidebar"
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

  win.on("blur", () => {
    win.opacity = 0.8;
  });
}
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
