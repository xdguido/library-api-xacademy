import express, { Application } from 'express';
import routes from './routes';
import { initDB } from './config/db';
import { seed } from './lib/seed';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/hello-world', routes.helloWorld);

export default app;

const init = async () => {
    try {
        await initDB();
        await seed();
        app.listen(port, async () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

if (process.env.NODE_ENV !== 'test') {
    init();
}
