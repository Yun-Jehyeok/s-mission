import React, { useEffect } from 'react';
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
  const { title, category, contents, creator, fileUrl, date } = useSelector(
    (state) => state.project,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailprojectAction(req.match.params.id));
  }, [dispatch, req.match.params.id]);

  return (
    <DetailContainer>
      <Wrap>
        <LeftSide>
          <ImageGallery items={images} autoPlay />
        </LeftSide>
        <RightSide>
          <h1>Side Project Title</h1>
          <div>
            <h3>Description</h3>

            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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
