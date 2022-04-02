const path = require('path')
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
require('dotenv').config();
const fs = require('fs/promises');
const app = express();
const PORT = process.env.PORT || 3000;

//_____multer configs_____//

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

var upload = multer({ storage: storage });

var multipleUploads = upload.fields([{ name: 'img_', maxCount: 1}, { name: 'vid_', maxCount: 1}])

//_____node mailer configs_____//

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

let mailOptions = (cMail, cName, cText, img, vid) => {
    const obj = {
        from: process.env.EMAIL,
        to: cMail,
        subject: 'suntoes | automated mail',
        text: `Hi ${cName.split(' ')[0]}!\n\nGreetings,\n\nI'm not suntoes and this is an automated email.\n\nYou've just stated that "${cText}" in my form website. Yea, I've also attached your image and video in this mail.\n\nBtw, please let me know if this was not your action and it's a spam.\n\nKind regards,\n\nnot suntoes`,
        attachments: [
            { filename: img.filename, path: img.path},
            { filename: vid.filename, path: vid.path}
        ]
    }
    return obj
}

//_____express in action_____//

app.use(express.static('build'));

app.post('/upload', multipleUploads, async(req, res)=>{
    const { name, email, text } = req.body;
    const { img_, vid_ } = req.files;
    console.log('email request')
    await transporter.sendMail(mailOptions(email, name, text, img_[0], vid_[0]), async(err, data) => {
        if (err) {
            console.log(err);
            res.redirect('/err');
            return
        };
        console.log('an email is sent');
        try {
            await fs.unlink(img_[0].path);
            await fs.unlink(vid_[0].path);
            console.log('file cleaned');
            res.redirect('/done');
          } catch (error:any) {
            console.error('there was an error:', error.message);
            res.redirect('/done');
          }
    })
})

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname) + '/build/index.html');
});

app.listen(PORT, ():void => console.log(`Listening on port ${PORT}`))