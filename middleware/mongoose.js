import mongoose from 'mongoose'
import handler from '../pages/api/hello';
const MONGO_URI = "mongodb://localhost:27017/codeswear"

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    await mongoose.connect(MONGO_URI, () => {
        return handler(req, res);
    })
}

export default connectDb;