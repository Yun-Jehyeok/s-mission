import React, { useEffect, useLayoutEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import ChatImg from './chat.png';

// style
import {
  DetailContainer,
  Wrap,
  LeftSide,
  RightSide,
  EditDeleteContainer,
  Title,
  CategoryDateContainer,
  ContentContainer,
  CommentContainer,
  FileContainer,
  ChatImgContainer,
} from './style';
import { Button } from 'antd';

//
import { useDispatch, useSelector } from 'react-redux';
import {
  detailprojectAction,
  deleteprojectAction,
  loadviewAction,
  upviewAction,
} from 'redux/actions/project_actions';
import Comments from 'components/comment/Comments';
import { Link } from 'react-router-dom';
import { loadcommentAction } from 'redux/actions/comment_actions';

const images = [];

function ProjectDetail(req) {
  const { projectdetail, creator, is_project, category, views } = useSelector(
    (state) => state.project,
  );
  const { userId, userName } = useSelector((state) => state.auth);

  const { contents, date, previewImg, title } = projectdetail;
  const dispatch = useDispatch();

  const data = {
    userID: userId,
    projectID: req.match.params.id,
  };

  useLayoutEffect(() => {
    dispatch(detailprojectAction(req.match.params.id));
    dispatch(loadviewAction(data));
    dispatch(upviewAction(data));
  }, [dispatch, req.match.params.id]);

  useEffect(() => {
    dispatch(loadcommentAction(req.match.params.id));
  }, [dispatch, req.match.params.id]);

  const categoryList = category
    ? category.map((cate, index) => {
        return (
          <span key={index}>
            <Button
              type="primary"
              style={{ width: '70px', marginRight: '4px' }}
            >
              {cate.categoryName}
            </Button>
          </span>
        );
      })
    : '';

  const imageList = previewImg
    ? previewImg.map((item, index) => {
        images.push({
          original: `http://localhost:7000/${item}`,
          thumbnail: `http://localhost:7000/${item}`,
        });
      })
    : '';

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
    <EditDeleteContainer>
      <Link to={`/project/edit/${req.match.params.id}`}>
        <Button>글 수정하기</Button>
      </Link>
      <Button onClick={onDeleteClick} type="danger">
        글 삭제하기
      </Button>
    </EditDeleteContainer>
  );

  return (
    <DetailContainer>
      <Wrap>
        {is_project ? (
          <>
            <LeftSide>
              <Title>{title}</Title>
              <div>
                <CategoryDateContainer>
                  <div>{categoryList}</div>
                  <div>{date}</div>
                </CategoryDateContainer>
                {/* <h4>{creator.name}</h4> */}
                <ContentContainer>
                  조회수 : {views}
                  <div dangerouslySetInnerHTML={{ __html: contents }}></div>
                </ContentContainer>
                <CommentContainer>
                  <h2>
                    <b>COMMENTS</b>
                  </h2>
                  <input placeholder="댓글을 작성해주세요." />
                </CommentContainer>
              </div>
            </LeftSide>
            <RightSide>
              {previewImg ? (
                previewImg.length > 0 ? (
                  <ImageGallery items={images} autoPlay />
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              <FileContainer>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
              </FileContainer>
              {userId === creator._id ? EditDelete_Button : <></>}
            </RightSide>
          </>
        ) : (
          <div>프로젝트가 존재하지 않습니다.</div>
        )}
        <Comments
          userId={userId}
          id={req.match.params.id}
          userName={userName}
        />
      </Wrap>
      <ChatImgContainer>
        <Link to="/chat">
          <img src={ChatImg} style={{ width: '74px', height: '74px' }} />
        </Link>
      </ChatImgContainer>
    </DetailContainer>
  );
}

export default ProjectDetail;
