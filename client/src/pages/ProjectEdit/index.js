import React, { useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateprojectAction } from 'redux/actions/project_actions';
import { Form, Input, Button, Upload } from 'antd';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { UploadOutlined } from '@ant-design/icons';
import { PostWriteHeader, ProjectWriteContainer } from './style';

function ProjectEdit(req) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { projectdetail } = useSelector((state) => state.project);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [form, setForm] = useState({
    title: `${projectdetail.title}`,
    contents: `${projectdetail.contents}`,
    fileUrl: '',
    category: '',
  });

  const onValueChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const editorRef = createRef();

  const onEditorChange = () => {
    const val = editorRef.current.getInstance().getHTML();
    setForm({
      ...form,
      contents: val,
    });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, previewImg, contents, category } = form;
    const token = localStorage.getItem('token');
    let data = {
      title,
      contents,
      previewImg,
      category,
      token,
    };

    dispatch(updateprojectAction(data));
  };

  return (
    <ProjectWriteContainer>
      <PostWriteHeader>글 수정하기</PostWriteHeader>
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
              defaultValue={form.title ? form.title : 0}
            />
          </Form.Item>
          <Form.Item name={'category'} rules={[{ required: true }]}>
            <Input
              name="category"
              id="category"
              onChange={onValueChange}
              defaultValue={form.category}
            />
          </Form.Item>
          <Form.Item
            name={'fileUrl'}
            label="project file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="fileUrl"
              action="/upload.do"
              listType="picture"
              fileList={[form.fileUrl]}
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
            initialValue={form.contents}
          />
          <Button onClick={onSubmit} type="primary" style={{ width: '100%' }}>
            수정하기
          </Button>
        </Form>
      ) : (
        <div>로그인하고 이용하세요.</div>
      )}
    </ProjectWriteContainer>
  );
}

export default ProjectEdit;
