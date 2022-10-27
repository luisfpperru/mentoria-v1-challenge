const express = require('express');
const router = express.Router();

const CustomerRepository = require('./customer.repository');
const CustomerController = require('./customer.controller');
const CustomerMiddlewares = require('./customer.middleware');

const customerRepository = new CustomerRepository();
const customerController = new CustomerController(customerRepository);

const verifyIfAccountCpfExists = (request, response, next) => {
    const { cpf } = request.body;
    const CpfExists = customerRepository.customers.find((customer) => customer.cpf === cpf)
    if (CpfExists)
        return response.status(400).json({error: "CPF already exists!"})
    next()
}

const verifyIfAccountExists = (request, response, next) => {
    const { id } = request.params;
    const account = customerRepository.customers.find((customer) => customer.id === id);

    if (!account)
        return response.status(404).json({ message: "Account not found!" });
    next()
}


router.get('/', customerController.list)

router.post('/account', verifyIfAccountCpfExists, customerController.create)

router.put('/account/:id', verifyIfAccountExists, customerController.update)

router.delete('/account/:id', verifyIfAccountExists, customerController.delete)

router.post('/deposit/:id', verifyIfAccountExists, customerController.deposit)

router.post('/withdraw/:id', verifyIfAccountExists, customerController.withdraw)

router.get('/statement/:id', verifyIfAccountExists, customerController.statement)

router.get('/statement/:id/:date', verifyIfAccountExists, customerController.statementByDate)

module.exports = router;