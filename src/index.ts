import express, { Request, Response, NextFunction } from 'express';
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

// centralized error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));