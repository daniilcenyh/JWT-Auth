module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status,errors) {
        super(message);
        this.status = status;
        this.errors = errors;

    }

    //статическая функция - это функция которую можно использовать не создавая экземпляр класса
    static UnauthorizedError() {
        return new ApiError(401, "пользователь не авторизован")
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }
}