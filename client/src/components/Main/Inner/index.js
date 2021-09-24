import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// antd
import { Card, Divider, List } from 'antd';

// style
import {
  InnerContainer,
  NavButton,
  CardContainer,
  CardContent,
  AsideBox,
} from './style';

// component
import LoginModal from 'components/LoginModal/LoginModal';

const { Meta } = Card;

const data = [
  '1st Side Project',
  '2nd Side Project',
  '3rd Side Project',
  '4th Side Project',
  '5th Side Project',
];

function Inner() {
  const [FirstButton, setFirstButton] = useState('primary');
  const [SecondButton, setSecondButton] = useState('default');
  const [ThirdButton, setThirdButton] = useState('default');

  const onClickNavButton = (number) => {
    if (number === 1) {
      setFirstButton('primary');
      setSecondButton('default');
      setThirdButton('default');
    } else if (number === 2) {
      setFirstButton('default');
      setSecondButton('primary');
      setThirdButton('default');
    } else if (number === 3) {
      setFirstButton('default');
      setSecondButton('default');
      setThirdButton('primary');
    }
  };

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <InnerContainer>
      <div>
        <div>
          <NavButton type={FirstButton} onClick={() => onClickNavButton(1)}>
            BEST
          </NavButton>
          <NavButton type={SecondButton} onClick={() => onClickNavButton(2)}>
            DUMMY
          </NavButton>
          <NavButton type={ThirdButton} onClick={() => onClickNavButton(3)}>
            DUMMY
          </NavButton>
        </div>
        <CardContainer>
          <Link to="/place/1">
            <CardContent
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta title="Card title" description="This is the description" />
            </CardContent>
          </Link>

          <Link to="/place/1">
            <CardContent
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta title="Card title" description="This is the description" />
            </CardContent>
          </Link>
          <Link to="/place/1">
            <CardContent
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Meta title="Card title" description="This is the description" />
            </CardContent>
          </Link>
        </CardContainer>
      </div>

      <AsideBox>
        {isAuthenticated ? (
          <div style={{ paddingLeft: '32px' }}>
            <Divider orientation="center" style={{ marginTop: '0' }}>
              My Side Projects
            </Divider>
            <List
              size="small"
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </div>
        ) : (
          <div style={{ paddingTop: '133px' }}>
            <div>로그인이 필요합니다.</div>
            <LoginModal buttonType="primary" />
          </div>
        )}
      </AsideBox>
    </InnerContainer>
  );
}

export default Inner;
