const { Schema, model } = require('mongoose');

// ------ Variable to store the bcrypt package password hashing ------>>
const bcrypt = require('bcrypt');

const Bonsai = require('./Bonsai');

const userSchema = new Schema({
  email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: false
    },
    userBonsai: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Bonsai',
      },
    ],    
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//------ Function to hash user password using bcrypt------>>
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

//------ Method to compare and validate password for logging in ------>>
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//------ When querying a user, will also return a field called `bonsaiCount` with the total of bonsai's the user has ------>>
userSchema.virtual('bonsaiCount').get(function () {
  return this.userBonsai.length;
});

const User = model('user', userSchema);

module.exports = User;
