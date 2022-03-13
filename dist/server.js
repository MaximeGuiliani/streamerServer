"use strict";

var _express = _interopRequireDefault(require("express"));

var _streamers = _interopRequireDefault(require("./services/streamers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_express.default.static('./app/app-project/'));
app.get('/', function (req, res) {
  res.sendFile('index.html');
});
app.listen(8080);
app.use('/followed', _streamers.default);