const express = require('express');
const { Project } = require('../../models/project');

const router = express.Router();

router.get('/:searchTerm', async (req, res, next) => {
  try {
    const result = await Project.find({
      title: {
        $regex: req.params.searchTerm,
        $options: 'i', // 대소문자 구분 X
      },
    });

    res.send(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
