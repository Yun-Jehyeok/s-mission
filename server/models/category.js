const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: '미분류',
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
    },
  ],
});

const Category = mongoose.model('category', CategorySchema);

module.exports = { Category };
