export class RWNoTokenError extends Error {
	constructor() {
		super("No token present, please call [RentalWorks].login(username, password) or pass a token into the constructor before calling this method")
		Object.setPrototypeOf(this, RWNoTokenError.prototype)
	}
}
