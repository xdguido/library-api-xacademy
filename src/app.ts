import express, { Application } from 'express';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
