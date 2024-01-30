import React, { useEffect, useState } from 'react';

import useOnAppLoad from '@/hooks/useOnAppLoad';
import Spinner from '@/components/common/Spinner';
import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Routes from '@/routes/Routes';
import Footer from '@/components/common/Footer';

function App() {
  const onAppLoad = useOnAppLoad();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAppLoad().then(() => setLoading(false));
  }, []);

  return loading ? <Spinner /> : (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <div className="main p-4">
        <Routes />
      </div>
      <Footer />
      <Modal />
    </div>
  );
}

export default App;
