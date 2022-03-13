import esClient from './es-client';

const index = 'local_streamers';

const handleElasticsearchError = (error) => {
  if (error.status === 404) {
    throw new Error('Streamer Not Found', 404);
  }
  throw new Error(error.msg, error.status || 500);
};

const getAll = () =>
  esClient
    .search({
      index: index,
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const store = (streamer) =>
  esClient
    .index({
      index: index,
      refresh: 'true',
      body: { streamerName: streamer },
    })
    .then((response) => response.status)
    .catch((error) => {
      handleElasticsearchError(error);
    });

const getStreamer = (streamerName) =>
  esClient
    .search({
      index: index,
      body: {
        query: {
          match: {
            streamerName: {
              query: streamerName,
            },
          },
        },
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      handleElasticsearchError(error);
    });

const remove = (streamerName) =>
  esClient
    .deleteByQuery({
      index: index,
      refresh: 'true',
      body: {
        query: {
          match: {
            streamerName: {
              query: streamerName,
            },
          },
        },
      },
    })
    .then((response) => response)
    .catch((error) => {
      handleElasticsearchError(error);
    });

export default {
  getStreamer,
  store,
  getAll,
  remove,
};
