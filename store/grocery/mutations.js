export function SET_GROCERIES(state, payload) {
  state.groceries = payload.Data;
  state.page = payload.Page;
  state.pageSize = payload.PageSize;
  state.total = payload.Total
}

export function SET_PARAMS(state, payload){
  state.params = payload;
}

export function SET_GROCERY_DETAIL( state, payload ){
  state.detailGrocery = payload;
}
