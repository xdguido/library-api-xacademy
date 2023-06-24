import express, { Application } from 'express';
import routes from './routes';
import { initDB } from './config/db';
import { seed } from './lib/seed';
import { errorHandler } from './middleware/error.middleware';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/library', routes.libraryRoute);

app.use(errorHandler);

const init = async () => {
    try {
        app.listen(port, async () => {
            await initDB();
            await seed();
            console.log(`Server is listening on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

if (process.env.NODE_ENV !== 'test') {
    init();
}

export default app;
