import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Col } from 'antd';
import { OfficeContainer, CardRow, CardContent } from './style';
import { readprojectAction } from 'redux/actions/project_actions';

function ProjectList() {
  const { projects, category } = useSelector(state => state.project);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(readprojectAction(0));
  }, [dispatch]);

  const projectCard = projects ? 
    projects.map((project, index)=>{
      var content = project.contents.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
      return(
        <Col key={index}>
          <CardContent title={project.title}>
            <p>{project.creator.name}</p>
            <p>{content.slice(0, 10)+ ' ...'}</p>
          </CardContent>
        </Col>
      );
    })
  : '';

  return (
    <OfficeContainer>
      {projectCard}
      <CardRow>
        <CardContent title="Card title">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </CardContent>
        <CardContent title="Card title">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </CardContent>
        <CardContent title="Card title">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </CardContent>
      </CardRow>
    </OfficeContainer>
  );
}

export default ProjectList;
