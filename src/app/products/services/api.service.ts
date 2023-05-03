import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // to hold searchterm -behaviour subject
  searchTerm=new BehaviorSubject('')

  // to hold cart count
  cartItemCount = new BehaviorSubject(0)

  BASE_URL = 'https://shopping-cart-x9h8.onrender.com'

  constructor(private http: HttpClient) {
    this.cartCount()
   }

  // get all products
  getallproducts() {
    // api
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  // viewproduct
  viewproduct(id: any) {
    // api
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }

  // wishlist/add-product
  addtowishlist(id:any,title:any,price:any,image:any){
const body ={
  id,title,price,image
}
// api
return this.http.post(`${this.BASE_URL}/wishlist/add-product`,body)
  }

  // wishlist/get-items
  getwishlist(){
    // api
    return this.http.get(`${this.BASE_URL}/wishlist/get-items`)
  }


  // wishlist/remove-item/3
removewishlistitem(id:any){
  // api
  return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`)
}


// add to cart api - cart/add-product
addtoCart(product:any){
  // get id,title,image,price,quantity from product
  const body={
    id : product.id,
    title :product.title,
    image : product.image,
    price : product.price,
    quantity :product.quantity
  }
  // api
  return this.http.post(`${this.BASE_URL}/cart/add-product`,body)
}


// cart/all-products
getCart(){
// api
return this.http.get(`${this.BASE_URL}/cart/all-products`)
}

// cartCount
cartCount(){
  this.getCart().subscribe(
    (result:any)=>{
      this.cartItemCount.next(result.length)
    }
  )
}



  // cart/remove-item
  removecartitem(id:any){
    // api
    return this.http.delete(`${this.BASE_URL}/cart/remove-item/${id}`)
  }

  // cart/remove-all-items
  emptycart(){
    // api
    return this.http.delete(`${this.BASE_URL}/cart/remove-all-items`)
  }
  
  // localhost:3000/cart/increment-item/5
  incCartItem(id:any){
    // api
    return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`)

  }

  // localhost:3000/cart/decrement-item/20
  decCartItem(id:any){
    // api
    return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)
  }

}


