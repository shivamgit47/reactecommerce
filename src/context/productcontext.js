import {useEffect } from "react";
import { createContext ,useContext,useReducer} from "react";
import axios from "axios";
import ProductReducer from "../reducer/ProductReducer";

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const initialState={
 isLoading:false,
 isError:false,
 products:[],
 featureProducts:[], 
//  all the data is passing as an array but the single data is present as object inside aray of all data
isSingleLoading:false,
singleProduct:{},
}
// the children here is the "App" component
const AppProvider =({children})=>{
    
        const[state,dispatch] = useReducer(ProductReducer,initialState);
    const getProducts =  async (url) =>{
        dispatch({type:"SET_LOADING"})
        try{
            const res =  await axios.get(url);
            const products = await res.data;
            // console.log("🚀 ~ file: productcontext.js:21 ~ getProducts ~ product", products)
            
            dispatch({type:"SET_API_DATA",payload : products});

        }
        catch(err)
        {   dispatch({type:"API_ERROR"});
            console.log(err);          
        }

    }
    useEffect(()=>{getProducts(API);},[])

    // 2nd Api for call for single product
    const getSingleProduct =  async (url) =>{
        dispatch({type:"SET_SINGLE_LOADING"});
        try{
            const res =  await axios.get(url);
            const singleProduct = await res.data;
            dispatch({type:"SET_SINGLE_PRODUCT",payload : singleProduct});
            }
        catch(err)
            {   
                console.log(err);          
                dispatch({type:"SET_SINGLE_ERROR"});
            }

    }
    return <AppContext.Provider value={{...state,getSingleProduct}}>
        {children}    {/*childrern is App component which is been provided in createcontext*/}
        </AppContext.Provider>
};

// Creating custom useContext hook
const useProductContext=()=>{
    return useContext(AppContext);
}
export {AppProvider,AppContext,useProductContext};