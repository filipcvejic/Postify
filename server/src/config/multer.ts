import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./aws";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME!,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `images/${Date.now()}_${file.originalname}`);
    },
    contentDisposition: "inline",
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
  }),
});

export default upload;
