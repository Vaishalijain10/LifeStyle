// used to upload images in the 3rd party application "multer" -> it is an api used to help to store image in the backend.
import multer from "multer";

// multer -
 const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log(file.originalname);
      return cb(null, "./productImages/");
    },
    filename: function (req, file, cb) {
      console.log(file.originalname);
      return cb(null, file.originalname);
    },
  });
  
// schema type -> passing as an object -> multer syntax
export const uploadImage = multer({ storage: Storage });