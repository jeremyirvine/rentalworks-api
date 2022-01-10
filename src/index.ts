

import axios, {AxiosResponse} from 'axios'
import * as Types from './types'
import * as Errors from './errors'
import * as Util from './util'

export class RentalWorks {
	baseURL: string;
	token: string;

	constructor(baseURL: string, token?: string) {

		this.baseURL = baseURL
		if(!token) this.token = ""
		else this.token = token
	}

	async login(username: string, password: string): Promise<Types.RWLoginResponse> {
		let request = await axios.post(`${this.baseURL}/api/v1/jwt`, {
			Username: username,
			Password: password
		})
		if(request.data.statuscode != 0) {
			return {
				Success: false,
				Token: ""
			}
		}
		
		this.token = request.data.access_token

		return {
			Success: true,
			Token: request.data.access_token
		}
	}

	async getWarehouses(): Promise<Types.RWResponse[]> {
		if(this.token.length <= 0)
		{
			throw new Errors.RWNoTokenError()
			return []
		}

		let headers = {
			Authorization: `Bearer ${this.token}`,
			'x-requested-with': "XMLHttpRequest"
		}
	
		let req = await axios.post(`${this.baseURL}/api/v1/warehouse/browse`, {}, {
			headers
		})

		return Util.parseResponseDeals(req.data)
	}

	async checkAuth(): Promise<boolean> {
		if(this.token.length <= 0) 
		{
			throw new Errors.RWNoTokenError()
			return false
		}

		let headers = {
			Authorization: `Bearer ${this.token}`,
			'x-requested-with': "XMLHttpRequest"
		}
		
		try {
			let req = await axios.get(`${this.baseURL}/api/v1/account/session`, { headers })
			return true
		} catch(e) {
			return false
		}
	}

	async getQuotes(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]> {
		let headers = {
			Authorization: `Bearer ${this.token}`,
			'x-requested-with': "XMLHttpRequest"
		}

		let payload: Record<string, any> = {
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
			}

			if(search)
			{
					for(let i = 0; i < Object.keys(search).length; i++)
					{
							let key = Object.keys(search)[i]
							let value = search[key]

							payload.searchcondition.push("and")   
							payload.searchfieldoperators.push("like")
							payload.searchfields.push(key)
							payload.searchfieldtypes.push("text")
							payload.searchfieldvalues.push(value)
							payload.searchseparators.push(",")
					}
			}

			let req = await axios.post(`${this.baseURL}/api/v1/quote/browse`, payload, { headers })
			

			return Util.parseResponseDeals(req.data)
	}


	async getOrders(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]> {
		let headers = {
			Authorization: `Bearer ${this.token}`,
			'x-requested-with': "XMLHttpRequest"
		}

		let payload: Record<string, any> = {
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
			}

			if(search)
			{
					for(let i = 0; i < Object.keys(search).length; i++)
					{
							let key = Object.keys(search)[i]
							let value = search[key]

							payload.searchcondition.push("and")   
							payload.searchfieldoperators.push("like")
							payload.searchfields.push(key)
							payload.searchfieldtypes.push("text")
							payload.searchfieldvalues.push(value)
							payload.searchseparators.push(",")
					}
			}

			let req = await axios.post(`${this.baseURL}/api/v1/order/browse`, payload, { headers })
			

			return Util.parseResponseDeals(req.data)
		}



	async getTransfers(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]> {
		let headers = {
			Authorization: `Bearer ${this.token}`,
			'x-requested-with': "XMLHttpRequest"
		}

		let payload: Record<string, any> = {
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
			}

			if(search)
			{
					for(let i = 0; i < Object.keys(search).length; i++)
					{
							let key = Object.keys(search)[i]
							let value = search[key]

							payload.searchcondition.push("and")   
							payload.searchfieldoperators.push("like")
							payload.searchfields.push(key)
							payload.searchfieldtypes.push("text")
							payload.searchfieldvalues.push(value)
							payload.searchseparators.push(",")
					}
			}

			let req = await axios.post(`${this.baseURL}/api/v1/transferorder/browse`, payload, { headers })

			return Util.parseResponseDeals(req.data)
		}

		async getQuoteItems(quoteId: string): Promise<Types.RWResponse[]> {		
			let headers = {
				Authorization: `Bearer ${this.token}`,
				'x-requested-with': "XMLHttpRequest"
			}

			let pageSize = 500
			let page = 1
			let totalPages = 1
			let data: Types.RWResponse[] = []
			do {
				let payload: Record<string, any> = {
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
					}

					let request = await axios.post(`${this.baseURL}/api/v1/orderitem/browse`, payload, {
						headers: headers
          })

					let { TotalPages, PageNo } = request.data
					totalPages = TotalPages

					let parsed = Util.parseResponseDeals(request.data)
					data = [
							...data,
							...parsed
					]
					page++
				} while(page <= totalPages)

				return data
		}



		async getOrderItems(orderId: string): Promise<Types.RWResponse[]> {		
			let headers = {
				Authorization: `Bearer ${this.token}`,
				'x-requested-with': "XMLHttpRequest"
			}

			let pageSize = 500
			let page = 1
			let totalPages = 1
			let data: Types.RWResponse[] = []
			do {
				let payload: Record<string, any> = {
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
					}

					let request = await axios.post(`${this.baseURL}/api/v1/orderitem/browse`, payload, {
						headers: headers
          })

					let { TotalPages, PageNo } = request.data
					totalPages = TotalPages

					let parsed = Util.parseResponseDeals(request.data)
					data = [
							...data,
							...parsed
					]
					page++
				} while(page <= totalPages)

				return data
			}


