const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Please Enter your username'],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Please Enter your email'],
            validate: {
                validator: email => validator.isEmail(email),
                message: 'Invalid email.',
            },
        },
        full_name: {
            type: String,
            trim: true,
            required: [true, 'Please Enter your name and surname'],
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Please Enter your password'],
            validate: {
                validator(password) {
                    return validator.isLength(password, { min: 5, max: 35 });
                },
                message: 'The password needs to be between 5 and 35 characters long.',
            },
        },
        bio: String,
        followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true },
);

UserSchema.plugin(uniqueValidator, { message: 'already taken' });

UserSchema.pre('save', function() {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
});

UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },

    authUser(password) {
        return compareSync(password, this.password);
    },

    createToken() {
        return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
    },
};

export default mongoose.model('User', UserSchema);
  