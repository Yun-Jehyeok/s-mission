import React, { useState, useLayoutEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createprojectAction } from 'redux/actions/project_actions';
import { Form, Input, Button, Upload } from 'antd';

import Axios from 'axios';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { UploadOutlined } from '@ant-design/icons';
import { PostWriteHeader, ProjectWriteContainer } from './style';

const { TextArea } = Input;

function ProjectWrite() {

  const [form, setForm] = useState({
    title: '',
    contents: '',
    previewImg: [],
    category: [],
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

  const normFile = (e) => {
    console.log('Upload event:', e);
    let fileName = e.file.name;
    Axios.post('api/project/uploadImage', fileName).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        console.log(res.data.image);
        setForm({
          ...form, // 
          previewImg: [ ...form.previewImg, res.data.image ],
        })
      } else {
        console.log(res.data.e);
      }
    });
    if (Array.isArray(e)) {
      return e;
    }
    // let formData = new FormData();
    // formData.append('previewImg', e[0]);
    return e && e.fileList;
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const editorRef = createRef();

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, previewImg, contents, category } = form;
    const token = localStorage.getItem('token');
    let data = {
      title, contents, previewImg, category, token,
    }

    dispatch(createprojectAction(data));
  };

  useLayoutEffect(() => {}, [dispatch]);

  return (
    <ProjectWriteContainer>
      <PostWriteHeader>글 작성하기</PostWriteHeader>
      {/* 인증한 사용자만 볼 수 있음 */}
      {isAuthenticated ? (
        <Form>
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
          <Form.Item
            name={'previewImg'}
            label="project file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="previewImg"
              action="/upload.do"
              listType="picture"
              fileList={[form.previewImg]}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Editor
            previewStyle="vertical"
            height="400px"
            useCommandShortcut={true}
            initialEditType="wysiwyg"
            ref={editorRef}
            onChange={onEditorChange}
          />
          <Button onClick={onSubmit} type="primary" style={{ width: '100%' }}>
            글쓰기
          </Button>
        </Form>
      ) : (
        <div>로그인하고 이용하세요.</div>
      )}
    </ProjectWriteContainer>
  );
}

export default ProjectWrite;
