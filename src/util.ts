import * as Types from './types'

export const parseResponseDeals = (deals: any): Types.RWRecord[] => {
    let ret: Types.RWRecord[] = []

    for(let row of deals.Rows) {
        let RWDRow: Types.RWRecord = { 
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
