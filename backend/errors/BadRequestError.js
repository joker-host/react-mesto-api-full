// +7 925-373-77-29

class BadRequestError extends Error {
    constructor(message, ...rest) {
        super(...rest);
        this.status = 400;
        this.message = message;
    }
}

module.exports = BadRequestError;