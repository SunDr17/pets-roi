import { lazy, Suspense } from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import Spinner from '@/components/common/Spinner';

const Home = lazy(() => import('@/components/pages/Home'));
const Shop = lazy(() => import('@/components/pages/Shop'));
const ShopItem = lazy(() => import('@/components/pages/ShopItem'));
const ReferralProgram = lazy(() => import('@/components/pages/ReferralProgram'));
const Tokenomics = lazy(() => import('@/components/pages/Tokenomics'));
const NotFound = lazy(() => import('@/components/pages/NotFound'));

export default function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <ReactRoutes>
        <Route index element={<Home />}/>
        <Route path="shop" element={<Shop />} />
        <Route path="shop/item/:id" element={<ShopItem />} />
        <Route path="ref-program" element={<ReferralProgram />}/>
        <Route path="tokenomics" element={<Tokenomics />}/>
        <Route path="*" element={<NotFound />} />
      </ReactRoutes>
    </Suspense>
  );
}
