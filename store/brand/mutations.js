export function SET_BRANDS(state, payload) {
  state.brands = payload.Data;
  state.page = payload.Page;
  state.pageSize = payload.PageSize;
  state.total = payload.Total;
}