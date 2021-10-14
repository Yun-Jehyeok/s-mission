import React, { useState } from 'react';
import Axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';
import { Form, Button, Upload } from 'antd';
import Dropzone from 'react-dropzone';

function Fileupload() {
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </>
  );
}

export default Fileupload;
