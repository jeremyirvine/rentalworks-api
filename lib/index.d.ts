import { AxiosResponse } from 'axios';
import * as Types from './types';
export declare class RentalWorks {
    baseURL: string;
    token: string;
    constructor(baseURL: string, token?: string);
    login(username: string, password: string): Promise<Types.RWLoginResponse>;
    getWarehouses(): Promise<Types.RWResponse[]>;
    checkAuth(): Promise<boolean>;
    getQuotes(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]>;
    getOrders(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]>;
    getTransfers(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]>;
    getQuoteItems(quoteId: string): Promise<Types.RWResponse[]>;
    getOrderItems(orderId: string): Promise<Types.RWResponse[]>;
    insertLineItem(orderId: string, itemId: string): Promise<AxiosResponse<any>>;
    addSingleItemToOrderBottom(orderId: string, item: any, belowItemId: string): Promise<Record<string, any> | false>;
    addItemToOrder(orderId: string, itemId: string, items: Record<string, any>[], progress: (current: number, max: number) => void): Promise<any[]>;
    getItems(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]>;
    getOrder(orderId: string): Promise<Types.RWResponse | Record<string, any>>;
    getVenue(venueId: string): Promise<Types.RWResponse | Record<string, any>>;
    updateOrder(orderId: string, data: Record<string, any>): Promise<Types.RWResponse | Record<string, any>>;
    rwAddItemToOrder__Cleanup(lineItems: string[]): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map