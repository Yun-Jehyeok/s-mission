import React, { useState } from 'react';
import Axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Dropzone from 'react-dropzone';

function Imageupload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();

    formData.append('file', files[0]);

    Axios.post('/api/project/uploadimage', formData).then((res) => {
      if (res.data.success) {
        setImages([...Images, res.data.image]);
        props.onUploadFunction([...Images, res.data.image]);
      } else {
        console.log(res.data.e);
      }
    });
  };

  return (
    <>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <Button {...getRootProps()} icon={<UploadOutlined />}>
            <input {...getInputProps()} />
            &nbsp;&nbsp;Click to upload
          </Button>
        )}
      </Dropzone>
      <div>
        {Images.map((image, index) => (
          <div key={index}>
            {/* 요기가 이상... */}
            <img src={`http://localhost:7000/${image}`} alt="preview" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Imageupload;
