export function SET_REGIONS(state, payload) {
  state.regions = payload;
}

export function SET_GC_ADDRESS_TYPES(state, payload){
  state.GCAddressTypeList = payload;
}

export function SET_GC_BUSINESS_TYPES(state, payload){
  state.GCBusinessTypeList = payload;
}

export function SET_WS_ADDRESS_TYPES(state, payload){
  state.WSAddressTypeList = payload;
}

export function SET_WS_BUSINESS_TYPES(state, payload){
  state.WSBusinessTypeList = payload;
}
// export function SET_PRODUCTS(state, payload) {
//   state.products = payload.Data;
//   state.page = payload.Page;
//   state.pageSize = payload.PageSize;
//   state.total = payload.Total;
// }

