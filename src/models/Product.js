import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const productSchema = new Schema({
    name: {
        type: String
    },
    category:{
        type: String
    },
    price: {
        type: Number
    },
    imgUrl: {
        type: String,
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

productSchema.plugin( uniqueValidator, { message: 'Error, expected {PATH} to be unique.' } );

export default model( 'Product', productSchema );