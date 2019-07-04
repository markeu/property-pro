import express from 'express';
import bodyParser from 'body-parser';
import PropertyRoutes from './routes/properties';
import userRoutes from './routes/users';
// import flagRoutes from './routes/flags';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/property', PropertyRoutes);
app.use('/api/v1/auth', userRoutes);
// app.use('/api/v1/flag', flagRoutes);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to PropertyPro',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`PropertyPro started on port ${port}`);
});

export default app;
