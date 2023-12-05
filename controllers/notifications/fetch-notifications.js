import Notifications from "../../models/notifications";

const FetchNotifications = async (req, res) => {
  const { userID } = req.body;
  try {
    const notifications = await Notifications.find({
      userID,
      isRead: false
    });

    if (!notifications || notifications.length === 0) {
      return res.status(401).json({ msg: 'No notifications found' });
    }
    else {
      res.status(201).send(notifications);
    }
  } catch (err) {
    res.status(500).json({ msg: 'Internal server error', err });
  }
};

export default FetchNotifications;
