import React from 'react';

import './Main.scss';
import './Main-media.scss';

const Main = (props) => {
  return (
    <div className="main">
      <div className="container">

        <div className="main__content">
          <div className="main__block">
            <h3 className="main__block-title">Explore</h3>
            <h3 className="main__block-title">Learn</h3>
            <h3 className="main__block-title">Cook</h3>
            <h3 className="main__block-title">Enjoy</h3>
          </div>
          <div className="main__block">
            <p className="main__block-parag">Create your own recipes and show it to the world.</p>
            <p className="main__block-parag">Hundreds of amazing recipes are posted every single day.</p>
            <p className="main__block-parag">Great Comminity and terrific cooking experience.</p>
          </div>
        </div>
      
      </div>
    </div>
  );
}


export default Main;
