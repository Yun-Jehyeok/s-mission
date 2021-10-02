import React, { useLayoutEffect } from 'react';

import { OfficeContainer, CardRow, CardContent } from './style';

function ProjectList() {
  useLayoutEffect(() => {}, []);

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
    </OfficeContainer>
  );
}

export default ProjectList;
