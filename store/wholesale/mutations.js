export function SET_WHOLESALES(state, payload) {
  state.wholesales = payload.Data;
  state.page = payload.Page;
  state.pageSize = payload.PageSize;
  state.total = payload.Total
}

export function SET_PARAMS(state, payload){
  state.params = payload;
}

export function SET_WHOLESALE_DETAIL( state, payload ){
  state.detailWholesale = payload;
}
