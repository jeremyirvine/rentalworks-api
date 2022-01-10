import * as Types from './types'

export const parseResponseDeals = (deals: any): Types.RWResponse[] => {
    let ret: Types.RWResponse[] = []

    for(let row of deals.Rows) {
        let RWDRow: Types.RWResponse = { 
            Rows: { }   
        };
        for(let col of Object.keys(deals.ColumnIndex)) {
            let index = deals.ColumnIndex[col]
            RWDRow.Rows[col] = row[index]
        }

        ret.push(RWDRow)
    }

    return ret;
}
