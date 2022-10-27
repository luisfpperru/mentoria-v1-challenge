import express from 'express';
const app = express();
import customerRoutes from './customer/customer.routes';

app.use(express.json());
app.use(customerRoutes);

// eslint-disable-next-line no-console
app.listen(3333, console.log('Server has started on...'));
