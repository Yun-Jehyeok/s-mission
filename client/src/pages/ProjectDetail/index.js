import React, { useLayoutEffect } from 'react';
import ImageGallery from 'react-image-gallery';

// style
import { DetailContainer, Wrap, LeftSide, RightSide } from './style';

// antd
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { detailprojectAction } from 'redux/actions/project_actions';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

function ProjectDetail(req) {
  const { projectdetail } = useSelector((state) => state.project);
  const { category, contents, date, fileUrl, title } = projectdetail;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(detailprojectAction(req.match.params.id));
  }, [dispatch, req.match.params.id]);

  const categoryList = category ? category.map((cate, index)=> {
    return (
      <span key={index}>
        <Button>{cate.categoryName}</Button>
      </span>
    );
  }) : [];

  return (
    <DetailContainer>
      <Wrap>
        <LeftSide>
          <ImageGallery items={images} autoPlay />
        </LeftSide>
        <RightSide>
          <h1>{title}</h1>
          <div>
            <div>
              {categoryList}
            </div>

            <h4>{date}</h4>
            <div>
              {contents}
            </div>

            <div style={{ marginTop: '16px' }}>
              <Button type="primary">채팅하기?</Button>
            </div>
          </div>
        </RightSide>
      </Wrap>
    </DetailContainer>
  );
}

export default ProjectDetail;
