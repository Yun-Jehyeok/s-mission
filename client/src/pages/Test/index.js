import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

// antd
import { Button, Input } from 'antd';

// style
import { SignUpContainer, Wrap } from './style';

// component
import Axios from 'axios';

function Test() {
  const [form, setValues] = useState({
    num: '',
  });
  const [isAuth, setIsAuth] = useState(false);
  const [authNum, setAuthNum] = useState('');

  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSendMail = useCallback(
    (e) => {
      e.preventDefault();

      const { email } = user;

      Axios.post('/api/auth/mail', { email }).then((res) => {
        setAuthNum(res.data);
      });
    },
    [user],
  );

  const onSubmit = () => {
    if (String(authNum) === form.num) {
      setIsAuth(true);
    }
  };

  return (
    <SignUpContainer>
      <Wrap>
        {isAuth ? (
          <div>메일 인증에 성공하셨습니다.</div>
        ) : (
          <div>
            <Input
              type="text"
              name="num"
              id="num"
              placeholder="Num"
              onChange={onChange}
            />
            <Button onClick={onSendMail}>이메일 보내기</Button>
            <Button onClick={onSubmit}>확인하기</Button>
          </div>
        )}
      </Wrap>
    </SignUpContainer>
  );
}

export default Test;
