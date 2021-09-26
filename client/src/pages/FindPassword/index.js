import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

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

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSendMail = useCallback(
    (e) => {
      e.preventDefault();

      const { email } = form;

      Axios.post('/api/auth/mail', { email }).then((res) => {
        setAuthNum(res.data);
      });
    },
    [form],
  );

  const onAuthEmail = useCallback(
    (e) => {
      e.preventDefault();

      const { email } = form;

      Axios.post('/api/auth/password/email', { email }).then((res) => {
        setEmailAuth(res.data.msg);
      });
    },
    [form, dispatch],
  );

  const onChangePassword = useCallback((e) => {
    e.preventDefault();

    const { email, password } = form;

    Axios.post('/api/user/changepassword', { email, password }).then((res) => {
      if (res.data.msg) alert('비밀번호 변경에 성공했습니다.');
    });
  });

  const onSubmit = () => {
    if (String(authNum) === form.num) {
      setIsAuth(true);
    }
  };

  // 1. 이메일 확인하고
  // 2. 이메일 인증하고
  // 3. 비밀번호 변경

  // 기능은 기본적으로 다 되고 이제
  // 디자인, Input 초기화, 페이지 이동만 만들면 끝날듯
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
                placeholder="인증번호를 입력해주세요."
                onChange={onChange}
              />
              <Button onClick={onSendMail}>이메일 보내기</Button>
              <Button onClick={onSubmit}>인증하기</Button>
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
