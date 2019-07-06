import express from 'express';
import bodyParser from 'body-parser';
import { resolve } from  'path';
import { cloudinaryConfig } from './config/cloudinaryConfig'
import PropertyRoutes from './routes/properties';
import userRoutes from './routes/users';



const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*', cloudinaryConfig);
// app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));
app.use('/api/v1/property', PropertyRoutes);
app.use('/api/v1/auth', userRoutes);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to PropertyPro',
  });
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`PropertyPro started on port ${port}`);
});

export default app;
