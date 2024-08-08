import Product from '@/src/models/Product/Product';
import Category from "@/src/models/master/Category";
import SubCategory from "@/src/models/master/SubCategory";
import Unit from "@/src/models/master/Unit"
import { ProductResponse } from "@/src/models/product/product";

export function fetchProducts(context, _params) {
  return new Promise(async (resolve, reject) => {
    try {
      context.commit("SET_PARAMS", _params);

      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}Product/GetAllProducts`, { params:_params } ,
      );

      let responseData = new ProductResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Product({
          ProductId: item.ProductId ?? null,
          ProductDetailId: item.ProductDetailId?? null,
          ProductName: item.ProductName ?? null,
          ProductCategoryId: item.ProductCategoryId ?? null,
          ProductCategoryName: item.ProductCategoryName ?? null,
          ProductSubCategoryId: item.ProductSubCategoryId ?? null,
          ProductSubCategoryName: item.ProductSubCategoryName ?? null,
          ProductImageId: item.Images[0].ProductImageId ?? null,
          ImgUrl: item.Images[0].ImgUrl ?? null,
          ProductDescription: item.ProductDescription ?? null,
          ProductSummary: item.ProductSummary ?? null,
          Barcode: item.Barcode ?? null,
          BrandId: item.BrandId ?? null,
          BrandName: item.BrandName ?? null,
          UnitId: item.UnitId ?? null,
          MeasurementValue: item.MeasurementValue ?? null,
          MeasurementId: item.MeasurementId ?? null,
          SizeWidth: item.SizeWidth ?? null,
          SizeLong: item.SizeLong ?? null,
          SizeHeight: item.SizeHeight ?? null
        }))
      );
      console.log(responseData);
      context.commit("SET_PRODUCTS", responseData);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductsPage(context, _params) {
  return new Promise(async (resolve, reject) => {
    try {
      let modifyParams = {
        ...context.state.params,
        page: _params.page,
        pageSize: _params.pageSize,
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}Product/GetAllProducts`, { params: modifyParams } ,
      );

      let responseData = new ProductResponse(
        response.data.Data.Page,
        response.data.Data.PageSize,
        response.data.Data.Total,
        response.data.Data.Data.map(item => new Product({
          ProductId: item.ProductId ?? null,
          ProductDetailId: item.ProductDetailId?? null,
          ProductName: item.ProductName ?? null,
          ProductCategoryId: item.ProductCategoryId ?? null,
          ProductCategoryName: item.ProductCategoryName ?? null,
          ProductSubCategoryId: item.ProductSubCategoryId ?? null,
          ProductSubCategoryName: item.ProductSubCategoryName ?? null,
          ProductImageId: item.Images[0].ProductImageId ?? null,
          ImgUrl: item.Images[0].ImgUrl ?? null,
          ProductDescription: item.ProductDescription ?? null,
          ProductSummary: item.ProductSummary ?? null,
          Barcode: item.Barcode ?? null,
          BrandId: item.BrandId ?? null,
          BrandName: item.BrandName ?? null,
          UnitId: item.UnitId ?? null,
          MeasurementValue: item.MeasurementValue ?? null,
          MeasurementId: item.MeasurementId ?? null,
          SizeWidth: item.SizeWidth ?? null,
          SizeLong: item.SizeLong ?? null,
          SizeHeight: item.SizeHeight ?? null
        }))
      );
      console.log(responseData);
      context.commit("SET_PRODUCTS", responseData);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

// --- CATEGORY ----
export function fetchCategories(context){
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductCategory/ProductCategoryAll`
      );
      let responseData = response.data.Data;
      console.log(response.data)
      let listCats = responseData.map(item => new Category({
        ProductCategoryId: item.ProductCategoryId,
        Tiltle: item.Tiltle,
        ImageBanner: item.ImageBanner,
        ImageIcon: item.ImageIcon,
        IsActive: item.IsActive,
        CategoryCode: item.CategoryCode,
      }))
      console.log(listCats)
      context.commit("SET_CATEGORIES", listCats);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function postCategory(context, _category){
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter post Category')
      let inputCategory = _category;
      let isSuccessfulAdd = true;
      let textStatus = 'Category added successfully';
      console.log('------------------------------');
      console.log(inputCategory);
      // CREATE PRODUCT/PRODUCT
      try {
        const body = {
          Tiltle: inputCategory.Tiltle,
          CategoryCode: inputCategory.CategoryCode || null,
          IsActive: true,
          ImageBanner: inputCategory.ImageBanner,
          ImageIcon: inputCategory.ImageIcon,
        }
        console.log(body)
        const response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductCategory/ProductCategory`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        let responseData = response.data.Data
        // inputCategory = { 
        //   ...inputCategory, 
        //   ProductId: responseData.ProductId,
        //   ProductDetailId: responseData.ProductDetailId,
        // };

      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to add product';
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error : Add Category',
          text: error,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 4000
        });
      }
      console.log('finish post product')

      this.$swal({
        icon: 'success',
        title: 'Success : Upload image',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      });
      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function putCategory(context, _category){
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter post Category')
      let inputCategory = _category;
      let isSuccessfulAdd = true;
      let textStatus = 'Category edit successfully';
      console.log('------------------------------');
      console.log(inputCategory);
      // CREATE PRODUCT/PRODUCT
      try {
        const body = {
          ProductCategoryId: inputCategory.ProductCategoryId,
          Tiltle: inputCategory.Tiltle,
          CategoryCode: inputCategory.CategoryCode || null,
          IsActive: inputCategory.IsActive,
          ImageBanner: inputCategory.ImageBanner,
          ImageIcon: inputCategory.ImageIcon,
        }
        console.log(body)
        const response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductCategory/ProductCategory`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        let responseData = response.data.Data

      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to update category';
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error : Add Category',
          text: error,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 4000
        });
      }
      console.log('finish put category')

      this.$swal({
        icon: 'success',
        title: 'Success : put category',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      });
      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function patchCategory(context, _category){
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter patch Category')
      let inputCategory = _category;
      let isSuccessfulAdd = true;
      let textStatus = 'Category patch successfully';
      console.log('------------------------------');
      console.log(inputCategory);
      // PATCH PRODUCT_CATEGORY/PRODUCT_CATEGORY
      try {
        const modifyParams = {
          productCategoryId: inputCategory.ProductCategoryId,
        }
        console.log(modifyParams)
        let response = await this.$axios.patch(
          `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductCategory/ProductCategory`, 
          {},
          { params: modifyParams} , 
          { 
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        );
        let responseData = response.data.Data

      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to patch category';
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error : PATCH Category',
          text: error,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 4000
        });
      }
      console.log('finish put category')

      this.$swal({
        icon: 'success',
        title: 'Success : patch category',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      });
      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

// --- SUB CATEGORY ---
export function fetchSubCategoriesAll(context){
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductSubCategory/ProductSubCategoryAll`,
      );
      let responseData = response.data.Data;
      let listSubCats = responseData.map(item => new SubCategory({
        ProductSubCategoryId: item.ProductSubCategoryId,
        Tiltle: item.ProductSubCategoryName,
        SubCategoryCode: item.SubCategoryCode,
        ProductCategoryName: item.ProductCategoryName,
        ImgUrl: item.ImgUrl,
        IsActive: item.IsActive,
      }))
      console.log(listSubCats)
      context.commit("SET_SUBCATEGORIES_PAGE", listSubCats);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchSubCategoriesFilter(context, _categoryId ){
  return new Promise(async (resolve, reject) => {
    try {
      let _params = {
        productCategoryId: _categoryId
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductSubCategory/ProductSubCategoryAll`, { params: _params }
      );
      let responseData = response.data.Data;
      let listSubCats = responseData.map(item => new SubCategory({
        ProductSubCategoryId: item.ProductSubCategoryId,
        Tiltle: item.ProductSubCategoryName,
        SubCategoryCode: item.SubCategoryCode,
        ProductCategoryName: item.ProductCategoryName,
        ImgUrl: item.ImgUrl,
        IsActive: item.IsActive,
      }))
      console.log(listSubCats)
      context.commit("SET_SUBCATEGORIES_PAGE", listSubCats);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchSubCategories(context, _categoryId ){
  return new Promise(async (resolve, reject) => {
    try {
      let _params = {
        productCategoryId: _categoryId
      }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductSubCategory/NewProductSubCategorys`, { params: _params }
      );
      let responseData = response.data.Data;
      let listSubCats = responseData.map(item => new SubCategory({
        ProductSubCategoryId: item.ProductSubCategoryId,
        Tiltle: item.Tiltle,
        ImgUrl: item.ImgUrl,
      }))
      console.log(listSubCats)
      context.commit("SET_SUBCATEGORIES", listSubCats);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function postSubCategory(context, _input){
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter post Sub Category')
      let inputSubCategory = _input;
      let isSuccessfulAdd = true;
      let textStatus = 'SubCategory added successfully';
      console.log('------------------------------');
      console.log(inputSubCategory);
      // CREATE PRODUCT_SUB_CATEGORY/NEW_PRODUCT_SUB_CATEGORY
      try {
        const body = {
          Tiltle: inputSubCategory.Tiltle,
          SubCategoryCode: inputSubCategory.SubCategoryCode || null,
          IsActive: true,
          ImgUrl: inputSubCategory.ImgUrl,
          ProductCategoryId: inputSubCategory.ProductCategoryId,
        }
        console.log(body)
        const response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductSubCategory/NewProductSubCategory`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        let responseData = response.data.Data
      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to add sub category';
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error : Add Sub Category',
          text: error,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 4000
        });
      }
      console.log('finish post sub category')

      this.$swal({
        icon: 'success',
        title: 'Success : Add Sub Category',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      });
      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function putSubCategory(context, _input){
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter put SubCategory')
      let inputSubCategory = _input;
      let isSuccessfulAdd = true;
      let textStatus = 'SubCategory edit successfully';
      console.log('------------------------------');
      console.log(inputSubCategory);
      // CREATE PRODUCT_SUB_CATEGORY/NEW_PRODUCT_SUB_CATEGORY
      try {
        const body = {
          ProductSubCategoryId: inputSubCategory.ProductSubCategoryId,
          ProductCategoryId: inputSubCategory.ProductCategoryId,
          Tiltle: inputSubCategory.Tiltle,
          SubCategoryCode: inputSubCategory.SubCategoryCode || null,
          IsActive: inputSubCategory.IsActive,
          ImgUrl: inputSubCategory.ImgUrl,
        }
        console.log(body)
        const response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductSubCategory/NewProductSubCategory`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        let responseData = response.data.Data

      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to edit sub category';
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error : Edit Sub Category',
          text: error,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 4000
        });
      }
      console.log('finish put sub-category')

      this.$swal({
        icon: 'success',
        title: 'Success : Edit Sub category',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      });
      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function patchSubCategory(context, _input){
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter patch Sub Category')
      let inputSubCategory = _input;
      let isSuccessfulAdd = true;
      let textStatus = 'Sub Category patch successfully';
      console.log('------------------------------');
      console.log(inputSubCategory);
      // PATCH PRODUCT_SUB_CATEGORY/NE_PRODUCT_SUB_CATEGORY
      try {
        const modifyParams = {
          productSubCategoryId: inputSubCategory.ProductSubCategoryId,
        }
        console.log(modifyParams)
        let response = await this.$axios.patch(
          `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductSubCategory/NewProductSubCategory`, 
          {},
          { params: modifyParams} , 
          { 
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        );
        let responseData = response.data.Data

      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to patch sub category';
        console.log(error);
        this.$swal({
          icon: 'error',
          title: 'Error : PATCH Sub Category',
          text: error,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 4000
        });
      }
      console.log('finish patcg sub-category')

      this.$swal({
        icon: 'success',
        title: 'Success : patch SubCategory',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      });
      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function fetchUnits(context){
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}UnitMeasurement/Units`
      );
      let responseData = response.data.Data;
      let listUnits = responseData.map(item => new Unit({
        UnitId: item.UnitId,
        UnitTitle: item.UnitTitle,
      }))
      console.log(listUnits)
      context.commit("SET_UNITS", listUnits);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductDetail(context, _productId){
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Fetching attribute - products id : ${_productId}`)
      const params = { 'productId': _productId }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}Product/Product`, { params: params } ,
      );
      let responseData = response.data.Data;
      let detail = {
        ProductId: responseData.ProductId,
        ProductDetailId: responseData.ProductDetailId,
        ProductName: responseData.ProductName,
        ProductCategoryId: responseData.ProductCategoryId,
        ProductSubCategoryId: responseData.ProductSubCategoryId,
        BrandId: responseData.BrandId ?? '',
        ProductDescription: responseData.ProductDescription ?? '',
        ProductSummary: responseData.ProductSummary ?? '',
        Barcode: responseData.Barcode ?? '',
      }
      context.commit("SET_EDITING_PRODUCT_DETAIL", detail)

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductAttribute(context, _productDetailId){
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Fetching attribute - product detail id : ${_productDetailId}`)
      const params = { 'productDetailId': _productDetailId }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductAttribute/productattribute`, { params: params } ,
      );
      let responseData = response.data.Data;
      let attributes = {
        UnitId: responseData.UnitId,
        MeasurementValue: responseData.MeasurementValue,
        MeasurementId: responseData.MeasurementId,
        SizeWidth: responseData.SizeWidth,
        SizeLong: responseData.SizeLong,
        SizeHeight: responseData.SizeHeight,
      }
      context.commit("SET_EDITING_PRODUCT_ATTRIBUTE", attributes)
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductImage(context, _productImageId){
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Fetching image - product image id : ${_productImageId}`)
      const params = { 'productImageId': _productImageId }
      let response = await this.$axios.get(
        `${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductImage/productimage`, { params: params } ,
      );
      let responseData = response.data.Data;
      let image = {
        ImgUrl: responseData.ImgUrl,
      }
      context.commit("SET_EDITING_PRODUCT_IMAGE", image)
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function  postProductItem(context , _product) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter post productItem')
      let inputProduct = _product;
      let isSuccessfulAdd = true;
      let textStatus = 'Product added successfully';
      console.log('------------------------------');
      console.log(inputProduct);
      // CREATE PRODUCT/PRODUCT
      try {
        const body = {
          ProductCategoryId: inputProduct.ProductCategoryId,
          ProductSubCategoryId: inputProduct.ProductSubCategoryId,
          ProductName: inputProduct.ProductName,
          ProductDescription: inputProduct.ProductDescription,
          ProductSummary: "",
          Barcode: "",
          BrandId: inputProduct.BrandId,
          ProductOwner: "KK"
        }
        console.log(body)
        const response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.PRODUCT}Product/SystemProduct`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
        let responseData = response.data.Data
        inputProduct = { 
          ...inputProduct, 
          ProductId: responseData.ProductId,
          ProductDetailId: responseData.ProductDetailId,
        };

      } catch (error) {
        isSuccessfulAdd = false;
        textStatus = 'Failed to add product';
        console.log(error);
      }
      console.log('finish post product')


      // CREATE PRODUCT_ATTRIBUTE/PRODUC_ATTRIBUT using PRODUCT_DETAIL_ID
      if (isSuccessfulAdd) {
        try {
          const body = {
            ProductDetailId: inputProduct.ProductDetailId,
            UnitId: inputProduct.UnitId,
            MeasurementValue: inputProduct.MeasurementValue,
            SizeWidth: inputProduct.SizeWidth,
            SizeLong: inputProduct.SizeLong,
            SizeHeight: inputProduct.SizeHeight,
            IsUseStockOption: true
          }
          const response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductAttribute/systemproductattribute`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const responseData = response.data.Data
          console.log(response)
        } catch (error) {
          isSuccessfulAdd = false;
          textStatus = 'Failed to add product attribute';
          console.log(error);
        }
      }
      console.log('finish post attribute')

      // CREATE PRODUCT_IMAGE/PRODUCT_IMAGE using PRODUCT_DETAIL_ID
      if (isSuccessfulAdd) {
        try {
          const body = {
            ProductDetailId: inputProduct.ProductDetailId,
            ImgUrl: inputProduct.ImgUrl,
            IsCover: true
          }
          const response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductImage/systemproductimage`,body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const responseData = response.data.Data
          console.log(response)
        } catch (error) {
          isSuccessfulAdd = false;
          textStatus = 'Failed to add product image';
          console.log(error);
        }
      }
      console.log('finish post image')

      resolve({
        isSuccessful: isSuccessfulAdd,
        textStatus
      });
    } catch (error) {
      reject(error);
    }
    });

}

export function  putProductItem(context , _product) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter put productItem')
      const inputProduct = _product;
      let isSuccessfulEdit = true;
      let textStatus = 'Product edit successfully';
      console.log('------------------------------');
      console.log(inputProduct);
      // UPDATE PRODUCT/PRODUCT
      try {
        const body = {
          ProductId: inputProduct.ProductId,
          ProductCategoryId: inputProduct.ProductCategoryId,
          ProductSubCategoryId: inputProduct.ProductSubCategoryId,
          ProductName: inputProduct.ProductName,
          ProductDescription: inputProduct.ProductDescription,
          ProductSummary: "",
          Barcode: "",
          BrandId: inputProduct.BrandId,
        }
        console.log(body)
        const response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.PRODUCT}Product/SystemProduct`, body, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
      } catch (error) {
        isSuccessfulEdit = false;
        textStatus = 'Failed to put product';
        console.log(error);
      }
      console.log('finish put product')


      // UPDATE PRODUCT_ATTRIBUTE/PRODUC_ATTRIBUT using PRODUCT_DETAIL_ID
      if (isSuccessfulEdit) {
        let productAttributeId = ''
        try {
          const params = { 'productDetailId': inputProduct.ProductDetailId }
          const response = await this.$axios.get(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductAttribute/productattribute`, {params: params})
          const responseData = response.data.Data
          productAttributeId = responseData.ProductAttributeId
        } catch (error) { }
        try {
          console.log(inputProduct)
          const body = {
            ProductAttributeId: productAttributeId,
            UnitId: inputProduct.UnitId,
            MeasurementValue: inputProduct.MeasurementValue,
            SizeWidth: inputProduct.SizeWidth,
            SizeLong: inputProduct.SizeLong,
            SizeHeight: inputProduct.SizeHeight,
            IsUseStockOption: true
          }
          const response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductAttribute/systemproductattribute`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const responseData = response.data.Data
          console.log(response)
        } catch (error) {
          isSuccessfulEdit = false;
          textStatus = 'Failed to put product attribute';
          console.log(error);
        }
      }
      console.log('finish put attribute')

      // CREATE PRODUCT_IMAGE/PRODUCT_IMAGE using PRODUCT_DETAIL_ID
      if (isSuccessfulEdit) {
        let _productImageId = ''
        try {
          const params = { 'productDetailId': inputProduct.ProductDetailId }
          const response = await this.$axios.get(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductImage/productimages`, {params:params})
          const responseData = response.data.Data
          _productImageId = responseData[0].ProductImageId
        } catch (error) { }
        try {
          const body = {
            ProductImageId: _productImageId,
            ImgUrl: inputProduct.ImgUrl,
            IsCover: true
          }
          const response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductImage/systemproductimage`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const responseData = response.data.Data
          console.log(response)
        } catch (error) {
          isSuccessfulEdit = false;
          textStatus = 'Failed to edit product image';
          console.log(error);
        }
      }
      console.log('finish put image')

    resolve({
      isSuccessful: isSuccessfulEdit,
      textStatus
    });
  } catch (error) {
    reject(error);
  }
  });
}

