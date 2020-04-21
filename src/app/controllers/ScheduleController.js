import Order from '../models/Order';
import Deliverer from '../models/Deliverer';
import Recipient from '../models/Recipient';
import File from '../models/File';

class ScheduleController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const isDeliverer = await Deliverer.findByPk(id);
    if (!isDeliverer)
      return res.status(400).json({ error: 'Deliverer id not found' });

    const orders = await Order.findAll({
      where: { deliverer_id: id, canceled_at: null, end_date: null },
      order: ['createdAt'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'product', 'start_date', 'end_date', 'created_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip',
          ],
        },
        {
          model: Deliverer,
          as: 'deliverer',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!orders[0])
      return res.json({ message: 'Looks like you do not have any delivery' });

    return res.json(orders);
  }
}

export default new ScheduleController();
