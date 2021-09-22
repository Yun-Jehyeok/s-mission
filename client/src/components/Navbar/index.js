import React from 'react';
import { Link } from 'react-router-dom';

// antd
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// style
import { Logo, MenuContainer, MenuBox, NavbarContainer, Wrap } from './style';

// component
import LoginModal from 'components/LoginModal/LoginModal';
import SearchInput from 'components/SearchInput';

const menu = (
  <MenuBox style={{ paddingLeft: '32px' }}>
    <Menu.Item style={{ marginTop: '32px' }}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item icon={<DownOutlined />} disabled>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    </Menu.Item>
    <Menu.Item disabled>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </MenuBox>
);

function Navbar() {
  return (
    <NavbarContainer>
      <Wrap>
        <Logo to="/">Logo Logo</Logo>
        <MenuContainer>
          <div>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                MENU <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <div>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                MENU <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <div>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                MENU <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <div>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                MENU <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </MenuContainer>
        <SearchInput />
        <LoginModal buttonType="link" />
        <a href="/user/signup">
          <Button type="primary">Sign Up</Button>
        </a>
      </Wrap>
    </NavbarContainer>
  );
}

export default Navbar;
