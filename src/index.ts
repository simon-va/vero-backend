import express, { Application } from 'express';
import routes from './api/routes';
import sequelize from './db/config';
import { IS_DEV } from './constants/environment';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

try {
    sequelize.sync({ alter: IS_DEV }).then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${ port }`);
        });
    });
} catch (error) {
    console.log(error);
}