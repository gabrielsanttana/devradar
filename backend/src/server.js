const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { setupWebSocket } = require("./websocket");

const routes = require("./routes");
require("dotenv").config();

const app = express();
const server = http.Server(app);
setupWebSocket(server);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${MONGODB_CLUSTER_URL}/devradar`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});