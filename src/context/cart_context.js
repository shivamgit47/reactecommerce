import { createContext,useContext,useReducer,useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData=()=>{
    let localCartData = localStorage.getItem("shivamCart");//to get what data we added in localstorage
    // if(localCartData === [])//if no data return nothing else passing data saved from localstorage
    // {
    //     return [];
    // }
    // else {
    //     return JSON.parse(localCartData);//as data was stored as string but in intitalstate it need to passed as an array
    // }


const parsedData =JSON.parse(localCartData);//checking for only array hi chaiye ,as it was showing error in some cases
if(!Array.isArray(parsedData)) return [];
return parsedData;
};
const initialState={
    //cart:[],
    cart:getLocalCartData(),
    total_item:"",//for quantity/amount
    total_price:"",
    shipping_fee:50000,
};


const CartProvider = ({children})=>{
    console.log("bacche man ke sacche",children);

    const [state, dispatch] = useReducer(reducer,initialState);

    const addToCart = (id,color,amount,product)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}});
        console.log("product dere baba",product);
    };

    // increment and decrement the product

    const setDecrement = (id)=>{
        dispatch({type:"SET_DECREMENT",payload:id})
    }
    
    const setIncrement = (id)=>{
        dispatch({type:"SET_INCREMENT",payload:id})
    }

    //to remove individual item from the cart
    const removeItem =(id)=>{
        dispatch({ type:"REMOVE_ITEM", payload: id })
    };

    //to clear the cart
    const clearCart=()=>{
        dispatch({type:"CLEAR_CART"})
    }

    //to add the data in the localstorage
    useEffect(() => {
        // dispatch({type:"CART_TOTAL_ITEM"});//dispatch for total quantity
        // dispatch({type:"CART_TOTAL_PRICE"});//dispatch for total price
        dispatch({type:"CART_ITEM_PRICE_TOTAL"});
        
        localStorage.setItem("shivamCart",JSON.stringify(state.cart));//converting array to string as localstroage always accept data as string
    }, [state.cart]);

    return (
        <CartContext.Provider value={{
            ...state,
            addToCart,
            removeItem,
            clearCart,
            setDecrement,
            setIncrement,
            }}>
            {children}
        </CartContext.Provider>)
};

const useCartContext = () =>{
    return useContext(CartContext);
}
export {CartContext,CartProvider,useCartContext};
