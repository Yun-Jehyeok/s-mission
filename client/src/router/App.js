import React from 'react';
import { Switch, Route } from 'react-router-dom';

// antd
import { Layout } from 'antd';

// pages
import Main from 'pages/Main/index';
import SignUp from 'pages/SignUp/index';
import ProjectDetail from 'pages/ProjectDetail';
import MyPage from 'pages/MyPage';
import ProjectList from 'pages/ProjectList';
import ProjectWrite from 'pages/ProjectWrite';
import ProjectEdit from 'pages/ProjectEdit';
import ProjectManager from 'pages/ProjectManager';

// components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer/index';
import FindPassword from 'pages/FindPassword';

function App() {
  let Navigation =
    window.location.pathname === '/user/signup' ? (
      ''
    ) : window.location.pathname === '/user/password' ? (
      ''
    ) : (
      <Navbar />
    );
  let FooterContainer =
    window.location.pathname === '/user/signup' ? (
      ''
    ) : window.location.pathname === '/user/project/1' ? (
      ''
    ) : window.location.pathname === '/user/password' ? (
      ''
    ) : (
      <Footer />
    );

  return (
    <Layout style={{ width: '100%', minWidth: '1400px' }}>
      {Navigation}
      <Switch>
        <Route path="/" exact component={Main} />

        <Route path="/user/signup" exact component={SignUp} />
        <Route path="/user/password" exact component={FindPassword} />
        <Route path="/user/mypage/:id" exact component={MyPage} />
        <Route path="/user/project/:id" exact component={ProjectManager} />

        <Route path="/project" exact component={ProjectList} />
        <Route path="/project/write" exact component={ProjectWrite} />

        <Route path="/project/detail/:id" exact component={ProjectDetail} />
        <Route path="/project/edit/:id" exact component={ProjectEdit} />
      </Switch>
      {FooterContainer}
    </Layout>
  );
}

export default App;
