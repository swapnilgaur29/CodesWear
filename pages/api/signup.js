import User from "../../models/User"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body)
        let u = User(req.body)
        await u.save();
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This Method is Not Allowed" })
    }
}

export default connectDb(handler);