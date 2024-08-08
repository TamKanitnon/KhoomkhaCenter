export function regions(state) {
  return state.regions;
}

export function GCAddressTypes(state){
  return state.GCAddressTypeList;
}

export function GCBusinessTypes(state){
  return state.GCBusinessTypeList;
}

export function WSAddressTypes(state){
  console.log('-----');
  console.log(state.WSAddressTypeList)
  return state.WSAddressTypeList;
}


export function WSBusinessTypes(state){
  return state.WSBusinessTypeList;
}