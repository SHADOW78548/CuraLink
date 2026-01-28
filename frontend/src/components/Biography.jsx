import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
      <img src={imageUrl} alt='aboutImg'/>

      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>At CuraLink, we are a dedicated team of innovators and healthcare professionals committed to revolutionizing the way healthcare is managed and delivered. Our mission is to create seamless, efficient, and accessible healthcare solutions that connect patients, doctors, and medical facilities in a unified, user-friendly platform.</p>
        <p>Born out of a deep understanding of the challenges faced by both healthcare providers and patients, CuraLink is designed to streamline every aspect of hospital management. From patient records to appointment scheduling, billing, and beyond, we aim to simplify and enhance the entire healthcare experience.</p>
        <p>Our team combines expertise in cutting-edge technology with a passion for improving healthcare outcomes. We believe that by leveraging the power of digital tools, we can empower medical professionals to focus on what they do best—caring for patients—while providing patients with the convenience and peace of mind they deserve.</p>
        <p>At CuraLink, we are not just building software; we are building the future of healthcare. Join us in our journey to connect care and empower health.</p>
      </div>
    </div>
  )
}

export default Biography