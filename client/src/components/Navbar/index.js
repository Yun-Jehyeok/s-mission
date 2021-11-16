import React from 'react';
import LogoImg from './logo.png';
import { useSelector } from 'react-redux';

// antd
import { Button } from 'antd';

// style
import { Logo, MenuContainer, NavbarContainer, Wrap } from './style';

// component
import LoginModal from 'components/LoginModal/LoginModal';
import SearchInput from 'components/SearchInput';
import { Link } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated, userId } = useSelector((state) => state.auth);

  return (
    <NavbarContainer>
      <Wrap>
        <Logo href="/">
          <img
            src={LogoImg}
            style={{ width: '64px', height: '64px' }}
            alt="logo"
          />
        </Logo>
        <MenuContainer>
          <div>
            <Link to="/project/category/web">WEB</Link>
          </div>
          <div>
            <Link to="/project/category/app">APP</Link>
          </div>
          <div>
            <Link to="/project/category/ai">AI</Link>
          </div>
          <div>
            <Link to="/project/category/design">DESIGN</Link>
          </div>
        </MenuContainer>
        <SearchInput />
        <LoginModal buttonType="default" />
        {isAuthenticated ? (
          <a href={`/user/mypage/${userId}`}>
            <Button type="primary">My Page</Button>
          </a>
        ) : (
          <a href="/user/signup">
            <Button type="primary">Sign Up</Button>
          </a>
        )}
      </Wrap>
    </NavbarContainer>
  );
}

export default Navbar;
