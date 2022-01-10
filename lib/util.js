"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResponseDeals = void 0;
const parseResponseDeals = (deals) => {
    let ret = [];
    for (let row of deals.Rows) {
        let RWDRow = {
            Rows: {}
        };
        for (let col of Object.keys(deals.ColumnIndex)) {
            let index = deals.ColumnIndex[col];
            RWDRow.Rows[col] = row[index];
        }
        ret.push(RWDRow);
    }
    return ret;
};
exports.parseResponseDeals = parseResponseDeals;
//# sourceMappingURL=util.js.map