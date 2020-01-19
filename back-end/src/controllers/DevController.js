const Dev = require("../models/Dev");
const axios = require("axios");
const parseStringToArray = require("../utils/parseStringToArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if(!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio, login } = response.data;

      const techsArray = parseStringToArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return res.json(dev);
  },
}
