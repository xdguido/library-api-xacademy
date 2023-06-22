import express, { Application } from 'express';
import { initDB } from './config/db';
import routes from './routes';
import { seed } from './lib/seed';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/hello-world', routes.helloWorld);

app.listen(port, async () => {
    await initDB();
    await seed();
    console.log(`Server is listening on port ${port}`);
});
