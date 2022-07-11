import {  $noauth, $request} from "./index";

export const getAllShops = async () => {
    const {data} = await $request.get('api/shops')
    return data
}
export const getProducts = async (shopName) => {
    const {data} = await $request.post('api/products/find', {shopName})
    return data
}


export const createOrder = async (name,email,adress,phone,orders,totalPrice) => {
    const {data} = await $request.post('api/order/create', {name,email,adress,phone,orders,totalPrice})
    return data
}

export const findOrder = async (email, phone) => {
    const {data} = await $request.post('api/order/find', {email, phone})
    return data
}

export const loginRequest = async (email, password) => {
    const {data} = await $noauth.post('api/auth/login', {email, password})
    return data
}