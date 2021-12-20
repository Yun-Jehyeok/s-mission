import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// antd
import { Button, Card, Divider } from 'antd';

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
import { topRatedProjectsAction } from 'redux/actions/project_actions';

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

  const { isAuthenticated, userName } = useSelector((state) => state.auth);
  const { topRated } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(topRatedProjectsAction());
  }, [dispatch]);

  return (
    <InnerContainer>
      <div>
        <div>
          <NavButton type={FirstButton} onClick={() => onClickNavButton(1)}>
            BEST
          </NavButton>
        </div>
        <CardContainer>
          {Array.isArray(topRated)
            ? topRated.map((project) => {
                let content = project.contents.replace(
                  /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                  '',
                );

                return (
                  <Link to={`/project/detail/${project._id}`}>
                    <CardContent
                      cover={
                        // 이미지 링크는 나중에 S3로 옮기고 나서 해야될듯... 로컬에 파일이 없으니 사진이 안뜨니까
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                    >
                      <Meta
                        title={project.title}
                        description={
                          content.length >= 30
                            ? content.slice(0, 30) + '...'
                            : content
                        }
                      />
                    </CardContent>
                  </Link>
                );
              })
            : ''}
        </CardContainer>
      </div>

      <AsideBox>
        {isAuthenticated ? (
          <div style={{ paddingLeft: '32px' }}>
            <Divider orientation="center" style={{ marginTop: '0' }}>
              User Info
            </Divider>
            <img
              src="https://placeimg.com/150/150/person"
              style={{ borderRadius: '70%', marginBottom: '14px' }}
              alt="selfImage"
            />
            <h3 style={{ fontWeight: 'bolder' }}>{userName}</h3>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry ...
            </div>
            <Link to="/project/write">
              <Button type="primary" style={{ width: '100%' }}>
                글쓰기
              </Button>
            </Link>
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
