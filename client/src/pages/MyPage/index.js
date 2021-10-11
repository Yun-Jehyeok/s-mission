import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// style
import { MyPageContainer, Wrap } from './style';

function MyPage() {
  const { userId } = useSelector((state) => state.auth);

  return (
    <MyPageContainer>
      <Wrap>
        <Link to={`/user/closeaccount/${userId}`}>회원 탈퇴하기</Link>
      </Wrap>
    </MyPageContainer>
  );
}

export default MyPage;
