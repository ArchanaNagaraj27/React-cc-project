import React from 'react'
import Hero from '../Hero/Hero'
import Services from '../Services/Services'
import Banner from '../Banner/Banner'
import AppStore from '../AppStore/AppStore'
import Books from '../BooksSlider/Books'
import Testimonial from '../Testimonial/Testimonial'
import OrderPopup from "../OrderPopup/OrderPopup";

export const Homes = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);

    const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <>
    <Hero handleOrderPopup={handleOrderPopup} />
      <Services handleOrderPopup={handleOrderPopup} />
      <Banner />
      {/* <CoverBanner /> */}
      <AppStore />
      {/* <PdfReader /> */}
      <Books />
      <Testimonial />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </>
  )
}

export default Homes