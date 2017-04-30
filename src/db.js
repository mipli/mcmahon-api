import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development'
if (env === 'test') {
  mongoose.connect('mongodb://localhost/mcmahon-test');
} else {
  mongoose.connect('mongodb://localhost/mcmahon');
}

export default mongoose;
