import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import Home from '@/components/pages/Home';
import Shop from '@/components/pages/Shop';
import ReferalProgram from '@/components/pages/ReferalProgram';
import NotFound from '@/components/pages/NotFound';
import FullCard from '@/components/pages/FullCard';

export default function Routes() {
  return (
    <ReactRoutes>
      <Route index element={<Home />}/>
      <Route path="shop" element={<Shop />} />
      <Route path="shop/item/:id/edit" element={<FullCard />} />
      <Route path="ref_program" element={<ReferalProgram />}/>
      <Route path="*" element={<NotFound />} />
    </ReactRoutes>
  );
}
