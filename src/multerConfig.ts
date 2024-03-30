import { diskStorage } from 'multer';
// const secretKey = process.env.SECRET_KEY || 'default-secret-key';

export const multerConfig = {
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: (req, file, callback) => {
      callback(null, './public/uploads'); // upload folder path
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};
