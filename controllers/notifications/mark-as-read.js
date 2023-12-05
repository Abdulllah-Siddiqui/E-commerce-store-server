import Notifications from "../../models/notifications";

const MarkAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const filter = { _id: notificationId }

    await Notifications.updateOne(filter, { $set: { isRead: true } });
    res.status(200);
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};
export default MarkAsRead;
