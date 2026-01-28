import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
  <div className ="hero container">
    <div className='banner'>
      <h1>{title}</h1>
      <p>At CuraLink, We are dedicated to providing top-notch healthcare services with a patient-centric approach. Our state-of-the-art facilities and advanced medical technologies ensure that you receive the best care possible. Our team of highly skilled doctors, nurses, and healthcare professionals are committed to delivering compassionate and personalized care to each patient.

  </p>
    </div>
      <div className='banner'>
        <img src={imageUrl} alt='Hero' className='animated-image'/>
        <span>
          <img src='/Vector.png' alt='vector'/>
        </span>
      </div>
    </div>
  );
};

export default Hero