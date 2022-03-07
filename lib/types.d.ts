export declare type RWRecord = {
    Rows: Record<string, string>;
};
export declare type RWResponse = {
    Rows: RWRecord[];
    TotalRows: number;
    TotalPages: number;
};
export declare type RWHeaders = {
    Authorization: string;
    'x-request-with': string;
};
export declare type RWLoginResponse = {
    Success: boolean;
    Token: string;
};
//# sourceMappingURL=types.d.ts.map