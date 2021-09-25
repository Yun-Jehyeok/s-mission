import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

// antd
import { Button, Input } from 'antd';

// style
import { SignUpContainer, Wrap } from './style';

// component
import Axios from 'axios';

function FindPassword() {
  const [form, setValues] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    num: '',
  });
  const [emailAuth, setEmailAuth] = useState(false);
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
  const onAuthEmail = () => {};
  const onChangePassword = () => {};

  const onSubmit = () => {
    if (String(authNum) === form.num) {
      setIsAuth(true);
    }
  };

  // 1. 이메일 확인하고
  // 2. 이메일 인증하고
  // 3. 비밀번호 변경
  return (
    <SignUpContainer>
      <Wrap>
        {emailAuth ? (
          isAuth ? (
            <div>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="변경할 비밀번호를 입력해 주십시오."
                onChange={onChange}
              />
              <Input
                type="password"
                name="passwordCheck"
                id="passwordCheck"
                placeholder="비밀번호를 한번 더 입력해 주십시오."
                onChange={onChange}
              />
              <Button onClick={onChangePassword}>비밀번호 변경하기</Button>
            </div>
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
          )
        ) : (
          <div>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="이메일을 입력해주세요."
              onChange={onChange}
            />
            <Button onClick={onAuthEmail}>인증하기</Button>
          </div>
        )}
      </Wrap>
    </SignUpContainer>
  );
}

export default FindPassword;
