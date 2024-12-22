const mongoose = require('mongoose')
const { eventRegistrationSchema } = require('./eventModel')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  student_code: {
    type: String,
    required: function () {
      return this.role === 'USER'
    }
  },
  phone: {
    type: String,
    required: false
  },
  class_name: {
    type: String,
    required: function () {
      return this.role === 'USER'
    }
  },
  full_name: {
    type: String,
    required: function () {
      return this.role === 'USER'
    }
  },
  events_registered: [eventRegistrationSchema],
  faculty_id: {
    type: String,
    required: function () {
      return this.role === 'USER'
    }
  },
  course_id: {
    type: String,
    required: function () {
      return this.role === 'USER'
    }
  },
  role: {
    type: String,
    enum: ['USER', 'MANAGER', 'ADMIN'],
    default: 'USER'
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
