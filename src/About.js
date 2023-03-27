import React from 'react';
import HeroSection from './components/HeroSection';
import {AppContext, useProductContext} from "./context/productcontext";
const About = () => {
  const {myName} = useProductContext(AppContext);
  
  return (
    <>
    {myName}
    <HeroSection
    name = "Shivam Ecommerce"/>
    </>
  )
};

export default About;