			async insertLineItem(orderId: string, itemId: string): Promise<AxiosResponse<any>> {
				let headers = {
					Authorization: `Bearer ${this.token}`,
					'x-requested-with': "XMLHttpRequest"
				}

				let payload = {
					"OrderId": orderId,
					"BelowOrderItemId": itemId,
					"PrimaryItemId": ""
				}

				let req = await axios.post(`${this.baseURL}/api/v1/orderitem/insertlineitem`, payload, {
					headers
				})

				return req
			}

			async addSingleItemToOrderBottom(orderId: string, item: any, belowItemId: string): Promise<boolean> {
				let headers = {
            Authorization: `Bearer ${this.token}`,
            'x-requested-with': "XMLHttpRequest"
        }

				let lireq = this.insertLineItem(orderId, belowItemId)

				let req = await axios.post(`${this.baseURL}/api/v1/orderitem`, item, {
					headers
				})

				console.log(req)

				return false
			}	

			async addItemToOrder(orderId: string, itemId: string, items: Record<string, any>[], progress: (current: number, max: number) => void): Promise<any[]> {
				let ret: any[] = []
				
				let headers = {
            Authorization: `Bearer ${this.token}`,
            'x-requested-with': "XMLHttpRequest"
        }

        let payload = [
            ...items
        ]

        let lineItems: string[] = []

        let prg = 0
        let maxProgress = items.length * 2

        for (let i = 0; i < items.length; i++) {
            let req = await this.insertLineItem(orderId, itemId)

            while (req.data.StatusCode === 500 && req.data.Message.includes("deadlock")) {
                req = await this.insertLineItem(orderId, itemId)
            }


            let { OrderItemId } = req.data

            lineItems[i] = OrderItemId

            prg++
            progress(prg, maxProgress)
        }

        for (let i = 0; i < items.length; i++) {
            let req = await axios.post(`${this.baseURL}/api/v1/orderitem/many`, [{
                ...items[i],
                OrderItemId: lineItems[i],
								OrderId: orderId
            }], {
                headers: headers
            }).catch(async (reason) => {
                await this.rwAddItemToOrder__Cleanup(lineItems)
            })

            req = await axios.post(`${this.baseURL}/api/v1/orderitem/many`, [{
                ...items[i],
                OrderItemId: lineItems[i],
								OrderId: orderId
            }], {
                headers: headers
            }).catch(async (reason) => {
                await this.rwAddItemToOrder__Cleanup(lineItems)
            })

						if(req && req.data) {
							ret.push(req.data[0].Result.Value)
						}

            prg++
            progress(prg, maxProgress)
        }

        progress(0, 1) // reset progress bar
				return ret	
			}

			async getItems(page: number, pageSize: number, search?: Record<string, any>): Promise<Types.RWResponse[]> {
				let payload: Record<any, any> = {
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
					"searchfieldoperators": [
					],
					"searchfields": [
					],
					"searchfieldvalues": [
					],
					"searchfieldtypes": [
					],
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
				}

				let headers = {
					'Authorization': `Bearer ${this.token}`,
					'x-requested-with': "XMLHttpRequest"
        }

				if(search)
				{
						for(let i = 0; i < Object.keys(search).length; i++)
						{
								let key = Object.keys(search)[i]
								let value = search[key]

								payload.searchcondition.push("and")   
								payload.searchfieldoperators.push("like")
								payload.searchfields.push(key)
								payload.searchfieldtypes.push("text")
								payload.searchfieldvalues.push(value)
								payload.searchseparators.push(",")
						}
				}
				
				let req = await axios.post(`${this.baseURL}/api/v1/orderitem/validateicoderental/browse`, payload, {
					headers
				})
				
				return Util.parseResponseDeals(req.data)
			}

      async getOrder(orderId: string): Promise<Types.RWResponse | Record<string, any>> {
        let headers = {
          'Authorization': `Bearer ${this.token}`,
          'x-requested-with': "XMLHttpRequest"
        }
        
        try {
          let req = await axios.get(`${this.baseURL}/api/v1/order/${orderId}`, {
            headers
          })

          return {
            Rows: {
              ...req.data
            }
          }
        } catch(e: any) {
          return e.response.data
        }
      }

      async getVenue(venueId: string): Promise<Types.RWResponse | Record<string, any>> {
        
        let headers = {
          'Authorization': `Bearer ${this.token}`,
          'x-requested-with': "XMLHttpRequest"
        }
        
        try {
          let req = await axios.get(`${this.baseURL}/api/v1/venue/${venueId}`, {
            headers
          })

          return {
            Rows: {
              ...req.data
            }
          }
        } catch(e: any) {
          return e.response.data
        }
      }

      async updateOrder(orderId: string, data: Record<string, any>): Promise<Types.RWResponse | Record<string, any>> {
        let headers = {
          'Authorization': `Bearer ${this.token}`,
          'x-requested-with': "XMLHttpRequest"
        }
        
        try {
          let req = await axios.put(`${this.baseURL}/api/v1/order/${orderId}`, {
            ...data,
            "OrderId": orderId
          }, {
            headers
          })
          
          return {
            Rows: {
              ...req.data
            }
          }
        } catch(e: any) {
          return e.response.data
        }
      }

			async rwAddItemToOrder__Cleanup(lineItems: string[]) {
				let headers = {
            'Authorization': `Bearer ${this.token}`,
            'x-requested-with': "XMLHttpRequest"
        }
				for (let i = 0; i < lineItems.length; i++) {
						await axios.delete(`${this.baseURL}/api/v1/orderitem/${lineItems[i]}`, {
								headers: headers
						}).catch(reason => { })
				}
		};
}

