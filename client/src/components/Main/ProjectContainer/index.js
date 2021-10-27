import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Col } from 'antd';

// style
import { OfficeContainer, CardRow, CardContent } from './style';

import { readprojectAction } from 'redux/actions/project_actions';

function ProjectContainer() {
  const { projects } = useSelector(state => state.project);

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

      <a href="/project">
        <Button type="primary">더보기</Button>
      </a>
    </OfficeContainer>
  );
}

export default ProjectContainer;
