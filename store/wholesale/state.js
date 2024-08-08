//store/wholesale/state.js
import Wholesale from "../../src/models/wholesale/Wholesale";


export default function() {
return {
    wholesales: [],
    page: 1,
    pageSize: 50,
    total: 0,
    params: {},
    detailWholesale: new Wholesale(),
  };
}
