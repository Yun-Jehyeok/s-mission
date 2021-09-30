import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createprojectAction } from 'redux/actions/project_actions';
import { Form, Input, Button, Upload } from 'antd';
import axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';

function ProjectWrite() {
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [form, setForm] = useState({
    title: '',
    contents: '',
    fileUrl: '',
    category: [],
  });

  const onValueChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl, category } = form;
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('contents', contents);
    formData.append('fileUrl', fileUrl);
    formData.append('category', category);
    formData.append('token', token);
    console.log(token);

    dispatch(createprojectAction(formData));
  };

  return (
    <div>
      {/* 인증한 사용자만 볼 수 있음 */}
      {isAuthenticated ? (
        <Form>
          <Form.Item
            name={'title'}
            label="project title"
            rules={[{ required: true }]}
          >
            <Input name="title" id="title" onChange={onValueChange} />
          </Form.Item>
          <Form.Item
            name={'category'}
            label="project category"
            rules={[{ required: true }]}
          >
            <Input name="category" id="category" onChange={onValueChange} />
          </Form.Item>
          <Form.Item
            name={'fileUrl'}
            label="project file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="fileUrl"
              onChange={onValueChange}
              action="/upload.do"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name={'content'}
            label="project content"
            rules={[{ required: true }]}
          >
            <Input name="contents" id="contents" onChange={onValueChange} />
          </Form.Item>
          <Button onClick={onSubmit}>글쓰기</Button>
        </Form>
      ) : (
        <div>로그인하고 이용하세요.</div>
      )}
    </div>
  );
}

export default ProjectWrite;
