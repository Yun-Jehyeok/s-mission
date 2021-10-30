import React from 'react';

// style
import {
  BeforeSpan,
  FooterBody,
  FooterBottom,
  FooterContainer,
  FooterWrap,
} from './style';

const userList = (
  <div>
    <span>
      <a href="http://github.com/Yun-Jehyeok" target="_blank" rel="noreferrer">
        윤제혁
      </a>
    </span>
    <BeforeSpan>
      <a href="https://github.com/han-dae" target="_blank" rel="noreferrer">
        한대찬
      </a>
    </BeforeSpan>
    <BeforeSpan>
      <a href="https://github.com/Seulg2027" target="_blank" rel="noreferrer">
        이슬기
      </a>
    </BeforeSpan>
  </div>
);
function Footer() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterBody>
          <div>
            <div>Creator</div>
            {userList}
          </div>
          <div>
            <div>Partner</div>
            {userList}
          </div>
          <div>
            <div>Developer</div>
            {userList}
          </div>
        </FooterBody>
        <FooterBottom>
          Copyright &copy; S-Mission Since 2021. All rights reserved.
        </FooterBottom>
      </FooterWrap>
    </FooterContainer>
  );
}

export default Footer;
