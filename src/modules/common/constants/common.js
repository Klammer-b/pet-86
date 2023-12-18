const path = require('node:path');

const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

module.exports = {
  TEMP_UPLOAD_DIR,
  UPLOAD_DIR,
};