export function  deleteProductItem(context , _product) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('enter DELETE productItem')
      const inputProduct = _product;
      let isSuccessfulDelete = true;
      let textStatus = 'Product delete successfully';
      // DELETE PRODUCT/PRODUCT
      try {
        const params = { 'productId': inputProduct.ProductId }
        const response = await this.$axios.delete(`${process.env.CLUSTER_URL}${process.env.PRODUCT}Product/SystemProduct`, { params: params});
      } catch (error) {
        isSuccessfulDelete = false;
        textStatus = 'Fail delete product & product detail';
        console.log(error);
      }
      console.log('finish delete product')


      // DELETE PRODUCT_ATTRIBUTE/PRODUC_ATTRIBUT using PRODUCT_DETAIL_ID
      if (isSuccessfulDelete) {
        let productAttributeId = ''
        try {
          const params = { 'productDetailId': inputProduct.ProductDetailId }
          const response = await this.$axios.delete(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductAttribute/systemproductattribute`, { params: params});
        } catch (error) {
          isSuccessfulDelete = false;
          textStatus = 'Fail delete attribute';
          console.log(error);
        }
      }
      console.log('finish post attribute')

      // DELETE PRODUCT_IMAGE/PRODUCT_IMAGE using PRODUCT_DETAIL_ID
      if (isSuccessfulDelete) {
        try {
          const params = { 'productDetailId': inputProduct.ProductDetailId }
          const response = await this.$axios.delete(`${process.env.CLUSTER_URL}${process.env.PRODUCT}ProductImage/systemproductimage`, { params: params});
        } catch (error) {
          isSuccessfulDelete = false;
          textStatus = 'Fail delete image';
          console.log(error);
        }
      }
      console.log('finish delete image')
      resolve({
        isSuccessful: isSuccessfulDelete,
        status: textStatus
      });
    } catch (error) {
      reject(error);
    }
    });
}

export function  uploadProductImage(context , image) {
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
