import React, { useLayoutEffect } from 'react';
import ImageGallery from 'react-image-gallery';

// style
import { DetailContainer, Wrap, LeftSide, RightSide } from './style';

// antd
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailprojectAction,
  editprojectAction,
  deleteprojectAction,
} from 'redux/actions/project_actions';
import { Comments } from 'components/comment/Comments';

// 이미지 변경해야함
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
  const { projectdetail, creator, is_project } = useSelector(
    (state) => state.project,
  );
  const { userId } = useSelector((state) => state.auth);

  const { category, contents, date, fileUrl, title } = projectdetail;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(detailprojectAction(req.match.params.id));
  }, [dispatch, req.match.params.id]);

  const categoryList = category
    ? category.map((cate, index) => {
        return (
          <span key={index}>
            <Button>{cate.categoryName}</Button>
          </span>
        );
      })
    : [];

  const onDeleteClick = () => {
    const token = localStorage.getItem('token');
    const projectID = req.match.params.id;
    const body = { token, projectID };
    console.log(body);
    deleteprojectAction(body);
  };

  // 글 수정, 삭제
  const EditDelete_Button = (
    <div>
      <Button>글 수정하기</Button>
      <Button onClick={onDeleteClick}>글 삭제하기</Button>
    </div>
  );

  return (
    <DetailContainer>
      <Wrap>
        {is_project ? (
          <>
            <LeftSide>
              <ImageGallery items={images} autoPlay />
            </LeftSide>
            <RightSide>
              <h1>{title}</h1>
              <div>
                <div>{categoryList}</div>

                <h4>{date}</h4>
                <h4>{creator.name}</h4>
                <div>{contents}</div>

                {userId === creator._id ? EditDelete_Button : <></>}

                <div style={{ marginTop: '16px' }}>
                  <Button type="primary">채팅하기?</Button>
                </div>
              </div>
            </RightSide>
          </>
        ) : (
          <div>프로젝트가 존재하지 않습니다.</div>
        )}
        <Comments userId={'2'} id={'5'} projectID={'52'} userName={'dsa'} />
      </Wrap>
    </DetailContainer>
  );
}

export default ProjectDetail;
