import { Style } from "./styles.model";
import { ProductType } from "./productType.model";
import { Vendor } from "./vendors.model";
import { Class } from "./class.model";

export interface Product {
    id: number
    name: string
    StyleID: number
    Style: Style
    ProductTypeID: number
    ProductType: ProductType
    VendorID: number
    Vendor: Vendor
    ClassID: number
    Class: Class
    createdAt: string;
  }


  
  export interface AddProductApi {
    name: string;
  }
  
  export default {};
  