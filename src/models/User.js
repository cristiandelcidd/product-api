import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId,
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.plugin( uniqueValidator, { message: 'Error, expected {PATH} to be unique.' } );

userSchema.statics.hashPassword = async ( password ) => {
    const salt = await bcrypt.genSalt( 10 );
    return await bcrypt.hash( password, salt );
};

userSchema.statics.comparePassword = async ( password, passwordReceived ) => {
    return await bcrypt.compare( password, passwordReceived );
};

export default model( 'User', userSchema );