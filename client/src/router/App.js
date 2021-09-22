import React from 'react';
import { Switch, Route } from 'react-router-dom';

// antd
import { Layout } from 'antd';

// pages
import Main from 'pages/Main/index';
import SignUp from 'pages/SignUp/index';
import PlaceDetail from 'pages/PlaceDetail';
import MyPage from 'pages/MyPage';

// components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer/index';

function App() {
  let Navigation =
    window.location.pathname === '/user/signup' ? '' : <Navbar />;
  let FooterContainer =
    window.location.pathname === '/user/signup' ? '' : <Footer />;

  return (
    <Layout style={{ width: '100vw', minWidth: '1400px' }}>
      {Navigation}
      <Switch>
        <Route path="/" exact component={Main} />

        <Route path="/user/signup" exact component={SignUp} />
        <Route path="/user/mypage/:id" exact component={MyPage} />

        <Route path="/place/:id" exact component={PlaceDetail} />
      </Switch>
      {FooterContainer}
    </Layout>
  );
}

export default App;
