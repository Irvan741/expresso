import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// Error handler
app.use(errorHandler);

export default app;
