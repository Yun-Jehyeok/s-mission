import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeAccountAction } from 'redux/actions/user_actions';

function CloseAccount() {
  const [isSuccessToCloseAccount, setIsSuccessToCloseAccount] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onCloseAccount = () => {
    dispatch(closeAccountAction(userId));
  };

  return (
    <div>
      {isSuccessToCloseAccount ? (
        <div>
          <div>회원 탈퇴가 되었습니다.</div>
          <Link to="/">
            <Button type="primary">Home</Button>
          </Link>
        </div>
      ) : (
        <Button onClick={onCloseAccount} type="danger">
          회원 탈퇴하기
        </Button>
      )}
    </div>
  );
}

export default CloseAccount;
