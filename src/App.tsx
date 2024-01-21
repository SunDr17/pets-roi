import React from 'react';

import Header from '@/components/common/Header';
import Routes from '@/routes/Routes';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main p-4">
        <Routes />
      </div>
    </div>
  );
}

export default App;
