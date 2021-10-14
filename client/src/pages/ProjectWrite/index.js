import React, { useState, useLayoutEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createprojectAction } from 'redux/actions/project_actions';
import { Form, Input, Button, Upload } from 'antd';

import Axios from 'axios';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { PostWriteHeader, ProjectWriteContainer } from './style';

import Imageupload from './Imageupload';

function ProjectWrite() {
  const [form, setForm] = useState({
    title: '',
    contents: '',
    previewImg: [],
    category: '',
  });

  // Change //
  const onValueChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onEditorChange = () => {
    const val = editorRef.current.getInstance().getHTML();
    setForm({
      ...form,
      contents: val,
    });
  };

  const onImageChange = (image) => {
    setForm({
      ...form,
      previewImg: image,
    });
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const editorRef = createRef();

  const onSubmit = async (e) => {
    const { title, previewImg, contents, category } = form;
    const token = localStorage.getItem('token');
    let data = {
      title,
      contents,
      previewImg,
      category,
      token,
    };

    dispatch(createprojectAction(data));
  };

  useLayoutEffect(() => {}, [dispatch]);

  return (
    <ProjectWriteContainer>
      <PostWriteHeader>글 작성하기</PostWriteHeader>
      {/* 인증한 사용자만 볼 수 있음 */}
      {isAuthenticated ? (
        <Form onFinish={onSubmit}>
          <Form.Item
            name={'title'}
            rules={[{ required: true }]}
            style={{ marginBottom: '8px' }}
          >
            <Input
              name="title"
              id="title"
              onChange={onValueChange}
              placeholder="제목을 입력해 주세요."
            />
          </Form.Item>
          <Form.Item name={'category'} rules={[{ required: true }]}>
            <Input
              name="category"
              id="category"
              onChange={onValueChange}
              placeholder="카테고리를 입력해 주세요."
            />
          </Form.Item>
          <Form.Item name={'previewImg'} label="미리보기 이미지">
            <Imageupload onUploadFunction={onImageChange} />
            <span>* 최대 3장까지 업로드 가능</span>
          </Form.Item>
          <Editor
            previewStyle="vertical"
            height="400px"
            useCommandShortcut={true}
            initialEditType="wysiwyg"
            ref={editorRef}
            onChange={onEditorChange}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              글쓰기
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>로그인하고 이용하세요.</div>
      )}
    </ProjectWriteContainer>
  );
}

export default ProjectWrite;
