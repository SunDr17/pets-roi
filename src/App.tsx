import React from 'react';

import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Routes from '@/routes/Routes';
import Footer from '@/components/common/Footer';

function App() {
  return (
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
