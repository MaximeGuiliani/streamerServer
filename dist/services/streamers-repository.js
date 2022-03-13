"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _esClient = _interopRequireDefault(require("./es-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const index = 'local_streamers';

const handleElasticsearchError = error => {
  if (error.status === 404) {
    throw new Error('Streamer Not Found', 404);
  }

  throw new Error(error.msg, error.status || 500);
};

const getAll = () => _esClient.default.search({
  index
}).then(response => response).catch(error => {
  handleElasticsearchError(error);
});

let streamers = {
  streamerName: 'Gotaga',
  isPartner: true,
  streamerProfileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/69e324f6-fc7d-4131-89ed-227a955637cf-profile_image-300x300.png',
  descriptions: "Je m’appelle Corentin Houssein, j'ai 28 ans et je suis un ancien joueur professionnel sur les opus Call Of Duty sous le pseudonyme Gotaga. De nombreuses fois champion d'Europe et de France, je suis actuellement le joueur français le plus titré sur Consoles."
}; //streamer data corect

const store = streamerData => _esClient.default.index({
  index,
  refresh: 'true',
  body: streamers
}).then(response => response.status).catch(error => {
  handleElasticsearchError(error);
});

const getStreamer = streamerName => _esClient.default.search({
  index,
  body: {
    "query": {
      "match": {
        "firstName": {
          "query": streamerName
        }
      }
    }
  }
}).then(response => {
  response;
}).catch(error => {
  handleElasticsearchError(error);
});

const remove = firstName => _esClient.default.deleteByQuery({
  index,
  refresh: 'true',
  body: {
    "query": {
      "match": {
        "firstName": {
          "query": firstName
        }
      }
    }
  }
}).then(response => response).catch(error => {
  handleElasticsearchError(error);
});

var _default = {
  getStreamer,
  store,
  getAll,
  remove
};
exports.default = _default;