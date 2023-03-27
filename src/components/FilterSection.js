import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useFilterContext } from '../context/filter_context';
import {FormatPrice} from "../Helpers/FormatPrice";
import { Button } from '../styles/Button';



const FilterSection = () => {
  const { 
    filters:{text,category,color,price,maxPrice,minPrice},
    updateFilterValue,
    all_products,
    clearFilters
  } = useFilterContext();

  //TO GET THE UNIQUE DATA OF EACH FEILD
  const getUniqueData = (data,property) =>{
      let newVal=data.map((curElem)=>{
        return curElem[property];//property passed as index value becz in api object it represents as value or index there
      }); 

      if(property==="colors")
      {
        return ["all",...new Set([].concat(...newVal))]; //it is concatenting and giving unique(removing duplicate values) values of colors ,as colors in api is array of arrays or sub-arrays 

        //2nd method
        //newVal=newVal.flat();---------The flat() method cretes a new array with all sub-arrays concatenated into it recursively up to the specified path
      }
      else
      {
      return (newVal = ["all",...new Set(newVal)]);//...new Set() this Set() data strucure will only give unique values instead of repeating them,also "All" is passed here as array's first data and rest of other elements or data are spread using spread operator//
      console.log(newVal);
      }
  };

  //WE NEED UNIQUE DATA,
  const categoryData = getUniqueData(all_products,"category");//these arguements are passed as parameters up(i.e data and property) and getting unique data in categoryOnlyData .
  const compan̥yData = getUniqueData(all_products,"company");
  // console.log("🚀 ~ file: FilterSection.js:25 ~ FilterSection ~ compan̥yData:", compan̥yData)
  const colorsData = getUniqueData(all_products,"colors");
  // console.log("🚀 ~ file: FilterSection.js:25 ~ FilterSection ~ compan̥yData:", colorsData);
  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(event) => { event.preventDefault()}}>
          <input
            type="text"
            name="text" //name feild is very important #note it
            placeholder="search"
            value={text}
            // text is state variable here
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
        {categoryData.map((curElem,index)=>{//jsx bracket mein likhte hain {}
          return (
            <button 
                  key={index}
                  type="button"
                  name='category'
                  value={curElem}
                  onClick={updateFilterValue}>
                  {curElem}
                  </button>
                  );
        })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        <form action='#'>
          
              <select
                name="company"
                id='company'
                className='filter-company--select'
                onClick={updateFilterValue}>
              {compan̥yData.map((curElem,index)=>{
                  return(
                    <option
                      key={index}
                      name="company"
                      value={curElem}>{curElem}</option>
                        );
              })} 
              </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-colors-style">
          {colorsData.map((curColor,index)=>{
            if(curColor==="all")
            {
              return(
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                //style={{backgroundColor:curColor}}
                className='color-all--style'
                onClick={updateFilterValue}
              >all</button>);
            }
            return(
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{backgroundColor:curColor}}
                className={color === curColor ? "btnStyle active" : 'btnStyle'}//css will work when a color is clicked
                onClick={updateFilterValue}
              >{color === curColor ? <FaCheck className='checkStyle'/> : null}</button>);//condition for show curColor if there is color otherwise nothing
              })}
        </div>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p>
        <FormatPrice price={price}/>
        </p>
        <input 
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice} 
          value={price}
          onChange={updateFilterValue}
          />
      </div>
      <div className="filter-clear">
        <Button className='btn' onClick={clearFilters}>clear filters</Button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection;
