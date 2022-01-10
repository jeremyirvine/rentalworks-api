"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalWorks = void 0;
const axios_1 = __importDefault(require("axios"));
const Errors = __importStar(require("./errors"));
const Util = __importStar(require("./util"));
class RentalWorks {
    constructor(baseURL, token) {
        this.baseURL = baseURL;
        if (!token)
            this.token = "";
        else
            this.token = token;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = yield axios_1.default.post(`${this.baseURL}/api/v1/jwt`, {
                Username: username,
                Password: password
            });
            if (request.data.statuscode != 0) {
                return {
                    Success: false,
                    Token: ""
                };
            }
            this.token = request.data.access_token;
            return {
                Success: true,
                Token: request.data.access_token
            };
        });
    }
    getWarehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.token.length <= 0) {
                throw new Errors.RWNoTokenError();
                return [];
            }
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let req = yield axios_1.default.post(`${this.baseURL}/api/v1/warehouse/browse`, {}, {
                headers
            });
            return Util.parseResponseDeals(req.data);
        });
    }
    checkAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.token.length <= 0) {
                throw new Errors.RWNoTokenError();
                return false;
            }
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            try {
                let req = yield axios_1.default.get(`${this.baseURL}/api/v1/account/session`, { headers });
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    getQuotes(page, pageSize, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let payload = {
                "miscfields": {},
                "module": "Quote",
                "options": {},
                "orderby": "QuoteNumber desc",
                "orderbydirection": "",
                "top": 0,
                "pageno": page,
                "pagesize": pageSize,
                "searchfieldoperators": [],
                "searchfields": [],
                "searchfieldvalues": [],
                "searchfieldtypes": [],
                "searchseparators": [],
                "searchcondition": [],
                "searchconjunctions": [],
                "totalfields": [],
                "uniqueids": {},
                "boundids": {},
                "filterfields": {},
                "activeview": "",
                "activeviewfields": {
                    "Status": [
                        "ALL"
                    ],
                    "LocationId": [
                        "0000000F"
                    ],
                    "My": [
                        "ALL"
                    ]
                },
                "requestid": "ce4d256e-8540-477e-b87f-6be75cc3db1d",
                "clientVersion": "2019.1.2.170"
            };
            if (search) {
                for (let i = 0; i < Object.keys(search).length; i++) {
                    let key = Object.keys(search)[i];
                    let value = search[key];
                    payload.searchcondition.push("and");
                    payload.searchfieldoperators.push("like");
                    payload.searchfields.push(key);
                    payload.searchfieldtypes.push("text");
                    payload.searchfieldvalues.push(value);
                    payload.searchseparators.push(",");
                }
            }
            let req = yield axios_1.default.post(`${this.baseURL}/api/v1/quote/browse`, payload, { headers });
            return Util.parseResponseDeals(req.data);
        });
    }
    getOrders(page, pageSize, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let payload = {
                "miscfields": {},
                "module": "Order",
                "options": {},
                "orderby": "OrderNumber desc",
                "orderbydirection": "",
                "top": 0,
                "pageno": page,
                "pagesize": pageSize,
                "searchfieldoperators": [],
                "searchfields": [],
                "searchfieldvalues": [],
                "searchfieldtypes": [],
                "searchseparators": [],
                "searchcondition": [],
                "searchconjunctions": [],
                "totalfields": [],
                "uniqueids": {},
                "boundids": {},
                "filterfields": {},
                "activeview": "",
                "activeviewfields": {
                    "Status": [
                        "ALL"
                    ],
                    "LocationId": [
                        "0000000F"
                    ],
                    "My": [
                        "ALL"
                    ]
                },
                "requestid": "ce4d256e-8540-477e-b87f-6be75cc3db1d",
                "clientVersion": "2019.1.2.170"
            };
            if (search) {
                for (let i = 0; i < Object.keys(search).length; i++) {
                    let key = Object.keys(search)[i];
                    let value = search[key];
                    payload.searchcondition.push("and");
                    payload.searchfieldoperators.push("like");
                    payload.searchfields.push(key);
                    payload.searchfieldtypes.push("text");
                    payload.searchfieldvalues.push(value);
                    payload.searchseparators.push(",");
                }
            }
            let req = yield axios_1.default.post(`${this.baseURL}/api/v1/order/browse`, payload, { headers });
            return Util.parseResponseDeals(req.data);
        });
    }
    getTransfers(page, pageSize, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let payload = {
                "miscfields": {},
                "module": "TransferOrderValidation",
                "options": {},
                "orderby": "TransferDate desc",
                "orderbydirection": "",
                "top": 0,
                "pageno": page,
                "pagesize": pageSize,
                "searchfieldoperators": [],
                "searchfields": [],
                "searchfieldvalues": [],
                "searchfieldtypes": [],
                "searchseparators": [],
                "searchcondition": [],
                "searchconjunctions": [],
                "totalfields": [],
                "uniqueids": {},
                "boundids": {},
                "filterfields": {},
                "activeview": "",
                "activeviewfields": {
                    "Status": [
                        "ALL"
                    ],
                    "LocationId": [
                        "0000000F"
                    ],
                    "My": [
                        "ALL"
                    ]
                },
                "requestid": "ce4d256e-8540-477e-b87f-6be75cc3db1d",
                "clientVersion": "2019.1.2.170"
            };
            if (search) {
                for (let i = 0; i < Object.keys(search).length; i++) {
                    let key = Object.keys(search)[i];
                    let value = search[key];
                    payload.searchcondition.push("and");
                    payload.searchfieldoperators.push("like");
                    payload.searchfields.push(key);
                    payload.searchfieldtypes.push("text");
                    payload.searchfieldvalues.push(value);
                    payload.searchseparators.push(",");
                }
            }
            let req = yield axios_1.default.post(`${this.baseURL}/api/v1/transferorder/browse`, payload, { headers });
            return Util.parseResponseDeals(req.data);
        });
    }
    getQuoteItems(quoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let pageSize = 500;
            let page = 1;
            let totalPages = 1;
            let data = [];
            do {
                let payload = {
                    "miscfields": {
                        "QuoteId": {
                            "datafield": "QuoteId",
                            "value": quoteId
                        }
                    },
                    "module": "Order",
                    "options": {},
                    "orderby": "ItemOrder asc",
                    "orderbydirection": "",
                    "top": 0,
                    "pageno": 1,
                    "pagesize": pageSize,
                    "searchfieldoperators": [],
                    "searchfields": [],
                    "searchfieldvalues": [],
                    "searchfieldtypes": [],
                    "searchseparators": [],
                    "searchcondition": [],
                    "searchconjunctions": [],
                    "totalfields": [
                        "WeeklyExtendedNoDiscount",
                        "WeeklyDiscountAmount",
                        "WeeklyExtended",
                        "WeeklyTax1",
                        "WeeklyTax2",
                        "WeeklyTax",
                        "WeeklyTotal",
                        "AverageWeeklyExtendedNoDiscount",
                        "AverageWeeklyDiscountAmount",
                        "AverageWeeklyExtended",
                        "AverageWeeklyTax1",
                        "AverageWeeklyTax2",
                        "AverageWeeklyTax",
                        "AverageWeeklyTotal",
                        "MonthlyExtendedNoDiscount",
                        "MonthlyDiscountAmount",
                        "MonthlyExtended",
                        "MonthlyTax",
                        "MonthlyTax1",
                        "MonthlyTax2",
                        "MonthlyTotal",
                        "PeriodExtendedNoDiscount",
                        "PeriodDiscountAmount",
                        "PeriodExtended",
                        "PeriodTax",
                        "PeriodTax1",
                        "PeriodTax2",
                        "PeriodTotal"
                    ],
                    "uniqueids": {
                        "QuoteId": quoteId,
                        "RecType": "R"
                    },
                    "boundids": {},
                    "filterfields": {},
                    "activeview": "",
                    "activeviewfields": {
                        "Status": [
                            "ALL"
                        ],
                        "LocationId": [
                            "0000000F"
                        ],
                        "My": [
                            "ALL"
                        ]
                    },
                    "requestid": "ce4d256e-8540-477e-b87f-6be75cc3db1d",
                    "clientVersion": "2019.1.2.170"
                };
                let request = yield axios_1.default.post(`${this.baseURL}/api/v1/orderitem/browse`, payload, {
                    headers: headers
                });
                let { TotalPages, PageNo } = request.data;
                totalPages = TotalPages;
                let parsed = Util.parseResponseDeals(request.data);
                data = [
                    ...data,
                    ...parsed
                ];
                page++;
            } while (page <= totalPages);
            return data;
        });
    }
    getOrderItems(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let pageSize = 500;
            let page = 1;
            let totalPages = 1;
            let data = [];
            do {
                let payload = {
                    "miscfields": {
                        "DealId": {
                            "datafield": "OrderId",
                            "value": orderId
                        }
                    },
                    "module": "Order",
                    "options": {},
                    "orderby": "ItemOrder asc",
                    "orderbydirection": "",
                    "top": 0,
                    "pageno": 1,
                    "pagesize": pageSize,
                    "searchfieldoperators": [],
                    "searchfields": [],
                    "searchfieldvalues": [],
                    "searchfieldtypes": [],
                    "searchseparators": [],
                    "searchcondition": [],
                    "searchconjunctions": [],
                    "totalfields": [
                        "WeeklyExtendedNoDiscount",
                        "WeeklyDiscountAmount",
                        "WeeklyExtended",
                        "WeeklyTax1",
                        "WeeklyTax2",
                        "WeeklyTax",
                        "WeeklyTotal",
                        "AverageWeeklyExtendedNoDiscount",
                        "AverageWeeklyDiscountAmount",
                        "AverageWeeklyExtended",
                        "AverageWeeklyTax1",
                        "AverageWeeklyTax2",
                        "AverageWeeklyTax",
                        "AverageWeeklyTotal",
                        "MonthlyExtendedNoDiscount",
                        "MonthlyDiscountAmount",
                        "MonthlyExtended",
                        "MonthlyTax",
                        "MonthlyTax1",
                        "MonthlyTax2",
                        "MonthlyTotal",
                        "PeriodExtendedNoDiscount",
                        "PeriodDiscountAmount",
                        "PeriodExtended",
                        "PeriodTax",
                        "PeriodTax1",
                        "PeriodTax2",
                        "PeriodTotal"
                    ],
                    "uniqueids": {
                        "OrderId": orderId,
                        "RecType": "R",
                        "NoAvailabilityCheck": true
                    },
                    "boundids": {},
                    "filterfields": {},
                    "activeview": "",
                    "activeviewfields": {
                        "Status": [
                            "ALL"
                        ],
                        "LocationId": [
                            "0000000F"
                        ],
                        "My": [
                            "ALL"
                        ]
                    },
                    "requestid": "ce4d256e-8540-477e-b87f-6be75cc3db1d",
                    "clientVersion": "2019.1.2.170"
                };
                let request = yield axios_1.default.post(`${this.baseURL}/api/v1/orderitem/browse`, payload, {
                    headers: headers
                });
                let { TotalPages, PageNo } = request.data;
                totalPages = TotalPages;
                let parsed = Util.parseResponseDeals(request.data);
                data = [
                    ...data,
                    ...parsed
                ];
                page++;
            } while (page <= totalPages);
            return data;
        });
    }
    insertLineItem(orderId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let payload = {
                "OrderId": orderId,
                "BelowOrderItemId": itemId,
                "PrimaryItemId": ""
            };
            let req = yield axios_1.default.post(`${this.baseURL}/api/v1/orderitem/insertlineitem`, payload, {
                headers
            });
            return req;
        });
    }
    addSingleItemToOrderBottom(orderId, item, belowItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let lireq = this.insertLineItem(orderId, belowItemId);
            let req = yield axios_1.default.post(`${this.baseURL}/api/v1/orderitem`, item, {
                headers
            });
            console.log(req);
            return false;
        });
    }
    addItemToOrder(orderId, itemId, items, progress) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = [];
            let headers = {
                Authorization: `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            let payload = [
                ...items
            ];
            let lineItems = [];
            let prg = 0;
            let maxProgress = items.length * 2;
            for (let i = 0; i < items.length; i++) {
                let req = yield this.insertLineItem(orderId, itemId);
                while (req.data.StatusCode === 500 && req.data.Message.includes("deadlock")) {
                    req = yield this.insertLineItem(orderId, itemId);
                }
                let { OrderItemId } = req.data;
                lineItems[i] = OrderItemId;
                prg++;
                progress(prg, maxProgress);
            }
            for (let i = 0; i < items.length; i++) {
                let req = yield axios_1.default.post(`${this.baseURL}/api/v1/orderitem/many`, [Object.assign(Object.assign({}, items[i]), { OrderItemId: lineItems[i], OrderId: orderId })], {
                    headers: headers
                }).catch((reason) => __awaiter(this, void 0, void 0, function* () {
                    yield this.rwAddItemToOrder__Cleanup(lineItems);
                }));
                req = yield axios_1.default.post(`${this.baseURL}/api/v1/orderitem/many`, [Object.assign(Object.assign({}, items[i]), { OrderItemId: lineItems[i], OrderId: orderId })], {
                    headers: headers
                }).catch((reason) => __awaiter(this, void 0, void 0, function* () {
                    yield this.rwAddItemToOrder__Cleanup(lineItems);
                }));
                if (req && req.data) {
                    ret.push(req.data[0].Result.Value);
                }
                prg++;
                progress(prg, maxProgress);
            }
            progress(0, 1); // reset progress bar
            return ret;
        });
    }
    getItems(page, pageSize, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = {
                "miscfields": {
                    "length": 0
                },
                "module": "RentalInventoryValidation",
                "options": {},
                "orderby": "ICode asc",
                "orderbydirection": "",
                "top": 0,
                "pageno": 1,
                "pagesize": 100,
                "searchfieldoperators": [],
                "searchfields": [],
                "searchfieldvalues": [],
                "searchfieldtypes": [],
                "searchseparators": [],
                "searchcondition": [],
                "searchconjunctions": [],
                "totalfields": [],
                "uniqueids": {
                    "AvailFor": "R"
                },
                "boundids": {},
                "filterfields": {
                    "RecType": "R",
                    "WeeklyTax": "0",
                    "AverageWeeklyTax": "0",
                    "MonthlyTax": "0",
                    "PeriodTax": "0",
                    "Locked": "",
                    "Bold": "",
                    "Mute": "",
                    "AccessoryRatio": "",
                    "DefaultHourlyRate": "",
                    "DefaultDailyRate": "",
                    "DefaultWeeklyRate": "",
                    "DefaultMonthlyRate": "",
                    "RegionId": "",
                    "Region": "",
                    "PrintNoteOnOrder": "",
                    "PrintNoteOnQuote": "",
                    "PrintNoteOnPickList": "",
                    "PrintNoteOnOutContract": "",
                    "PrintNoteOnInContract": "",
                    "PrintNoteOnReceiveContract": "",
                    "PrintNoteOnReturnContract": "",
                    "PrintNoteOnInvoice": "",
                    "PrintNoteOnPurchaseOrder": "",
                    "PrintNoteOnReturnList": "",
                    "PrintNoteOnVendorReceiveList": "",
                    "PrintNoteOnVendorReturnList": "",
                    "IsOption": "",
                    "NestingLevel": "",
                    "NestedOrderItemId": "",
                    "MinimumDaysPerWeek": "",
                    "MaxDiscount": "",
                    "Inactive": "",
                    "AvailabilityExcludeConsigned": "",
                    "InventoryId": "",
                    "Description": "",
                    "PickDate": "2021-12-08",
                    "FromDate": "2021-12-09",
                    "ToDate": "2021-12-15",
                    "ManufacturerPartNumber": "",
                    "QuantityOrdered": "",
                    "SubQuantity": "",
                    "ConsignQuantity": "",
                    "MarkupPercent": "",
                    "MarginPercent": "",
                    "Price": "0",
                    "Price2": "0",
                    "Price3": "0",
                    "Price4": "0",
                    "PremiumPercent": "",
                    "DaysPerWeek": "3.000",
                    "DiscountPercent": "0",
                    "DiscountPercentDisplay": "0",
                    "PeriodDiscountAmount": "0",
                    "PeriodExtended": "0",
                    "Taxable": false,
                    "WarehouseId": "",
                    "ReturnToWarehouseId": "",
                    "Notes": ""
                },
                "activeview": "",
                "requestid": "178bf163-1b6d-459e-a168-5adaa5d18be2",
                "clientVersion": "2019.1.2.206"
            };
            let headers = {
                'Authorization': `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            if (search) {
                for (let i = 0; i < Object.keys(search).length; i++) {
                    let key = Object.keys(search)[i];
                    let value = search[key];
                    payload.searchcondition.push("and");
                    payload.searchfieldoperators.push("like");
                    payload.searchfields.push(key);
                    payload.searchfieldtypes.push("text");
                    payload.searchfieldvalues.push(value);
                    payload.searchseparators.push(",");
                }
            }
            let req = yield axios_1.default.post(`${this.baseURL}/api/v1/orderitem/validateicoderental/browse`, payload, {
                headers
            });
            return Util.parseResponseDeals(req.data);
        });
    }
    getOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                'Authorization': `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            try {
                let req = yield axios_1.default.get(`${this.baseURL}/api/v1/order/${orderId}`, {
                    headers
                });
                return {
                    Rows: Object.assign({}, req.data)
                };
            }
            catch (e) {
                return e.response.data;
            }
        });
    }
    getVenue(venueId) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                'Authorization': `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            try {
                let req = yield axios_1.default.get(`${this.baseURL}/api/v1/venue/${venueId}`, {
                    headers
                });
                return {
                    Rows: Object.assign({}, req.data)
                };
            }
            catch (e) {
                return e.response.data;
            }
        });
    }
    updateOrder(orderId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                'Authorization': `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            try {
                let req = yield axios_1.default.put(`${this.baseURL}/api/v1/order/${orderId}`, Object.assign(Object.assign({}, data), { "OrderId": orderId }), {
                    headers
                });
                return {
                    Rows: Object.assign({}, req.data)
                };
            }
            catch (e) {
                return e.response.data;
            }
        });
    }
    rwAddItemToOrder__Cleanup(lineItems) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                'Authorization': `Bearer ${this.token}`,
                'x-requested-with': "XMLHttpRequest"
            };
            for (let i = 0; i < lineItems.length; i++) {
                yield axios_1.default.delete(`${this.baseURL}/api/v1/orderitem/${lineItems[i]}`, {
                    headers: headers
                }).catch(reason => { });
            }
        });
    }
    ;
}
exports.RentalWorks = RentalWorks;
//# sourceMappingURL=index.js.map