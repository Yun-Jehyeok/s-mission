const express = require('express');
const { auth } = require('../../middleware/auth');
const { Project } = require('../../models/project');
const { Category } = require('../../models/category');
const { User } = require('../../models/user');

const router = express.Router();
const moment = require('moment');
const dotenv = require('dotenv');
const multer = require('multer');

const { isNullOrUndefined } = require('util');

dotenv.config();

// previewImg, imgIncontent upload //
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
      return cb(res.status(400).end('only jpg, png, jpeg are allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage });

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

// Upload Image //
router.post('/uploadimage', upload.single('file'), (req, res) =>{
  try {
    return res.json({
      success: true,
      image: res.req.file.path,
    });
  } catch(e){
    res.json({ success: false, e });
  }
});

// Project Create //
router.post('/write', auth, async (req, res) => {
  try {
    const { title, contents, category, previewImg } = req.body;

    // 새로운 프로젝트 생성
    const newProject = await Project.create({
      title,
      contents,
      previewImg,
      creator: req.user.id,
      date: moment().format('MMMM DD, YYYY'),
    });
    
    console.log(newProject);

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
      await User.findByIdAndUpdate(req.user.id, {
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
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          projects: newProject._id,
        },
      });
    }

    res.redirect(`/api/project/${newProject._id}`);
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

// Project Update //
// 수정 페이지
router.get('/:id/edit', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator')
      .populate({ path: 'category', select: 'categoryName' });

    res.json(project);
  } catch (e) {
    console.error(e);
  }
});

// 수정 action
router.post('/:id/update', async (req, res, next) => {
  const { title, contents, fileUrl, id, category } = req.body;

  try {
    const update_project = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        category,
        date: moment().format('MMMM DD, YYYY'),
      },
      { new: true },
    );
    res.redirect(`/api/project/${update_project._id}`);
  } catch (e) {
    console.log(e);
  }
});

// Project Delete //
router.delete('/:id/delete', auth, async (req, res) => {
  try {
    await Project.deleteMany({ _id: req.params.id });
    const edit_category = await Category.findOneAndUpdate(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } },
      { new: true },
    );
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        projects: req.params.id,
      },
    });

    if (edit_category.projects.length === 0) {
      await Category.deleteMany({ _id: edit_category });
    }

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.json({ error: e });
  }
});

module.exports = router;
