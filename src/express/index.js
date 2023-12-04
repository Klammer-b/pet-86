const express = require('express');
const routes = require('./routes');
const assignRequestId = require('./middlewares/assignRequestId');
const getLogger = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const setupMongoConnection = require('../modules/common/utils/setupMongoConnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(assignRequestId);
app.use(getLogger());

app.use('/api/v1', routes);

app.get('/health', (req, res) => {
  res.json({ status: 200, message: 'Server is running' });
});

app.use(handleError);

const PORT = 3000;
setupMongoConnection().then(() =>
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  }),
);
