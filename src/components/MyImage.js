import React,{ useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
// this is npm package for image zoom
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import styled from 'styled-components'
          // defining imgs with empty url object and also setting default value to it ,[{}] because it have array pf objects
const MyImage = ({imgs = [{url:""}]}) => {

  const[mainImage,setMainImage]=useState(imgs[0])
  console.log(imgs);
  return (
    <Wrapper>
       <div className="grid grid-four-column">
        {imgs.map((curElem,index)=>{
          return(
            <figure>
              <img 
              src={curElem.url} 
              alt={curElem.filename} 
              key={index} className="box-image--style"
              onMouseEnter={()=>{setMainImage(curElem)}}/>
            </figure>
          );
        })}
        </div>
        <div className='main-screen'>
          <InnerImageZoom src={mainImage.url} zoomPreload={true} alt={mainImage.filename} key={mainImage.id}/>
        </div>  
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;
  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */
    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;
    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
// var options = {
//   width:400,
//   height : 250,
//   zoomWidth : 500,
//   offset :{vertical:0,horizontal : 10},
//   scale:1.5
// }
// new ImageZoom(document.getElementsByClassName("main-screen"),options);
export default MyImage
