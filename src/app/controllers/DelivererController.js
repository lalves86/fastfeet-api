import * as Yup from 'yup';

import Deliverer from '../models/Deliverer';
import File from '../models/File';

class DelivererController {
  async index(req, res) {
    const deliverers = await Deliverer.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
    });

    return res.json(deliverers);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliverer = await Deliverer.findByPk(id, {
      attributes: ['name', 'email'],
    });

    if (!deliverer) {
      return res.status(404).json({ error: 'Deliverer not found' });
    }

    const { name, email } = deliverer;

    return res.json({
      id,
      name,
      email,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).josn({ error: 'Validation fails' });
    }

    const delivererExists = await Deliverer.findOne({
      where: { email: req.body.email },
    });

    if (delivererExists) {
      return res.status(400).json({ error: 'Deliverer already exists' });
    }

    const { id, name, email } = await Deliverer.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, avatar_id } = req.body;
    const { id } = req.params;

    const deliverer = await Deliverer.findByPk(id);

    if (!deliverer) {
      return res.status(404).json({ error: 'Deliverer not found' });
    }

    if (email && email !== deliverer.email) {
      const delivererExists = await Deliverer.findOne({
        where: { email },
      });

      if (delivererExists) {
        return res.status(400).json({ error: 'Deliverer already exists' });
      }
    }

    await deliverer.update({
      id,
      name,
      email,
      avatar_id,
    });

    return res.json({
      id,
      name: deliverer.name,
      email: deliverer.email,
      avatar_id: deliverer.avatar_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliverer = await Deliverer.findByPk(id, {
      attributes: ['name', 'email'],
    });

    if (!deliverer) {
      return res.status(404).json({ error: 'Deliverer not found' });
    }

    await Deliverer.destroy({
      where: { id },
    });

    const { name, email } = deliverer;

    return res.json({
      name,
      email,
      message: `Deliverer ${id} deleted`,
    });
  }
}

export default new DelivererController();
