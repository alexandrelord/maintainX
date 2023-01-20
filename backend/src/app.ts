import express from 'express';
import chalk from 'chalk';
import logger from './middleware/logger';
import apiRoutes from './routes/api';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());
app.use('/api', apiRoutes);
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => {
	console.log(chalk.green(`Server is running on port ${PORT}`));
});
