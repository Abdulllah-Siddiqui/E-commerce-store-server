import Address from '../../models/address';

const GetAddress = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ msg: 'userID is required' });
    }
    const address = await Address.find({ userID });

    if (!address) {
      return res.status(404).json({ msg: 'Address not found for the specified userID' });
    }
    res.status(200).json(address);
  } catch {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export default GetAddress;
