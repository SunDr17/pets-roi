import React from 'react';

import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import Routes from '@/routes/Routes';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main p-4">
        <Routes />
      </div>
      <Modal />
    </div>
  );
}

export default App;
