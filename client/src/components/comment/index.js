import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_UPLOADING_REQUEST,
} from '../../redux/types/project_types';

function Comments({ id, userId, userName, projectNAme }) {
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    contents: '',
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();

    const { contents } = form;
    const token = localStorage.getItem('token');
    const body = { contents, token, id, userId, userName };

    dispatch({
      type: COMMENT_UPLOADING_REQUEST,
      payload: body,
    });

    resetValue.current.value = '';
    setValues('');
  };

  const resetValue = useRef(null);

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
  }, [dispatch, id]);

  return (
    <>
      <Input
        innerRef={resetValue}
        type="textarea"
        name="contents"
        id="contents"
        onChange={onChange}
        placeholder="Comment"
      />

      <Button color="primary" block>
        Submit
      </Button>
    </>
  );
}

export default Comments;
