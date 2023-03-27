const cartReducer=(state,action) => {
    if(action.type === "ADD_TO_CART")
    {
        let{id,amount,color,product}=action.payload;
        console.log("🚀 ~ file: cartReducer.js:6 ~ reducer ~ prod̥uct", product);
        
        //tackling the existing product
         let existing̥Product = state.cart.find(
            (curElem)=> curElem.id === id+color
            );//it checks which product is existing and repeating in the cart and gives its value
         if(existing̥Product)
         {
            let updatedProduct = state.cart.map((curElem)=>{
                if(curElem.id===id+color)
                {
                    let newAmount = curElem.amount + amount;//this is quantity not amount this quantity is messed up as amount everywhere
                    return {
                        ...curElem,//bec it having whole cart
                        amount:newAmount,
                    };
                }
                else{
                    return curElem;
                }

            });
            return {
                    ...state,
                    cart:updatedProduct,
                };
         }
         else{
         let cartProduct ={
            id:id+color,
            name:product.name,
            color,
            amount,
            image:product.image[0],
            price:product.price,
            max: product.stock,

        }
        return {
            ...state,
            cart:[...state.cart,cartProduct],//by doing cart:..state.cart it does not afffect previous state
        };
    }
    }

    // to set the increment and decrement
    if(action.type === "SET_DECREMENT")
    {
        let updatedProduct = state.cart.map((curElem)=>{
            if(curElem.id===action.payload)
            {
                let decAmount = curElem.amount - 1 ;
                if(decAmount<=1)
                {
                    decAmount=1;
                }
                return{
                    ...curElem,
                    amount:decAmount,
                };
            }
            else
            {
                return curElem;
            }
        });
        return{
            ...state,
            cart:updatedProduct,
        };
    }
    if(action.type === "SET_INCREMENT")
    {
        let updatedProduct = state.cart.map((curElem)=>{
            if(curElem.id===action.payload)
            {
                let incAmount = curElem.amount + 1 ;
                if(incAmount>=curElem.max)
                {
                    incAmount=curElem.max;
                }
                return{
                    ...curElem,
                    amount:incAmount,
                };
            }
            else
            {
                return curElem;
            }
        });
        return{
            ...state,
            cart:updatedProduct,
        };
    }
    
    //to remove a item in the cart
    if(action.type === "REMOVE_ITEM")
    {
        let updatedCart = state.cart.filter((curElem)=>{return curElem.id !== action.payload});//the data we clicked to remove,except that data we clicked add all data in new state variable updatedCart by this filter method
        return {
            ...state,
            cart:updatedCart,
        };
    }
    //to empty or claer the cart
    if(action.type === "CLEAR_CART")
    {
        return{
            ...state,
            cart:[],
        }
    }

// if (action.type === "CART_TOTAL_ITEM") 
//   {
//     let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
//       let { amount } = curElem;

//       initialVal = initialVal + amount;
//       return initialVal;
//     }, 0);

//     return {
//       ...state,
//       total_item: updatedItemVal,
//     };
//   }

//   if (action.type === "CART_TOTAL_PRICE") 
//   {
//     let total_price = state.cart.reduce((initialVal, curElem) => {
//       let {price,amount}= curElem;

//       initialVal = initialVal + price*amount;
//       return initialVal;
//     }, 0);

//     return {
//       ...state,
//       total_price:total_price,
//     };
//   }
  
  if(action.type === "CART_ITEM_PRICE_TOTAL")
  {
    let {total_item,total_price} = state.cart.reduce((accum, curElem) => {
        let {price,amount } = curElem; 

        accum.total_item += amount;
        accum.total_price += price * amount;// getting it bec its an object now

        return accum;
    },
    {
        total_item : 0,
        total_price : 0,//two intial values 
    }
    );
    return {
        ...state,
        total_item,
        total_price,
    };
  }


    return state;
};
export default cartReducer;