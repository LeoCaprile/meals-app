export class UserControllerError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UserControllerError";
	}
}

export class PrivateControllerError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "PrivateControllerError";
	}
}

export class OrganizationControllerError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "OrganizationControllerError";
	}
}
