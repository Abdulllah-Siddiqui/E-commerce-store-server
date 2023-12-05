import express from 'express';
import { FetchNotifications, MarkAsRead } from '../controllers/notifications'

const notificationRoutes = express.Router();

notificationRoutes.post('/fetchNotifications', FetchNotifications);
notificationRoutes.post('/markAsRead', MarkAsRead);

export default notificationRoutes;
