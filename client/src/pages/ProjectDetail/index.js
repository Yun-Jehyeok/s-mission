import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailprojectAction } from 'redux/actions/project_actions';

function ProjectDetail(req) {
  const { title, category, contents, creator, fileUrl, date } = useSelector(
    (state) => state.project,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailprojectAction(req.match.params.id));
  }, [dispatch, req.match.params.id]);

  return (
    <div>
      <div>{title}</div>
      <div>{category}</div>
      <div>{creator}</div>
    </div>
  );
}

export default ProjectDetail;
