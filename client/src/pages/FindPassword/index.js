import React, { useState, useCallback } from 'react';
import Axios from 'axios';

// antd
import { Button, Input } from 'antd';

// style
import {
  EmailAuth,
  EmailCheck,
  PasswordChange,
  PasswordChangeSuccess,
  SignUpContainer,
  Wrap,
} from './style';

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
  const [loading, setLoading] = useState(false);

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
        if (!res.data.success) {
          alert(res.data.msg);
        } else {
          alert(res.data.msg);
          setEmailAuth(res.data.success);
        }
      });
    },
    [form],
  );

  // 인증번호 메일로 보내기
  const onSendMail = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);

      const { email } = form;

      Axios.post('/api/auth/mail', { email }).then((res) => {
        setLoading(false);
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
      if (!res.data.success) {
        alert(res.data.msg);
      } else {
        alert(res.data.msg);
        setIsPwChange(res.data.success);
      }
    });
  });

  // 예외처리만 하면 될듯 정리랑
  return (
    <SignUpContainer>
      <Wrap>
        <div>
          <a href="/">
            <img src={LogoImg} />
          </a>
        </div>
        {emailAuth ? (
          isAuth ? (
            isPwChange ? (
              <PasswordChangeSuccess>
                <div>비밀번호 변경에 성공했습니다</div>
                <div>
                  <a href="/">Home</a>
                </div>
              </PasswordChangeSuccess>
            ) : (
              <PasswordChange>
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
                <Button onClick={onChangePassword} type="primary">
                  비밀번호 변경하기
                </Button>
              </PasswordChange>
            )
          ) : (
            <EmailAuth>
              <div>
                인증번호 보내기를 클릭하신 후 해당 이메일에서 인증번호를
                확인해주세요
              </div>
              <Button onClick={onSendMail} type="primary">
                인증번호 보내기
              </Button>

              <div>
                <Input
                  type="text"
                  name="num"
                  id="num"
                  placeholder="인증번호를 입력해주세요."
                  onChange={onChange}
                />
                <Button onClick={onCheckAuthNumber}>인증하기</Button>
              </div>

              {loading ? (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#1990ff',
                    marginTop: '16px',
                  }}
                >
                  인증번호를 발송 중입니다. 잠시만 기다려주세요.
                </div>
              ) : (
                ''
              )}
            </EmailAuth>
          )
        ) : (
          <EmailCheck>
            <div>비밀번호를 찾고자 하는 이메일을 입력해주세요</div>
            <div>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="이메일을 입력해주세요."
                onChange={onChange}
              />
              <Button onClick={onCheckEmail}>다음</Button>
            </div>
          </EmailCheck>
        )}
      </Wrap>
    </SignUpContainer>
  );
}

export default FindPassword;
