import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import {
  ButtonContainer,
  Left,
  MyPageContainer,
  Picture,
  Right,
  Wrap,
} from './style';

const columns = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    width: '70%',
    align: 'center',
    render: (title) => (
      <div style={{ textAlign: 'start' }}>
        {title.length >= 80 ? title.slice(0, 80) + '...' : title}
      </div>
    ),
  },
  {
    title: '작성일',
    dataIndex: 'date',
    key: 'date',
    width: '20%',
    align: 'center',
  },
  {
    title: '조회수',
    dataIndex: 'view',
    key: 'view',
    width: '10%',
    align: 'center',
  },
];

const data = [
  {
    key: '1',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    view: 32,
    date: '2021.1.13',
  },
  {
    key: '2',
    title:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
    view: 42,
    date: '2021.1.13',
  },
  {
    key: '3',
    title:
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    view: 32,
    date: '2021.1.13',
  },
];

function MyPage() {
  const { userId, user } = useSelector((state) => state.auth);

  return (
    <MyPageContainer>
      <Wrap>
        <Left>
          <h2>{user.name}님의 마이페이지</h2>
          <Picture>
            <div>
              <img src="https://placeimg.com/200/200/people" />
            </div>
            <div>
              <Button type="primary">사진 수정하기</Button>
            </div>
          </Picture>
        </Left>

        <Right>
          <h2>작성한 게시글</h2>
          <Table columns={columns} dataSource={data} />
          <ButtonContainer>
            <Link to="">회원 정보 수정하기</Link>
            <Link to={`/user/closeaccount/${userId}`}>회원 탈퇴하기</Link>
          </ButtonContainer>
        </Right>
      </Wrap>
    </MyPageContainer>
  );
}

export default MyPage;
