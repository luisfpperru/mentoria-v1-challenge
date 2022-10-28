class CustomerController {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }

    list = (request, response) => {
        const customer = this.customerRepository.listCustomer();
        return response.status(200).json(customer);
    };

    create = (request, response) => {
        const { cpf, name } = request.body;

        const createdCustomer = this.customerRepository.createCustomer({
            cpf,
            name,
        });

        return response.status(201).json(createdCustomer);
    };

    findById = (request, response) => {
        const { id } = request.params;

        const customer = this.customerRepository.findCustomerbyId(id);

        if (!customer) {
            return response.status(404).json({ message: 'Account not found!' });
        }
        return response.status(200).json(customer);
    };

    update = (request, response) => {
        const { cpf, name } = request.body;
        const { id } = request.params;

        const updatedCustomer = this.customerRepository.updateCustomer({
            id,
            cpf,
            name,
        });

        if (!updatedCustomer) {
            return response.status(404).json({ message: 'Account not found!' });
        }

        return response.status(200).json(updatedCustomer);
    };

    delete = (request, response) => {
        const { id } = request.params;

        this.customerRepository.deleteCustomer(id);

        return response.status(204).send();
    };

    statement = (request, response) => {
        const { id } = request.params;
        const { date } = request.query;

        let statement;
        if (date){
            statement = this.customerRepository.statementByDate({ id, date });
        } else {
            statement = this.customerRepository.statement(id);
        }

        return response.status(200).json(statement);
    };

    withdraw = (request, response) => {
        const { id } = request.params;
        const { description, amount } = request.body;

        const statement = this.customerRepository.addDebit({
            id,
            description,
            amount,
        });

        if (!statement) {
            return response.status(404).json({ message: 'Account not found!' });
        }
        if (statement instanceof Error) {
            return response.status(400).json({ message: statement.message });
        }

        return response.status(200).json(statement);
    };

    deposit = (request, response) => {
        const { id } = request.params;
        const { description, amount } = request.body;

        const statement = this.customerRepository.addCredit({
            id,
            description,
            amount,
        });

        if (!statement) {
            return response.status(404).json({ message: 'Account not found!' });
        }

        return response.status(200).json(statement);
    };
}

module.exports = CustomerController;
