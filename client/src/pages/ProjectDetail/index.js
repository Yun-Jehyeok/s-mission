import React, { useLayoutEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import ChatImg from './chat.png';

// style
import { DetailContainer, Wrap, LeftSide, RightSide } from './style';

// antd
import { Button } from 'antd';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  detailprojectAction,
  editprojectAction,
  deleteprojectAction,
} from 'redux/actions/project_actions';

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
            <Button type="primary">{cate.categoryName}</Button>
          </span>
        );
      })
    : [];

  const onDeleteClick = (e) => {
    e.preventDefault();

    var result = window.confirm('글을 삭제하시겠습니까?');
    if (result) {
      const token = localStorage.getItem('token');
      const projectID = req.match.params.id;
      const body = { token, projectID };
      dispatch(deleteprojectAction(body));
      req.history.push('1');
    }
  };

  // 글 수정, 삭제
  const EditDelete_Button = (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}
    >
      <Button style={{ marginRight: '8px' }}>글 수정하기</Button>
      <Button onClick={onDeleteClick} type="danger">
        글 삭제하기
      </Button>
    </div>
  );

  return (
    <DetailContainer>
      <Wrap>
        {is_project ? (
          <>
            <LeftSide>
              <div
                style={{
                  textAlign: 'center',
                  fontWeight: 'bolder',
                  fontSize: '28px',
                }}
              >
                {title}
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '32px',
                    marginBottom: '16px',
                  }}
                >
                  <div>{categoryList}</div>

                  <div style={{ color: '#C7CAD2', lineHeight: '32px' }}>
                    {date}
                  </div>
                </div>

                {/* <h4>{creator.name}</h4> */}
                <div
                  style={{
                    width: '100%',
                    borderTop: '1px solid #dbdbdb',
                    paddingTop: '32px',
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: contents }}></div>
                </div>
              </div>
            </LeftSide>
            <RightSide>
              <ImageGallery items={images} autoPlay />
              <div style={{ color: '#1990ff', marginTop: '32px' }}>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
              </div>
              {userId === creator._id ? EditDelete_Button : <></>}
            </RightSide>
          </>
        ) : (
          <div>프로젝트가 존재하지 않습니다.</div>
        )}
      </Wrap>
      <div
        style={{
          position: 'fixed',
          right: '5%',
          bottom: '10%',
        }}
      >
        <img src={ChatImg} style={{ width: '74px', height: '74px' }} />
      </div>
    </DetailContainer>
  );
}

export default withRouter(ProjectDetail);
