import Forgot from "../../models/Forgot"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (req.body.sendmail) {
            console.log(req.body)

            let token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
            let forgot = new Forgot({
                email: req.body.email,
                token: token,
            })
            await forgot.save();

            let email = `We have sent you this email in response to your request to reset your password on Codeswear.com

                <br/><br/>

                To reset your password, please follow the link below:

                <a href="http://localhost:3000/forgot?token=${token}">Click Here To Reset Your Password</a>

                <br/><br/>

                We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your Codeswear.com My Account Page and "Change your Password".

                <br/><br/>`

            let ress;
            const sendMail = () => {
                return new Promise((resolve, reject) => {
                    const transporter = nodemailer.createTransport({
                        host: 'smtp-mail.outlook.com',
                        auth: {
                            user: "codeswear22@outlook.com",
                            pass: "codes@22"
                        }
                    })

                    const options = {
                        from: "codeswear22@outlook.com",
                        to: req.body.email,
                        subject: "Reset Password",
                        text: "Hello",
                        html: email
                    }

                    transporter.sendMail(options, (error, info) => {
                        if (error) {

                            ress = error
                            ress.success = false
                            console.log(error)
                            resolve(ress)
                        }
                        else {

                            ress = info
                            ress.success = true
                            console.log(ress)
                            resolve(ress)
                        }
                    })
                })
            }
            await sendMail();
            res.status(200).json(ress)
        }
        else {
            //reset User Password
            // Check if the user exists in the database
            let dbuser = await Forgot.findOne({ token: req.body.token })
            let { token } = dbuser
            if (req.body.token == token) {
                let user = await User.findOneAndUpdate({ email: dbuser.email }, { password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
                if (user) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(400).json({ success: false })
                }
            }
            else {
                res.status(400).json({ success: false })
            }
        }
    }
    else {
        res.status(400).json({ error: "error" })
    }
}


export default connectDb(handler)