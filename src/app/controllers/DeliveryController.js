import { Op } from 'sequelize';

import Order from '../models/Order';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';

class DeliveryController {
  async index(req, res) {
    const { delivererId } = req.params;
    const { page } = req.query;

    const deliveries = await Order.findAll({
      where: {
        deliverer_id: delivererId,
        end_date: { [Op.ne]: null },
      },
      order: ['end_date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Deliverer,
          as: 'deliverer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const { delivererId, orderId } = req.params;
    const { start, end, signature_id } = req.body;

    const delivery = await Order.findByPk(orderId);

    if (!delivery) return res.status(400).json({ error: 'Order id not found' });

    if (parseInt(delivererId, 10) !== delivery.deliverer_id)
      return res.status(401).json({
        error: 'You can only change the status of your own deliveries',
      });

    if (!delivery.start_date && end)
      return res
        .status(403)
        .json({ error: 'Cannot end a task before starting' });

    const signatureExists = await File.findByPk(signature_id);

    if (!signatureExists)
      return res.status(400).json({ error: 'Signature id not found' });

    if (start) {
      const start_date = new Date();
      await delivery.update({
        start_date,
      });
    }

    if (end) {
      const end_date = new Date();
      await delivery.update({
        end_date,
        signature_id,
      });
    }

    return res.json(delivery);
  }
}

export default new DeliveryController();
