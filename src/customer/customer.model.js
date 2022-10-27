const crypto = require('crypto');

class Customer {
    id;
    cpf;
    name;
    statements = [];

    constructor() {
        if (!this.id) {
            this.id = crypto.randomUUID();
        }
    }
}

module.exports = Customer;
