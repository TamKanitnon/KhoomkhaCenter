import Wholesale from '@/src/models/wholesale/wholesale';
import { WholesaleResponse } from '../../src/models/wholesale/Wholesale';
import Region from '@/src/models/master/address/Region';

// --- WHOLESALE LIST ---
export function fetchWholesales(context, _params) {
  return new Promise(async (resolve, reject) => {
    try {
      context.commit("SET_PARAMS", _params);
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}BackOfficeSupplier/BackOfficeSuppliers`, { params:_params } ,
      );
      let responseData = new WholesaleResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Wholesale({
          SupplierId: item.SupplierId ?? null,
          SupplierName: item.SupplierName ?? null,
          CitizenId: item.CitizenId ?? null,
          TaxId: item.TaxId ?? null,
          ContactName: item.ContactName,
          SupplierProfileImage: item.SupplierProfileImage ?? null,
          SupplierAddressId: item.SupplierAddressId ?? null,
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
      context.commit("SET_WHOLESALES", responseData);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchWholesalesPage(context, _params) {
  return new Promise(async (resolve, reject) => {
    try {
      let modifyParams = {
        ...context.state.params,
        page: _params.page,
        pageSize: _params.pageSize,
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER}BackOfficeSupplier/BackOfficeSuppliers`, { params: modifyParams } ,
      );

      let responseData = new WholesaleResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Wholesale({
          SupplierId: item.SupplierId ?? null,
          SupplierName: item.SupplierName ?? null,
          CitizenId: item.CitizenId ?? null,
          TaxId: item.TaxId ?? null,
          ContactName: item.ContactName,
          SupplierProfileImage: item.SupplierProfileImage ?? null,
          SupplierAddressId: item.SupplierAddressId ?? null,
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
      context.commit("SET_WHOLESALES", responseData);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}


// --- Wholesale DETIAL ---

export function fetchWholesale(context, _supplierId){
  return new Promise(async (resolve, reject) => {
    try {
      let modifyParams = {
        supplierId: _supplierId,
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.SUPPLIER_USER}BackOfficeSupplierUser/BackOfficeSupplierUser`, { params: modifyParams } ,
      );

      let responseData = response.data.Data;
      // console.log(context);
      // console.log(responseData);
      context.commit("SET_WHOLESALE_DETAIL", responseData);
      resolve({isSuccessful: true, data: responseData});
    } catch (error) {
      reject({isSuccessful: false, error});
    }
  });
}


