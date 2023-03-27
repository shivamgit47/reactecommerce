
const filterReducer = (state,action) => {
    switch(action.type)
    {   
        case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price); //gives all prices in an array
      console.log("🚀 ~ file: filterReducer.js ~ line 5 ~ filterReducer ~ priceArr",priceArr);

      // 1way
      // console.log(Math.max.apply(null, priceArr));----Apply accepts an array and it implies the array as parameters to the actual function ,So apply is a conveneint way to pass and array of data as parameters to a function

      //2nd way
      // let maxPrice = priceArr.reduce(
      //   (initialVal, curVal) => Math.max(initialVal, curVal),
      //   0
      // );0 after comma is intial value
      // console.log(
      //   "🚀 ~ file: filterReducer.js ~ line 16 ~ filterReducer ~ maxPrice",
      //   maxPrice
      // );

      //3rd way
      let maxPrice = Math.max(...priceArr);//math max function to find maximum price in priceArr
      console.log("🚀~ file: filterReducer.js ~ line 23 ~ filterReducer ~ maxPrice",maxPrice);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },//when key and value pair are same then we dont need to write it
      };

        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view:true,
                
            }
            
        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view:false,
            }
        case "GET_SORT_VALUE":
            // let userSortValue = document.getElementById("sort");
            // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;

            // instead of getting by id or whatever we directly accesing the sorting value by event object provided into sorting value as payload
            return{
                ...state,
                sorting_value: action.payload,
            }
        case "SORTING_PRODUCTS":
            let newSortData;
            // let tempSortProduct=[...action.payload];
            const{filter_products,sorting_value}=state;
            let tempSortProduct=[...filter_products];
            const sortingProducts = (a,b)=>
            {
                if(sorting_value==="a-z") 
                {
                    return a.name.localeCompare(b.name);
                }
                
                if(sorting_value==="z-a") 
                {
                    return b.name.localeCompare(a.name);
                }
                
                if(sorting_value==="lowest") 
                {
                    return a.price-b.price;
                }
                
                if(sorting_value==="highest") 
                {
                    return b.price-a.price;
                }
            }

            // if(sorting_value==="a-z")
            // {
            //     newSortData=tempSortProduct.sort((a,b)=>
            //         a.name.localeCompare(b.name)
            //     );
                
            // }
            // if (sorting_value === "z-a") {
            //     newSortData=tempSortProduct.sort((a,b)=>
            //      b.name.localeCompare(a.name));
            //   }

            // if (sorting_value === "lowest") {
            //     const sortingProducts = (a,b)=>{
            //         return a.price-b.price;
            //     };
            //     newSortData = tempSortProduct.sort(sortingProducts);
            //   }

            //   if (sorting_value === "highest") {
            //     const sortingProducts = (a,b)=>{
            //         return b.price-a
            //         .price;
            //     };
            //     newSortData = tempSortProduct.sort(sortingProducts);
            //   }
            newSortData = tempSortProduct.sort(sortingProducts);        
        
        return {
            ...state,  
            filter_products:newSortData,
        };
      
      case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
    
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

      case "FILTER_PRODUCTS":
        let {all_products}=state;
        let tempFilterProduct =[...all_products];
        const {text,category,company,color,price}=state.filters;
        console.log(color);
        
        if(text)
        {
            tempFilterProduct=tempFilterProduct.filter((curElem)=>{
                return curElem.name.toLowerCase().includes(text);
                //includes() method searches for  which includes those letters being searched,here name is checked with text entered by user
                
            });
        }
        if(category!=="all")
        {
            tempFilterProduct=tempFilterProduct.filter((curElem)=>{
                return curElem.category === category;//checking the category(mobile,latop etc.) selected by user to category present in api(the condtion is ex: category === mobile then filtering out values)
            });
        }
        if(company!=="all")
        {
            tempFilterProduct=tempFilterProduct.filter((curElem)=>{
                return curElem.company.toLowerCase() === company.toLowerCase();
            });
        }
        if(color!=="all")
        {
            tempFilterProduct=tempFilterProduct.filter((curElem)=>{
                return curElem.colors.includes(color);//includes() method checks or search for does it have "colours ex:#0000" inside colors array in api and checks in conditon with color clicked  by user
            });
        }
        if(price===0)
        {
            tempFilterProduct=tempFilterProduct.filter((curElem)=>{
                return curElem.price == price;//condition to show products if product have zero price
        })}
        else
        {
            tempFilterProduct=tempFilterProduct.filter((curElem)=>{
                return curElem.price <= price;
            });
        }
      
        return{
            ...state,
            filter_products:tempFilterProduct,
        }


        case "CLEAR_FILTERS":
        return{
            ...state,
            filters:{
                text:"",
                category:"all",
                company:"all",
                color:"all",
                maxPrice:state.filters.maxPrice,
                price:state.filters.maxPrice,
                minPrice:0,
              },
        }

        default:
            return state;
            
    }
}

export default filterReducer;




