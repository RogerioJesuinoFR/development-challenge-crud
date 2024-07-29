class ErrorResponse {
    constructor (type, title, detail, status){
        this.type = type;
        this.title = title;
        this.detail = detail;
        this.status = status;
    }
}

module.exports = ErrorResponse