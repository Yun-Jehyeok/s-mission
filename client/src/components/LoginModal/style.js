import styled from 'styled-components';
import { Button, Form, Modal } from 'antd';

export const ModalContainer = styled.div`
  margin-top: -1px;

  & a {
    text-decoration: none;
  }
`;

export const AuthFalseBox = styled.div`
  & ${Form.Item}:nth-child(1) {
    margin-bottom: 0px;
  }

  & > ${Modal} ${Form} ${Button} {
    width: 100%;
  }

  & ${Form} > div:nth-child(2) {
    text-align: center;
    margin-bottom: 7px;
  }

  & ${Form} > div:nth-child(3) {
    text-align: center;
  }
`;
