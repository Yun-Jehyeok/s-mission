import { Card } from 'antd';
import styled from 'styled-components';

export const OfficeContainer = styled.div`
  width: 70%;
  max-width: 1120px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -5%;
`;

export const CardContent = styled(Card)`
  height: 213px;
  border-bottom: 2px solid #1990ff;
  margin-bottom: 32px;
`;
