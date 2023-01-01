// ------------Interface For SignUp
export interface signUp{
    name:string,
    password:string,
    email:string
    
}

// ---------------------Interface For Login
export interface login{
    email:string,
    password:string
}

// --------------------Interface For Product
export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity:number
   
  }