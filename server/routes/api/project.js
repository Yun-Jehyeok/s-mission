const express = require('express');
const { auth } = require('../../middleware/auth');
const { Project } = require('../../models/project');
const { Category } = require('../../models/category');
const { User } = require('../../models/user');

const router = express.Router();
const moment = require('moment');
const dotenv = require('dotenv');
const multer = require('multer');
const upload = multer({ dest: './upload' });

const { isNullOrUndefined } = require('util');

dotenv.config();

// Project All //
router.get('/', async (req, res) => {
  try {
    const projectFindResult = await Project.find();
    const categoryFindResult = await Category.find();
    const result = { projectFindResult, categoryFindResult };
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: 'No Project' });
  }
});

// Project Create //
router.post('/write', upload.single('fileUrl'), async (req, res) => {
  try {
    const { title, contents, fileUrl, creator, category } = req.body;
    // console.log('백엔드', req.user._id);
    // 아니 auth 인증 개잘되는데 프로젝트 create만 하면 없다 그래
    // 내가 이거 고치고만다

    // 새로운 프로젝트 생성
    const newProject = await Project.create({
      title,
      contents,
      fileUrl,
      creator: creator,
      date: moment().format('MMMM DD, YYYY'),
    });

    const categoryFindResult = await Category.findOne({
      categoryName: category,
    });

    // 카테고리 만들면 실행
    if (isNullOrUndefined(categoryFindResult)) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Project.findByIdAndUpdate(newProject._id, {
        $push: {
          category: newCategory._id,
        },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {
          projects: newProject._id, //mongoDB는 _id로 저장
        },
      });
      await User.findByIdAndUpdate(creator, {
        $push: {
          projects: newProject._id,
        },
      });
    } else {
      // 카테고리가 없으면 실행
      await Category.findByIdAndUpdate(categoryFindResult._id, {
        $push: { projects: newProject._id },
      });
      await Project.findByIdAndUpdate(newProject._id, {
        category: categoryFindResult._id,
      });
      await User.findByIdAndUpdate(creator, {
        $push: {
          projects: newProject._id,
        },
      });
    }

    return res.redirect(`/api/project/${newProject._id}`);
  } catch (e) {
    console.log(e);
  }
});

// Project Detail //
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator')
      .populate({ path: 'category', select: 'categoryName' });

    project.save();

    res.json(project);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
