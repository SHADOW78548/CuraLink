import React from 'react'
import Hero from "../components/Hero";
import Departments from "../components/Departments";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";


const Home = () => {
  return (
  <>
  <Hero title={"Welcome to CuraLink, A Multi-Speciality E-Hospital | Revolutionizing Hospital Management with Seamless Digital Solutions | Your Health, Our Priority "} imageUrl={"/hero.png"}/>
  <Biography imageUrl={"/about.png"}/>
  <Departments/>
  <MessageForm/>
  
  </>
  );
};

export default Home