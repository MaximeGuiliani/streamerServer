"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _esClient = _interopRequireDefault(require("./es-client"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const index = 'local_users';

const handleElasticsearchError = error => {
  if (error.status === 404) {
    throw new Error('User Not Found', 404);
  }

  throw new Error(error.msg, error.status || 500);
};

const getAll = () => _esClient.default.search({
  index
}).then(response => response).catch(error => {
  handleElasticsearchError(error);
});

const store = streamer => _esClient.default.index({
  index,
  refresh: 'true',
  body: streamer
}) // TODO
.then(response => response.status).catch(error => {
  handleElasticsearchError(error);
});

const getStreamer = streamerName => _esClient.default.search({
  index,
  body: {
    query: {
      match: {
        streamerName: {
          query: streamerName
        }
      }
    }
  }
}).then(response => {
  response;
}).catch(error => {
  handleElasticsearchError(error);
});

const remove = streamerName => _esClient.default.deleteByQuery({
  index,
  refresh: 'true',
  body: {
    query: {
      match: {
        streamerName: {
          query: streamerName
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
  getAll
};
exports.default = _default;