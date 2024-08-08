export function SET_PRODUCTS(state, payload) {
  state.products = payload.Data;
  state.page = payload.Page;
  state.pageSize = payload.PageSize;
  state.total = payload.Total
}

export function SET_PARAMS(state, payload){
  state.params = payload
}

export function SET_CATEGORIES(state, payload){
  state.categories =  payload
}

export function SET_SUBCATEGORIES(state, payload){
  state.subCategories =  payload
}

export function SET_SUBCATEGORIES_PAGE(state, payload){
  state.subCategoriesPage =  payload
}

export function SET_UNITS(state, payload){
  state.units = payload
}

export function SET_EDITING_PRODUCT_DETAIL(state, payload){
  const product = {
    ProductId: payload.ProductId,
    ProductDetailId: payload.ProductDetailId,
    ProductName: payload.ProductName,
    ProductCategoryId: payload.ProductCategoryId,
    ProductSubCategoryId: payload.ProductSubCategoryId,
    BrandId: payload.BrandId ?? '',
    ProductDescription: payload.ProductDescription ?? '', // Add if needed
    ProductSummary: payload.ProductSummary ?? '', // Add if needed
    Barcode: payload.Barcode ?? '', // Add if needed
  }
  const newData = {
    ...state.editingProduct,
    ...product
  }
  state.editingProduct = newData;
}

export function SET_EDITING_PRODUCT_ATTRIBUTE(state, payload){
  const attribute = {
    UnitId: payload.UnitId,
    MeasurementValue: payload.MeasurementValue,
    MeasurementId: payload.MeasurementId,
    SizeWidth: payload.SizeWidth,
    SizeLong: payload.SizeLong,
    SizeHeight: payload.SizeHeight,
  }
  const newData = {
    ...state.editingProduct,
    ...attribute
  }
  state.editingProduct = newData;
}

export function SET_EDITING_PRODUCT_IMAGE(state, payload){
  const image = {
    ImgUrl: payload.ImgUrl,
  }
  const newData = {
    ...state.editingProduct,
    ...image
  }
  state.editingProduct = newData;
}