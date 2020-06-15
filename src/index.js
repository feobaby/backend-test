import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

config();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.status(200)
    .json({
      status: 200,
      message: 'Welcome to the backend server',
    });
});

app.get('/noRoute', (req, res) => {
  res.status(404)
    .json({
      status: 404,
      message: 'sorry! can not be found!',
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on localhost:${port}`));

export default app;
