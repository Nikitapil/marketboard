export default class ApiError extends Error{
  errors;

  status;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnautorizedError() {
    return new ApiError(401, 'Unauthorized');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

}