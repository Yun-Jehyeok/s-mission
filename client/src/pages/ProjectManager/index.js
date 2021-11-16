import React from 'react';

import { Select } from 'antd';
import {
  PicCenterOutlined,
  PicLeftOutlined,
  PicRightOutlined,
} from '@ant-design/icons';

const { Option } = Select;

function ProjectManager() {
  return (
    <div
      style={{
        width: '100%',
        height: '585px',
        display: 'flex',
        justifyContent: 'flex-start',
        borderTop: '1px solid #dbdbdb',
      }}
    >
      <div
        style={{
          width: '20%',
          height: '100%',
          borderRight: '1px solid #dbdbdb',
          padding: '16px',
        }}
      >
        <Select defaultValue="firstProject" style={{ width: '100%' }}>
          <Option value="firstProject">1st Project</Option>
          <Option value="secondProject">2nd Project</Option>
          <Option value="thirdProject">3rd Project</Option>
        </Select>

        <div
          style={{
            fontSize: '16px',
            marginTop: '24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ marginBottom: '12px', cursor: 'pointer' }}>
            <PicCenterOutlined style={{ marginRight: '8px' }} />
            Selection
          </div>
          <div style={{ marginBottom: '12px', cursor: 'pointer' }}>
            <PicLeftOutlined style={{ marginRight: '8px' }} />
            Selection
          </div>
          <div style={{ cursor: 'pointer' }}>
            <PicRightOutlined style={{ marginRight: '8px' }} />
            Selection
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="http://placeimg.com/24/24/people"
            style={{ borderRadius: '70%', marginRight: '6px' }}
            alt="people"
          />
          <img
            src="http://placeimg.com/24/24/people"
            style={{ borderRadius: '70%', marginRight: '6px' }}
            alt="people"
          />
          <img
            src="http://placeimg.com/24/24/people"
            style={{ borderRadius: '70%' }}
            alt="people"
          />
        </div>
      </div>
      <div
        style={{ width: '85%', height: '100%', backgroundColor: 'white' }}
      ></div>
    </div>
  );
}

export default ProjectManager;
