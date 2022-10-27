const express = require('express');
const app = express();
const customerRoutes = require('./customer/customer.routes');

app.use(express.json());
app.use(customerRoutes);

// eslint-disable-next-line no-console
app.listen(3333, console.log('Server has started on...'));
