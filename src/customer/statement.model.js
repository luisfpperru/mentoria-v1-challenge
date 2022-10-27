import crypto from 'crypto';

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

export default Statement;
