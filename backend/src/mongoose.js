import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('MongoDb connected');
});

mongoose.connection.on('error', error => {
    console.log(error);
    console.log('MongoDb error');
    process.exit();
});
