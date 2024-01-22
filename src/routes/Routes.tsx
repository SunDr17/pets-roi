import { lazy, Suspense } from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import Spinner from '@/components/common/Spinner';

const Home = lazy(() => import('@/components/pages/Home'));
const Shop = lazy(() => import('@/components/pages/Shop'));
const ReferalProgram = lazy(() => import('@/components/pages/ReferalProgram'));
const NotFound = lazy(() => import('@/components/pages/NotFound'));
const ShopItem = lazy(() => import('@/components/pages/ShopItem'));

export default function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <ReactRoutes>
        <Route index element={<Home />}/>
        <Route path="shop" element={<Shop />} />
        <Route path="shop/item/:id" element={<ShopItem />} />
        <Route path="ref_program" element={<ReferalProgram />}/>
        <Route path="*" element={<NotFound />} />
      </ReactRoutes>
    </Suspense>
  );
}
