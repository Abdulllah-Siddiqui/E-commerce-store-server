import Address from '../../models/address';

const AddAddress = async (req, res) => {
    try {
      const {
        userID,
        userName,
        userContact,
        userCountry,
        userProvince,
        userCity,
        userAddress,
        isDefault,
      } = req.body;
  
      const newAddress = new Address({
        userID,
        userName,
        userContact,
        userCountry,
        userProvince,
        userCity,
        userAddress,
        isDefault
      });
      const savedAddress = await newAddress.save();
      res.status(201).json(savedAddress);
    } catch {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export default AddAddress;