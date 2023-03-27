
// const ProductReducer = (state,action) => {
//     if(action==="SET_LOADING")
//     {
//         return{
//             ...state,
//             isloading:true
//         }
//     }
//     if(action==="SET_API_DATA")
//     {
//         return{
//             ...state,
//             isloading:false,
//             isError:false
//         }
//     }
//     if(action==="API_ERROR")
//     {
//         return{
//             ...state,
//             isloading:false,
//             isError:true
//         }
//     }
//   return state;
// };
const ProductReducer = (state,action) => {
switch (action.type)
 {
    case "SET_LOADING":
        return{
            ...state,
            isloading:true
        };
    case "SET_API_DATA":
        const featureData=action.payload.filter((curElem)=>{
            return curElem.featured===true;
        });
        return {
            ...state,
            isloading:false,
            products:action.payload,
            featureProducts:featureData,
        };
    case "API_ERROR":
        return{
            ...state,
            isloading:false,
            isError:true
        };
    case "SET_SINGLE_LOADING":
        return{
            ...state,
            isSingleLoading:true
        };
    case "SET_SINGLE_PRODUCT":
        return{
            ...state,
            singleProduct:action.payload,
            isSingleLoading:false,
        }
    case "SET_SINGLE_ERROR":
        return{
            ...state,
            isSingleLoading:false,
            isError:true
        }
       

    default:
        return state;
}
};
export default ProductReducer
