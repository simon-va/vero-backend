import express, {Application} from 'express';
import routes from "./api/routes";
import dbInit from "./db/init";

dbInit();

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', routes);

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    console.log(error);
}