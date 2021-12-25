import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Col, Row } from 'antd';
import { OfficeContainer, CardContent } from './style';
import { readprojectAction } from 'redux/actions/project_actions';
import { Link } from 'react-router-dom';

function ProjectList() {
  const { projects } = useSelector((state) => state.project);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(readprojectAction(0));
  }, [dispatch]);

  const projectCard = projects
    ? projects.map((project, index) => {
        var content = project.contents.replace(
          /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
          '',
        );
        return (
          <Col key={index} span={8}>
            <Link to={`/project/detail/${project._id}`}>
              <CardContent title={project.title}>
                <p>{project.creator.name}</p>
                <p>
                  {content.length > 80
                    ? content.slice(0, 80) + ' ...'
                    : content}
                </p>
              </CardContent>
            </Link>
          </Col>
        );
      })
    : '';

  return (
    <OfficeContainer>
      <Row>{projectCard}</Row>
    </OfficeContainer>
  );
}

export default ProjectList;
