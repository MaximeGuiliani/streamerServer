"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
  index: index
}).then(response => response).catch(error => {
  handleElasticsearchError(error);
});

const store = streamer => _esClient.default.index({
  index: index,
  refresh: 'true',
  body: {
    streamerName: streamer
  }
}).then(response => response.status).catch(error => {
  handleElasticsearchError(error);
});

const getStreamer = streamerName => _esClient.default.search({
  index: index,
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
  return response;
}).catch(error => {
  handleElasticsearchError(error);
});

const remove = streamerName => _esClient.default.deleteByQuery({
  index: index,
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
  getAll,
  remove
};
exports.default = _default;