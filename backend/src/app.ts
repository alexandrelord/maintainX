import express from 'express';
import chalk from 'chalk';

const app = express();

app.use(express.json());

const PORT = 4000;
app.listen(PORT, () => {
	console.log(chalk.green(`Server is running on port ${PORT}`));
});
