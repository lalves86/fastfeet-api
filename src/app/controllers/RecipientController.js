import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
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
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      attributes: [
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip',
      ],
    });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    return res.json({
      id,
      recipient,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.number(),
      state: Yup.string()
        .length(2)
        .required(),
      city: Yup.string().required(),
      zip: Yup.number()
        .length(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).josn({ error: 'Validation fails' });
    }

    const userExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.number(),
      state: Yup.string().length(2),
      city: Yup.string(),
      zip: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).josn({ error: 'Validation fails' });
    }

    const { name, street, number, complement, state, city, zip } = req.body;
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    if (name && name !== recipient.name) {
      const recipientExists = await Recipient.findOne({
        where: { name },
      });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    await recipient.update({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    });

    return res.json({ id, name, street, number, complement, state, city, zip });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
      attributes: [
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip',
      ],
    });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    await Recipient.destroy({
      where: { id },
    });

    const { name, street, number, complement, state, city, zip } = recipient;

    return res.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
      message: `User ${id} deleted`,
    });
  }
}

export default new RecipientController();
