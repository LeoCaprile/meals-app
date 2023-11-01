export class AuthControllerError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AuthControllerError";
	}
}
