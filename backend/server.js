import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movies from './api/movies.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movies);

app.use('*', (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
