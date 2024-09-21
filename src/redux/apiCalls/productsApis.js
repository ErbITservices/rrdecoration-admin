import { req } from "../../axiosReqMethods";
import { editProduct, addProducts } from "../Products";
import { setError } from "../MessageRedux"


export const editProductapi = async (dispatch, product, setIsOpen) => {
    try {
        const res = await req.put(`/api/products/${product._id}`, product);
        dispatch(editProduct(res?.data))
        dispatch(setError("product updated successfully"))
        setIsOpen(false)
    } catch (error) {
        dispatch(setError(error.response.data.message))
        console.log(error)
    }
}
export const addProductapi = async (dispatch, product, setIsOpen) => {
    try {
        console.log("mihir1");
        
        const res = await req.post(`/api/products`, product);
        
        console.log("mihir2");
        dispatch(addProducts(res?.data));      
        dispatch(setError("product Added successfully"))
        setIsOpen(false)
    } catch (error) {
        dispatch(setError(error.response.data.message))
        console.log(error)
    }
}

