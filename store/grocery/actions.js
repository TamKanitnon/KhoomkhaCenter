import Grocery from '@/src/models/grocery/Grocery';
import { GroceryResponse } from '../../src/models/grocery/Grocery';

// --- GROCERY LIST ---
export function fetchGroceries(context, _params) {
  return new Promise(async (resolve, reject) => {
    try {
      context.commit("SET_PARAMS", _params);
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.GROCERY}BackOfficeGrocery/BackOfficeGrocerys`, { params:_params } ,
      );
      let responseData = new GroceryResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Grocery({
          GroceryId: item.GroceryId ?? null,
          GroceryName: item.GroceryName ?? null,
          ContactName: item.ContactName ?? null,
          ContactphoneNo: item.ContactphoneNo ?? null,
          Address: item.Address ?? null,
          Address2: item.Address2 ?? null,
          SubDistrictId: item.SubDistrictId ?? null,
          SubDistrictName: item.SubDistrictName ?? null,
          DistrictId: item.DistrictId ?? null,
          DistrictName: item.DistrictName ?? null,
          ProvinceId: item.ProvinceId ?? null,
          ProvinceName: item.ProvinceName ?? null,
          RegionId: item.RegionId ?? null,
          RegionName: item.RegionName ?? null,
          ZipCode: item.ZipCode ?? null,
        }))
      );
      console.log(responseData);
      context.commit("SET_GROCERIES", responseData);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchGroceriesPage(context, _params) {
  return new Promise(async (resolve, reject) => {
    try {
      let modifyParams = {
        ...context.state.params,
        page: _params.page,
        pageSize: _params.pageSize,
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.GROCERY}BackOfficeGrocery/BackOfficeGrocerys`, { params: modifyParams } ,
      );

      let responseData = new GroceryResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Grocery({
          GroceryId: item.GroceryId ?? null,
          GroceryName: item.GroceryName ?? null,
          ContactName: item.ContactName ?? null,
          ContactphoneNo: item.ContactphoneNo ?? null,
          Address: item.Address ?? null,
          Address2: item.Address2 ?? null,
          SubDistrictId: item.SubDistrictId ?? null,
          SubDistrictName: item.SubDistrictName ?? null,
          DistrictId: item.DistrictId ?? null,
          DistrictName: item.DistrictName ?? null,
          ProvinceId: item.ProvinceId ?? null,
          ProvinceName: item.ProvinceName ?? null,
          RegionId: item.RegionId ?? null,
          RegionName: item.RegionName ?? null,
          ZipCode: item.ZipCode ?? null,
        }))
      );

      console.log(responseData);
      context.commit("SET_GROCERIES", responseData);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}


// --- GROCERY DETIAL ---
export function fecthGrocery(context, _groceryId){
  return new Promise(async (resolve, reject) => {
    try {
      let modifyParams = {
        groceryId: _groceryId,
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.GROCERY_USER}BackOfficeGroceryUser/BackOfficeGroceryUser`, { params: modifyParams } ,
      );

      // let responseData = new Grocery(
      //   // -- FORMAT --  
      //   // ProductId: item.ProductId ?? null,
      //   // ...
      // );
      let responseData = response.data.Data;

      console.log(context);
      console.log(responseData);
      context.commit("SET_GROCERY_DETAIL", responseData);

      resolve({isSuccessful: true, data: responseData});
    } catch (error) {
      console.log(error)
      reject({isSuccessful: false, error});
    }
  });
}
