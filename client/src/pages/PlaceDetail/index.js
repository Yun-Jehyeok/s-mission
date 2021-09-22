import React from 'react';
import { DetailContainer, Wrap, LeftSide, RightSide } from './style';
import ImageGallery from 'react-image-gallery';
import { Button } from 'antd';

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

function PlaceDetail() {
  return (
    <DetailContainer>
      <Wrap>
        <LeftSide>
          <ImageGallery items={images} autoPlay />
        </LeftSide>
        <RightSide>
          <h1>대양 AI 센터 - B201호</h1>
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
              <Button type="primary">예약하기</Button>
            </div>
          </div>
        </RightSide>
      </Wrap>
    </DetailContainer>
  );
}

export default PlaceDetail;
