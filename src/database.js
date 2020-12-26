import mongoose from 'mongoose';

mongoose.connect( 'mongodb://localhost:27017/companydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then( db => console.log( 'DB is connected', db.connection.name ) )
    .catch( console.log );

export default mongoose;