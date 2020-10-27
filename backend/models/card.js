const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: (props) => `${props.value} некорректная ссылка`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
},
{ versionKey: false });

module.exports = mongoose.model('card', cardSchema);
