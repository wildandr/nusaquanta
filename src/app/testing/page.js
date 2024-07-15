import React from 'react';
import HomeHero from "@components/home/HomeHero";
import HomeInnovation from "@components/home/HomeInnovation";
import RunningText from "@elements/RunningText";
import HomeShowcase from "@components/home/HomeShowcase";
import HomeProduct from "@components/home/HomeProduct";
import RunningSymbol from "@elements/RunningSymbol";

export default function Test() {
    return (
        <div className='overflow-hidden'>
           <div className='h-screen'></div>
          
            <HomeShowcase />
        </div>
    );
}