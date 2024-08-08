import Brand from "@/src/models/Brand";
import { BrandResponse } from "@/src/models/Brand";


export function fetchBrands(context){
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}Brand/GetAllBrands`
      );
      let responseData = new BrandResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Brand({
          BrandId: item.BrandId,
          BrandTitle: item.Brandname,
          BrandImgUrl: item.BrandImgUrl,
        }))
      )
      console.log(responseData)
      context.commit("SET_BRANDS", responseData);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchBrandsPage(context, _params) {
  return new Promise(async (resolve, reject) => {
    try {
      let modifyParams = {
        ...context.state.params,
        BrandName: _params.BrandName,
        page: _params.page,
        pageSize: _params.pageSize,
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}Brand/GetAllBrands`, { params: modifyParams } ,
      );

      let responseData = new BrandResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Brand({
          BrandId: item.BrandId ?? null,
          BrandTitle: item.Brandname ?? null,
          BrandImgUrl: item.BrandImgUrl ?? null,
        }))
      );
      console.log(responseData);
      context.commit("SET_BRANDS", responseData);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function  postBrand(context , _brand) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter post Brand')
      let inputBrand = _brand;
      let isSuccessfulAdd = true;
      let textStatus = 'Brand added successfully';
      console.log('------------------------------');
      console.log(inputBrand);
      // CREATE BRAND/SYSTEM_PRODUCT
      try {
        const body = {
          BrandTitle: inputBrand.BrandTitle,
          BrandImgUrl: inputBrand.BrandImgUrl,
          IsActive: true
        }
        console.log(body)
        const response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.PRODUCT}Brand/SystemBrand`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        let responseData = response.data.Data

      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to add brand';
        console.log(error);
      }
      console.log('finish post brand')
      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function putBrand(context , _brand) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter put Brand')
      const inputBrand = _brand;
      let isSuccessfulEdit = true;
      let textStatus = 'Brand edit successfully';
      console.log('------------------------------');
      console.log(inputBrand);
      // UPDATE BRAND/SYSTEM_BRAND
      try {
        const body = {
          BrandId: inputBrand.BrandId ?? null,
          BrandTitle: inputBrand.BrandTitle ?? null,
          BrandImgUrl: inputBrand.BrandImgUrl ?? null,
        }
        console.log(body)
        const response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.PRODUCT}Brand/SystemBrand`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
      } catch (error) {
        isSuccessfulEdit = false;
        textStatus = 'Failed to put Brand';
        console.log(error);
      }
      console.log('finish put Brand');
    resolve({
      isSuccessful: isSuccessfulEdit,
      textStatus
    });
  } catch (error) {
    reject(error);
  }
  });
}

export function  deleteBrand(context , _brand) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter DELETE Brand')
      const inputBrand = _brand;
      let isSuccessfulDelete = true;
      let textStatus = 'Brand delete successfully';
      // DELETE BRAND/SYSTEM_BRAND
      try {
        const params = { 'brandId': inputBrand.BrandId }
        const response = await this.$axios.delete(`${process.env.CLUSTER_URL}${process.env.PRODUCT}Brand/SystemBrand`, { params: params});
      } catch (error) {
        isSuccessfulDelete = false;
        textStatus = 'Fail delete brand';
        console.log(error);
      }
      console.log('finish delete brand')
      resolve({
        isSuccessful: isSuccessfulDelete,
        status: textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function  uploadBrandImage(context , image) {
  return new Promise(async (resolve, reject) => {

    try {
      let response = await this.$axios.post(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}Upload`, image
      );
      console.log(response);
      if (response.data && response.data.imageUrl) {
        let uploadedImageUrl = response.data.imageUrl;
        resolve({
          status: true,
          uploadedImageUrl: uploadedImageUrl,
        })
      } else {
        this.$swal({
          icon: 'error',
          title: 'Fail : Upload failed',
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500
        });
        resolve({
          status: false,
        });
      }
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: 'Error : Upload image',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Error uploading image:', error);
      resolve({
        status: false,
      });
      reject(error)
    }
  });
}