import crypto from 'crypto';

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

export default Customer;
