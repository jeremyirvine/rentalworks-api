
export type RWRecord = {
	Rows: Record<string, string>
}

export type RWResponse = {
	Rows: RWRecord[],
	TotalRows: number,
	TotalPages: number
}

export type RWHeaders = {
	Authorization: string;
	'x-request-with': string;
}

export type RWLoginResponse = {
		Success: boolean;
		Token: string;
}
