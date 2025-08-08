import multer from "multer";
import path from "path";

// Define storage settings
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // Save files to /uploads folder
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    callback(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Create the multer instance
const upload = multer({ storage });

export default upload;
