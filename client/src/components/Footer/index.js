import React from 'react';

// style
import {
  BeforeSpan,
  FooterBody,
  FooterBottom,
  FooterContainer,
  FooterWrap,
} from './style';

function Footer() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterBody>
          <div>
            <div>Creator</div>
            <div>
              <span>Creator1</span>
              <BeforeSpan>Creator2</BeforeSpan>
              <BeforeSpan>Creator3</BeforeSpan>
              <BeforeSpan>Creator4</BeforeSpan>
            </div>
          </div>
          <div>
            <div>Partner</div>
            <div>
              <span>Partner1</span>
              <BeforeSpan>Partner2</BeforeSpan>
              <BeforeSpan>Partner3</BeforeSpan>
              <BeforeSpan>Partner4</BeforeSpan>
            </div>
          </div>
          <div>
            <div>Developer</div>
            <div>
              <span>Developer1</span>
              <BeforeSpan>Developer2</BeforeSpan>
              <BeforeSpan>Developer3</BeforeSpan>
              <BeforeSpan>Developer4</BeforeSpan>
            </div>
          </div>
        </FooterBody>
        <FooterBottom>
          Copyright &copy; Logo Since 2021. All rights reserved.
        </FooterBottom>
      </FooterWrap>
    </FooterContainer>
  );
}

export default Footer;
