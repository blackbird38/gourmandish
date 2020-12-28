const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storageConfiguration = multer.diskStorage({
  destination: (req, file, callback) => {
    //extra security measure in case we don't have one of the MIME_TYPES
    const isValid = MIME_TYPE_MAP[file.mimetype]; //returns nothing if we have a mimetype that is not a part of the MIME_TYPE_MAP

    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(error, "uploads/images"); //err, path relative to index.js file, callback
  },
  //telling multer what the filename should be
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split("").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    // console.log(name+'-'+Date.now()+'-'+ext);
    //callback to pass this info to multer
    callback(null, name + "-" + Date.now() + "." + ext);
  },
});

/* multer({storage: storage}).single("image") -multer will try to extract a single file from the incoming 
   request and will try to find it in an 'image' property in the request body */
module.exports = multer({ storage: storageConfiguration }).single("image");
