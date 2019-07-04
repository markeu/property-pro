import express from 'express';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to PropertyPro',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`PropertyPro started on port ${port}`);
});

export default app;
