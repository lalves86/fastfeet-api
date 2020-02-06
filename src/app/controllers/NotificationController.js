import Notification from '../schemas/Notification';
import Deliverer from '../models/Deliverer';

class NotificationController {
  async index(req, res) {
    const { id } = req.params;

    const delivererExists = await Deliverer.findByPk(id);

    if (!delivererExists)
      return res.status(400).json({ error: 'Deliverer id not found' });

    const deliverer = await Notification.find({
      user: id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    if (!deliverer)
      return res
        .status(400)
        .json({ error: `${delivererExists.name} has no notifications` });

    return res.json(deliverer);
  }

  async update(req, res) {
    const { delivererId, notificationId } = req.params;

    const delivererExists = await Deliverer.findByPk(delivererId);

    if (!delivererExists)
      return res.status(400).json({ error: 'Deliverer id not found' });

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification)
      return res.status(400).json({ error: 'Notification id not found' });

    return res.json(notification);
  }
}

export default new NotificationController();
