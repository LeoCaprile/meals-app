export class UserControllerError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UserControllerError";
	}
}
