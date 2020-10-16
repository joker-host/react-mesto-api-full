const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid link`,
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
