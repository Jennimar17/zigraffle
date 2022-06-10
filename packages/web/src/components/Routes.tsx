import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import Auctions from './Auctions/Auctions';
import HowItWorks from './HowItWorks/HowItWorks';
import Deposit from './Deposit/Deposit';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <RouterRoutes>
        <Route path='/'>
          <Route index element={<Auctions />} />
          <Route path='how-it-works' element={<HowItWorks />} />
          <Route path='deposit' element={<Deposit />} />
        </Route>
      </RouterRoutes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
