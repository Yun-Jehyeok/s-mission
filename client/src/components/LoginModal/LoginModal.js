import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loginAction, logoutAction } from 'redux/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';

// antd
import { Modal, Form, Button, Input } from 'antd';

function LoginModal({ buttonType }) {
  ///////////////////////////////////////////
  // Modal Setting
  const [signInVisible, setSignInVisible] = useState(false);

  const showSignInModal = () => {
    setSignInVisible(true);
  };
  const handleSignInCancel = () => {
    setSignInVisible(false);
  };

  ///////////////////////////////////////////
  // Login Setting
  // if modal closed, the values will be reset
  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 작동 안함
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { email, password } = form;
      const user = { email, password };

      dispatch(loginAction(user));
      setSignInVisible(false);
    },
    [form, dispatch],
  );

  const onLogoutClick = () => {
    if (window.confirm('로그아웃 하시겠습니까?') === true) {
      dispatch(logoutAction());
      setSignInVisible(false);
    } else {
      return false;
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={onLogoutClick}>Logout</Button>
      ) : (
        <Button onClick={showSignInModal} type={buttonType}>
          Sign In
        </Button>
      )}
      <Modal visible={signInVisible} onCancel={handleSignInCancel} footer="">
        <h2 style={{ marginBottom: '32px' }}>SIGN IN</h2>
        <div>
          <Form onSubmit={onSubmit}>
            <div>
              <Form.Item label="EMAIL" style={{ marginBottom: '16px' }}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="PASSWORD">
                <Input.Password
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </Form.Item>

              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                Sign In
              </Button>
            </div>
            <br />
            <div style={{ textAlign: 'center', marginBottom: '7px' }}>
              <span>
                <Link to="/findpassword" onClick={handleSignInCancel}>
                  Forgot a Password?
                </Link>
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span>Not a Member?&nbsp;&nbsp;</span>
              <span>
                <a href="/user/signup" onClick={handleSignInCancel}>
                  Sign Up
                </a>
              </span>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
