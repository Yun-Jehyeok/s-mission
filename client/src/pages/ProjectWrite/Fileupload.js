import React, { useState } from 'react';
import Axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';
import { Form, Button, Upload } from 'antd';

function Fileupload(props) {
  const [Image, setImage] = useState([]);

  const onChange = (e) => {
    let formData = new FormData();
    console.log(e);
    console.log(e.file.originFileObj);
    formData.append('file', e.file.originFileObj);

    if (e.file.status === "success") {
      Axios.post('api/project/uploadimage', formData, {
        headers: {
          withCredentials: true,
          "Content-Type": "multipart/form-data",
        }
      }).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setImage([ ...Image, res.data.image])
          props.onUploadFunction([ ...Image ]);
        } else {
          console.log(res.data.e);
        }
      });
    } else if (e.file.status === "error"){
      console.log(e.file.response);
    }
  };

  return(
    <>
      <Upload
        listType="picture"
        name="Image"
        onChange={onChange}
        multiple={false}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </>
  );
}

export default Fileupload;