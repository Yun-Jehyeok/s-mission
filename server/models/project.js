const mongoose = require('mongoose');
const moment = require('moment');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  contents: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    default: 'https://source.unsplash.com/random/301x201',
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
  ],
  date: {
    type: String,
    default: moment().format('MMMM DD, YYYY'),
  }, // 아직 댓글 모델 안만듦
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = { Project };
