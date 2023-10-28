// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./auth/lucia").Auth;
	type DatabaseUserAttributes = {
		name: string;
		picture: string;
		email: string;
		id?: string;
		organization_id?: string;
	};
}
