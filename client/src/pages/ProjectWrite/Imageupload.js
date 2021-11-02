import React, { useState } from 'react';
import Axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import Dropzone from 'react-dropzone';

function Imageupload(props) {
  const [Images, setImages] = useState([]);

  // const onChange = (e) => {
  //   let formData = new FormData();
  //   console.log(e.file);
  //   formData.append('file', e.file.originFileObj);

  //   if (e.file.status === 'success') {
  //     Axios.post('api/project/uploadimage', formData, {
  //       headers: {
  //         withCredentials: true,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }).then((res) => {
  //       console.log(res.data);
  //       if (res.data.success) {
  //         setImages([...Images, res.data.image]);
  //         props.onUploadFunction([...Images]);
  //       } else {
  //         console.log(res.data.e);
  //       }
  //     });
  //   } else if (e.file.status === 'error') {
  //     console.log(e.file.response);
  //   }
  // };

  const onDrop = (files) => {
    let formData = new FormData();
    console.log(files);

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
            <img src={`http://localhost:7000/${image}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Imageupload;
