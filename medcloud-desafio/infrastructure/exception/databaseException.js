class DatabaseException extends Error {
    constructor (title, message, stackTrace) {
        super(message);
        this.title = title;
        this.stackTrace = stackTrace;
    }
}

module.exports = DatabaseException;
