import React,{ createContext ,useContext,useReducer,useEffect }  from 'react';
import { useProductContext } from './productcontext';
import filterReducer from '../reducer/filterReducer';


const FilterContext = createContext();
//error in this page
const intialState = {
  filter_products:[],
  all_products:[],
  grid_view:true,
  sorting_value:"lowest",
  filters:{
    text:"",
    category:"all",
    company:"all",
    color:"all",
    maxPrice:0,
    price:0,
    minPrice:0,
  },
};
const FilterContextProvider = ({children}) => {
  const {products} = useProductContext();

  const[state,dispatch]=useReducer(filterReducer,intialState);
  // to set the grid view
  const setGridView=()=>{
    return dispatch({type:"SET_GRID_VIEW"});
  };

  const setListView=()=>{
    return dispatch({type:"SET_LIST_VIEW"});
  };

  const sorting=(event)=>
  {
    const userValue=event.target.value;
    return dispatch({type:"GET_SORT_VALUE",payload:userValue});
  }
  // using as global object or function for search and other filters
  const updateFilterValue=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    
    return dispatch({type:"UPDATE_FILTERS_VALUE",payload:{name,value}})
  };

  //to clear the filters
  const clearFilters =()=>{
    return dispatch({type: "CLEAR_FILTERS"});
  }

  //to sort the values
  useEffect(()=>{ 
    dispatch({type : "FILTER_PRODUCTS"});
    dispatch({type : "SORTING_PRODUCTS"});},[products,state.sorting_value,state.filters])
    // dispatch({type : "SORTING_PRODUCTS",payload : products});},[state.sorting_value])
  useEffect(()=>{
    dispatch({type : "LOAD_FILTER_PRODUCTS",payload : products});
  },[products]);

  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      sorting,
      updateFilterValue,
      clearFilters
      }}>
      {children}
    </FilterContext.Provider>
  );
};
 const useFilterContext=()=>{
  return useContext(FilterContext);
}
export {FilterContext,FilterContextProvider,useFilterContext};