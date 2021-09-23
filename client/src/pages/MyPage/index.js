import React from 'react';
import { Helmet } from 'react-helmet';
import { MyPageContainer, Wrap } from './style';

function MyPage() {
  return (
    <MyPageContainer>
      <Helmet>
        <title>My Page</title>
      </Helmet>
      <Wrap></Wrap>
    </MyPageContainer>
  );
}

export default MyPage;
