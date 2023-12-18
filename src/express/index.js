const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const assignRequestId = require('./middlewares/assignRequestId');
const getLogger = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const setupMongoConnection = require('../modules/common/utils/setupMongoConnection');
const {
  TEMP_UPLOAD_DIR,
  UPLOAD_DIR,
} = require('../modules/common/constants/common');
const createDirIfNotExists = require('../modules/common/utils/createDirIfNotExists');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(assignRequestId);
app.use(getLogger());

app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api/v1', routes);

app.get('/health', (req, res) => {
  res.json({ status: 200, message: 'Server is running' });
});

app.use(handleError);

const PORT = 3000;

(async () => {
  await setupMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
