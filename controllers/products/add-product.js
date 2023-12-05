import Products from "../../models/products";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage }).any();


const AddProduct = async (req, res) => {
  
  if (req.user.isAdmin) {
    try {
      upload(req, res, async (err) => {

        if (err) {
          console.log('Multer error:', err);
          return res.status(500).send({ msg: 'Error uploading files' });
        }
        const {
          title,
          description,
          price,
          rating,
          quantity,
          brand,
          category,
          stock,
          thumbnail,
        } = req.body;

        const images = req.files ? req.files.map(file => {
          return `http://localhost:4000/${file.filename}`;
        }) : null;
        console.log('img files', images);

        const productDB = await Products.findOne({ title });
        if (productDB) {
          return res.status(400).send({ msg: 'Product already exists in DB' });
        } else {
          const newProduct = await Products.create({
            title,
            description,
            price,
            rating,
            quantity,
            brand,
            category,
            thumbnail,
            stock,
            images
          });

          newProduct.save();
          res.status(201).send({ msg: 'Product added successfully', product: newProduct });
        }
      })
    } catch (err) {
      res.send('Failed to add product', err);
    }
  } else {
    throw new Error('Access denied');
  }
};

export default AddProduct;
