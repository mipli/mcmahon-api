import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/macmahon');

export default mongoose;
