
export type RWResponse = {
	Rows: Record<string, string>
}

export type RWHeaders = {
	Authorization: string;
	'x-request-with': string;
}

export type RWLoginResponse = {
		Success: boolean;
		Token: string;
}
