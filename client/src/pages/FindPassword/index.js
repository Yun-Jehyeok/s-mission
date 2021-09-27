import React, { useState, useCallback } from 'react';
import Axios from 'axios';

// antd
import { Button, Input } from 'antd';

// style
import { SignUpContainer, Wrap } from './style';

// component
import LogoImg from 'components/Navbar/logo.png';

function FindPassword() {
  const [form, setValues] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    num: '',
  });
  const [emailAuth, setEmailAuth] = useState(false);
  const [authNum, setAuthNum] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isPwChange, setIsPwChange] = useState(false);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 존재하는 이메일인지 확인
  const onCheckEmail = useCallback(
    (e) => {
      e.preventDefault();

      const { email } = form;

      Axios.post('/api/auth/password/email', { email }).then((res) => {
        setEmailAuth(res.data.msg);
      });
    },
    [form],
  );

  // 인증번호 메일로 보내기
  const onSendMail = useCallback(
    (e) => {
      e.preventDefault();

      const { email } = form;

      Axios.post('/api/auth/mail', { email }).then((res) => {
        alert('인증번호가 발송되었습니다.');
        setAuthNum(res.data);
      });
    },
    [form],
  );

  // 인증번호 확인
  const onCheckAuthNumber = () => {
    if (String(authNum) === form.num) {
      alert('인증에 성공했습니다.');
      setIsAuth(true);
    }
  };

  // 비밀번호 변경
  const onChangePassword = useCallback((e) => {
    e.preventDefault();

    const { email, password } = form;

    Axios.post('/api/user/changepassword', { email, password }).then((res) => {
      alert('비밀번호 변경에 성공했습니다.');
      setIsPwChange(true);
    });
  });

  // 예외처리만 하면 될듯 정리랑
  return (
    <SignUpContainer>
      <Wrap>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="/">
            <img src={LogoImg} style={{ width: '64px', height: '64px' }} />
          </a>
        </div>
        {emailAuth ? (
          isAuth ? (
            isPwChange ? (
              <div style={{ textAlign: 'center' }}>
                <div>비밀번호 변경에 성공했습니다</div>
                <div>
                  <a href="/">Home</a>
                </div>
              </div>
            ) : (
              <div>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="변경할 비밀번호를 입력해 주십시오."
                  onChange={onChange}
                  style={{ marginBottom: '8px' }}
                />
                <Input
                  type="password"
                  name="passwordCheck"
                  id="passwordCheck"
                  placeholder="비밀번호를 한번 더 입력해 주십시오."
                  onChange={onChange}
                  style={{ marginBottom: '8px' }}
                />
                <Button
                  onClick={onChangePassword}
                  type="primary"
                  style={{ width: '100%' }}
                >
                  비밀번호 변경하기
                </Button>
              </div>
            )
          ) : (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                인증번호 보내기를 클릭하신 후 해당 이메일에서 인증번호를
                확인해주세요
              </div>
              <Button
                onClick={onSendMail}
                type="primary"
                style={{ width: '100%' }}
              >
                인증번호 보내기
              </Button>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                }}
              >
                <Input
                  type="text"
                  name="num"
                  id="num"
                  placeholder="인증번호를 입력해주세요."
                  onChange={onChange}
                  style={{ marginRight: '4px' }}
                />
                <Button onClick={onCheckAuthNumber}>인증하기</Button>
              </div>
            </div>
          )
        ) : (
          <div>
            <div style={{ marginBottom: '8px' }}>
              비밀번호를 찾고자 하는 이메일을 입력해주세요
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력해주세요."
                onChange={onChange}
                style={{ marginRight: '4px' }}
              />
              <Button onClick={onCheckEmail}>다음</Button>
            </div>
          </div>
        )}
      </Wrap>
    </SignUpContainer>
  );
}

export default FindPassword;
