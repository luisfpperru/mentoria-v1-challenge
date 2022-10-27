const crypto = require('crypto');

class Statement {
    id;
    description;
    amount;
    created_at;
    type;

    constructor() {
        if (!this.id) {
            this.id = crypto.randomUUID();
        }
    }
}

module.exports = Statement;
