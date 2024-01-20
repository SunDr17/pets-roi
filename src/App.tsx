import React from 'react';

import Header from './components/common/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="row">
        <div className="col-md-4">
          <h2>
            Heading
          </h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <a className="btn" href="#">View details »</a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>
            Heading
          </h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <a className="btn" href="#">View details »</a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>
            Heading
          </h2>
          <p>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
          </p>
          <p>
            <a className="btn" href="#">View details »</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
