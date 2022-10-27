const Customer = require('./customer.model');
const Statement = require('./statement.model');

class CustomerRepository {
    constructor() {
        this.customers = [];
    }

    listCustomer = () => {
        return this.customers;
    };

    findCustomerbyId = id => {
        return this.customers.find(customer => customer.id === id);
    };

    createCustomer = ({ cpf, name }) => {
        const customer = new Customer();

        Object.assign(customer, {
            cpf,
            name,
        });

        this.customers.push(customer);
        return customer;
    };

    updateCustomer = ({ id, cpf, name }) => {
        const index = this.customers.findIndex(customer => customer.id === id);

        if (index < 0) {
            return;
        }

        const customerUpdated = this.customers[index];
        Object.assign(customerUpdated, {
            cpf,
            name,
        });

        return customerUpdated;
    };

    deleteCustomer = id => {
        const index = this.customers.findIndex(customer => customer.id === id);

        this.customers.splice(index, 1);
    };

    statement = id => {
        return this.customers.find(customer => customer.id === id).statements;
    };

    statementByDate = ({ id, date }) => {
        const customer = this.customers.find(customer => customer.id === id);
        return customer.statements.filter(
            statement => statement.created_at === date,
        );
    };

    addCredit = ({ id, description, amount }) => {
        const index = this.customers.findIndex(account => account.id === id);

        const statement = new Statement();

        Object.assign(statement, {
            description,
            amount,
            type: 'credit',
            created_at: this.formatDate(new Date()),
        });

        this.customers[index].statements.push(statement);
        return statement;
    };

    addDebit = ({ id, description, amount }) => {
        const index = this.customers.findIndex(account => account.id === id);

        if (this.getBalance(this.customers[index].statements) < amount)
            return new Error('Amount is greater than funds!');

        const statement = new Statement();

        Object.assign(statement, {
            description,
            amount,
            type: 'debit',
            created_at: this.formatDate(new Date()),
        });

        this.customers[index].statements.push(statement);

        return statement;
    };

    getBalance = statements => {
        let balance = 0.0;
        for (const statement of statements) {
            if (statement.type === 'credit') balance += statement.amount;
            if (statement.type === 'debit') balance -= statement.amount;
        }

        return balance;
    };

    formatDate = inputDate => {
        let date, month, year;

        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();
        return date + '-' + month + '-' + year;
    };
}

module.exports = CustomerRepository;
