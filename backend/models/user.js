const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
    select: false
  },

  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid link`,
    },
  },

},
{ versionKey: false });

module.exports = mongoose.model('user', userSchema);
