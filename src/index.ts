import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { errorHandler } from './api/middlewares/errors';
import routes from './api/routes';
import sequelize from './db/config';

const app: Application = express();
const port = 3000;

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);
app.use(errorHandler);

try {
    sequelize.sync({ alter: true }).then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
} catch (error) {
    console.log(error);
}
