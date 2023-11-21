const express = require('express');
const { nanoid } = require('nanoid');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const id = nanoid();
  req.id = id;
  next();
});

app.use(routes);

app.get('/health', (req, res) => {
  res.json({ status: 200, message: 'Server is running' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: 500, message: 'Something went wrong', err });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
