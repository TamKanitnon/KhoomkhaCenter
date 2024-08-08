
import Region from '@/src/models/master/address/Region';
import Province from '@/src/models/master/address/Region';
import District from '@/src/models/master/address/Region';
import SubDistrict from '@/src/models/master/address/Region';
import WSAddressType from '@/src/models/master/wholesale/WSAddressType';
import WSBusinessType from '@/src/models/master/wholesale/WSBusinessType';
import GCAddressType from '@/src/models/master/grocery/GCAddressType';
import GCBusinessType from '@/src/models/master/grocery/GCBusinessType';

// ---- REGION ----
export function fetchRegions(context) {
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        countryCode: 'TH',
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}MasterData/Regions`, { params:_params } 
      );
      let responseData = response.data.Data;

      let listRegions = responseData.map(item => new Region({
        RegionId: item.RegionId ?? null,
        RegionName: item.RegionName ?? null,
      }));
      console.log(listRegions);
      context.commit("SET_REGIONS", listRegions);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function postRegion(context, _regionName) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        RegionName: _regionName
      };
      let response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.SUPPLIER}MasterData/Regions`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
      });
      resolve({
        isSuccessful: true,
        status: 'Success create new region'
      });
    } catch (error) {
      let errorMessage = 'Error';
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = `${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      reject({
        isSuccessful: false,
        status: errorMessage
      });
    }
  });
}

export function putRegion(context, _region){

}

export function deleteRegion(context, _region){

}

// ---- PROVINCE ----
export function fetchProvinces(context, _region){
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        regionId: _region.RegionId,
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}MasterData/Provinces`, { params:_params } 
      );
      let responseData = response.data.Data;
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}

export function postProvince(context, { _region, _provinceName }){

}

export function putProvince(context, _province){

}

export function deleteProvince(context, _province){

}

// ---- DISTRICT ----
export function fetchDistricts(context, _province){
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        provinceId: _province.ProvinceId,
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}MasterData/Districts`, { params:_params } 
      );
      let responseData = response.data.Data;
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}

export function postDistrict(context, _districtName){

}

export function putDistrict(context, _district){

}

export function deleteDistrict(context, _district){
  
}

// ---- SUB-DISTRICT ----
export function fetchSubDistricts(context, _district){
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        districtId: _district.DistrictId,
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}MasterData/SubDistricts`, { params:_params } 
      );
      let responseData = response.data.Data;
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}

export function postSubDistrict(context, _districtName){

}

export function putSubDistrict(context, _district){

}

export function deleteSubDistrict(context, _district){
  
}

// --- WHOLESALE : Address type ---
export function getWholesaleAddressType(context){
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}MasterData/AddressType`, { params:_params } 
      );
      let responseData = response.data.Data;
      let listAddressType = responseData.map(item => new WSAddressType({
        AddressTypeName: item.AddressTypeName ?? null,
        AddressTypeCode: item.AddressTypeCode ?? null,
      }));
      console.log(listAddressType);
      context.commit("SET_WS_ADDRESS_TYPES", listAddressType);
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}

export function postWholesaleAddressType(context){
  
}

export function putWholesaleAddressType(context){
  
}

export function deleteWholesaleAddressType(context){
  
}
// --- WHOLESALE : Business type ---
export function getWholesaleBusinessType(context){
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}MasterData/BusinessType`, { params:_params } 
      );
      let responseData = response.data.Data;
      let listBuinessType = responseData.map(item => new WSBusinessType({
        BusinessType: item.BusinessType ?? null,
        BusinessTypeId: item.BusinessTypeId ?? null,
      }));
      console.log(listBuinessType);
      context.commit("SET_WS_BUSINESS_TYPES", listBuinessType);
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}

export function postWholesaleBusinessType(context){
  
}

export function putWholesaleBusinessType(context){
  
}

export function deleteWholesaleBusinessType(context){
  
}

// --- GROCERY : Address type ---
export function getGroceryAddressType(context){
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.GROCERY}MasterData/AddressType`, { params:_params } 
      );
      let responseData = response.data.Data;
      let listAddressType = responseData.map(item => new GCAddressType({
        AddressTypeName: item.AddressTypeName ?? null,
        AddressTypeCode: item.AddressTypeCode ?? null,
      }));      
      context.commit("SET_GC_ADDRESS_TYPES", listAddressType);
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}

export function postGroceryAddressType(context){
  
}

export function putGroceryAddressType(context){
  
}

export function deleteGroceryAddressType(context){
  
}
// --- GROCERY : Business type ---
export function getGroceryBusinessType(context){
  return new Promise(async (resolve, reject) => {
    try {
      const _params = {
        languageCode: 'TH',
      };
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.GROCERY}MasterData/BusinessType`, { params:_params } 
      );
      let responseData = response.data.Data;
      let listBusinessType = responseData.map(item => new GCBusinessType({
        BusinessType: item.BusinessType ?? null,
        BusinessTypeCode: item.BusinessTypeCode ?? null,
      }));      
      context.commit("SET_GC_BUSINESS_TYPES", listBusinessType);
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}

export function postGroceryBusinessType(context){
  
}

export function putGroceryBusinessType(context){
  
}

export function deleteGroceryBusinessType(context){
  
}