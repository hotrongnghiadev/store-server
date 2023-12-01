import { validationResult } from 'express-validator';
import { v2 as cloudinary } from 'cloudinary';

const validate = (validator) => {
  return [
    ...validator(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.files) {
          const files = Object.values(req.files);
          const filenames = [];
          files.forEach((el) => {
            el.forEach((elChild) => {
              filenames.push(elChild.filename);
            });
          });
          console.log(filenames);
          cloudinary.api.delete_resources(filenames, function (error, result) {
            if (error) console.log(error);
          });
        }
        return res.status(422).json({
          status: 'VALIDATE ERROR',
          fields: errors.mapped(),
        });
      }
      next();
    },
  ];
};
export default validate;
