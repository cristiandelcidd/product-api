import mongoose from 'mongoose';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( 'mongodb://localhost:27017/companydb', options )
    .then( db => console.log( 'DB is connected', db.connection.name ) )
    .catch( console.log );

export default mongoose;