import React from 'react';
import HeroSection from '../../Components/HeroSection/HeroSection';
import CategoriesSection from '../../Components/CategoriesSection/Categories';
import DailyBestsellers from '../../Components/DailyBestsellers/DailyBestsellers';
import SpecialDishes from '../../Components/SpecialDishes/SpecialDishes';
import DealsOfTheDay from '../../Components/DealsOfTheDay/DealsOfTheDay';
import WhyChoose from '../../Components/WhyChoose/WhyChoose';  
import Pros from '../../Components/Pros/Pros';
import PromoPosters from '../../Components/PromoPosters/PromoPosters';
import FlashSales from '../../Components/FlashSales/FlashSales'; 

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PromoPosters />
      <FlashSales />
      <CategoriesSection />
      <DailyBestsellers />
        <SpecialDishes />
        <DealsOfTheDay />
        <WhyChoose />
        <Pros/> 
    </main>
  );
}

