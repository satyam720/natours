import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    min: [8, 'password should be atleast of 8 chars'],
    select: false
  },
  passwordConfirm: {
    // this only works on save and create
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function () {
  // only run this function if password was actually modified
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

// instance method:
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  // candidate password is normal password
  // userPassword is hashed
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  
  if(this.passwordChangedAt){
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
    console.log(JWTTimestamp, changedTimeStamp);
    return JWTTimestamp < changedTimeStamp;
  }

  // false means not changed
  return false;
}

const User = mongoose.model('User', userSchema);
export default User;
