//store/grocery/state.js
import Grocery from "../../src/models/grocery/Grocery";


export default function() {
return {
    groceries: [],
    page: 1,
    pageSize: 50,
    total: 0,
    params: {},
    detailGrocery: new Grocery(),
  };
}
