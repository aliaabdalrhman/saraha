import multer from 'multer';

function fileUpload() {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
        if (['image/jpeg', 'image/png', 'image/gif', 'image/jpj'].includes(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb('invalid format', false);
        }
    }
    const upload = multer({ fileFilter, storage });
    return upload;
}
export default fileUpload;