import Products from "../../models/products";

export const AddBulkProducts = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const productsData = req.body;
      const errorArr = [];
      let writeData = [];
      let successfulUploads = 0;
      let failedUploads = 0;

      for (let i = 0; i < productsData.length; i += 1) {
        const [
          productName,
          productDescription,
          productPriceStr,
          productStockStr,
          productColors,
          productSizes,
          productImages,
        ] = productsData[i];

        if (!productName) {
          errorArr.push({
            row: i,
            message: 'Name is missing',
          });
        }
        if (!productDescription) {
          errorArr.push({
            row: i,
            message: 'Description is missing',
          });
        }
        if (!productPriceStr) {
          errorArr.push({
            row: i,
            message: 'Price is missing or is negative',
          });
        }
        if (!productStockStr) {
          errorArr.push({
            row: i,
            message: 'Stock is missing',
          });
        }
        if (!productColors) {
          errorArr.push({
            row: i,
            message: 'Color is missing',
          });
        }
        if (!productSizes) {
          errorArr.push({
            row: i,
            message: 'Size is missing',
          });
        }
        if (!productImages) {
          errorArr.push({
            row: i,
            message: 'Image is missing',
          });
        }

        const productPrice = parseInt(productPriceStr, 10);
        const productStock = parseInt(productStockStr, 10);

        const areFieldsValid =
          !!productName &&
          !!productDescription &&
          !!productPrice &&
          !!productStock &&
          !!productColors &&
          !!productSizes &&
          !!productImages;

        if (areFieldsValid) {
          if (productStock < 0) {
            errorArr.push({
              row: i,
              message: 'Product Stock cannot be negative',
            });
          } else if (productPrice < 0) {
            errorArr.push({
              row: i,
              message: 'Product Price cannot be negative',
            });
          } else {
            writeData.push({
              insertOne: {
                document: {
                  title: productName,
                  description: productDescription,
                  price: productPrice,
                  stock: productStock,
                  colour: productColors,
                  size: productSizes,
                  images: productImages,
                  thumbnail: productImages,
                  brand: 'xyz',
                  rating: 4.1
                },
              },
            });

            successfulUploads++;
          }
        }
        if (writeData.length === 2) {
          await Products.bulkWrite(writeData);
          writeData = [];
        }
      }

      if (writeData.length) {
        await Products.bulkWrite(writeData);
      }

      failedUploads = productsData?.length - successfulUploads;

      const bulkUploadResult = {
        errorArr,
        successfulUploads,
        failedUploads
      };

      return res.status(200).send({ bulkUploadResult });

    } else {
      throw new Error('Permission not granted');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
