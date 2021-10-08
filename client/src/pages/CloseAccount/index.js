import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAccountAction } from 'redux/actions/user_actions';

function CloseAccount() {
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onCloseAccount = () => {
    dispatch(closeAccountAction(userId));
  };

  return (
    <div>
      <Button onClick={onCloseAccount} type="danger">
        회원 탈퇴하기
      </Button>
    </div>
  );
}

export default CloseAccount;
