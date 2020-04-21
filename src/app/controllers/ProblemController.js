import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class ProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name'],
            },
            {
              model: Deliverer,
              as: 'deliverer',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    return res.json(problems);
  }

  async show(req, res) {
    const delivery_id = req.params.orderId;

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id },
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['id', 'product', 'created_at'],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name'],
            },
            {
              model: Deliverer,
              as: 'deliverer',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const delivery_id = req.params.orderId;
    const { description } = req.body;

    const problem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const delivery_id = req.params.orderId;

    const order = await Order.findOne({
      where: { id: delivery_id },
      attributes: ['id', 'product', 'canceled_at'],
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
      ],
    });

    order.canceled_at = new Date();

    await order.save();

    // Notificar usuário que um novo pedido foi atribuído a ele

    await Notification.create({
      content: `A entrega do produto ${order.product} foi cancelada!`,
      user: order.deliverer.id,
    });

    await Queue.add(CancellationMail.key, {
      order,
    });

    return res.json(order);
  }
}

export default new ProblemController();
