import React, { useState } from 'react';

// antd
import { Avatar, Card } from 'antd';

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
import { Link } from 'react-router-dom';

const { Meta } = Card;

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

  return (
    <InnerContainer>
      <div>
        <div>
          <NavButton type={FirstButton} onClick={() => onClickNavButton(1)}>
            추천 강의실
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
        <div>회원 정보가 들어갈 공간입니다.</div>
        <LoginModal buttonType="primary" />
      </AsideBox>
    </InnerContainer>
  );
}

export default Inner;
