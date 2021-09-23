import React from 'react';
import { Helmet } from 'react-helmet';

// style
import { Background } from './style';

// component
import Inner from 'components/Main/Inner';
import PlaceContainer from 'components/Main/PlaceContainer';

function Main() {
  return (
    <div>
      <Helmet>
        <title>Main</title>
      </Helmet>
      <Background />
      <Inner />
      <PlaceContainer />
    </div>
  );
}

export default Main;
