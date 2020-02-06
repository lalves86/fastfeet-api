import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Order from '../models/Order';
import Deliverer from '../models/Deliverer';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Notification from '../schemas/Notification';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      where: { canceled_at: null, end_date: null },
      order: ['createdAt'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'product'],
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

    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
      attributes: ['id', 'product'],
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

    if (!order) return res.json({ message: 'Delivery id not found' });

    return res.json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliverer_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      recipient_id,
      deliverer_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = req.body;

    const isDeliverer = await Deliverer.findByPk(deliverer_id);
    if (!isDeliverer)
      return res.status(400).json({ error: 'Deliverer id not found' });

    const isRecipient = await Recipient.findByPk(recipient_id);

    if (!isRecipient)
      return res.status(400).json({ error: 'Recipient id not found' });

    const hourStart = startOfHour(parseISO(start_date));
    const hourEnd = startOfHour(parseISO(end_date));

    const order = await Order.create({
      recipient_id,
      deliverer_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });

    // Notificar usuário que um novo pedido foi atribuído a ele

    await Notification.create({
      content: `Nova encomenda! O produto ${product} foi atribuído a você e está disponível para retirada!`,
      user: deliverer_id,
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliverer_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const {
      recipient_id,
      deliverer_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = req.body;

    const order = await Order.findByPk(id);

    if (deliverer_id) {
      const isDeliverer = await Deliverer.findByPk(deliverer_id);

      if (!isDeliverer)
        return res.status(400).json({ error: 'Deliverer id not found' });
    }

    if (recipient_id) {
      const isRecipient = await Recipient.findByPk(recipient_id);

      if (!isRecipient)
        return res.status(400).json({ error: 'Recipient id not found' });
    }

    await order.update({
      recipient_id,
      deliverer_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });

    return res.json(order);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    order.destroy();

    return res.json(order);
  }
}

export default new OrderController();
