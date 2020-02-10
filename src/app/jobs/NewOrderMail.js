import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    // Enviar e-mail ao usuário com notificação de entrega
    await Mail.sendMail({
      to: `${data.deliverer.name} <${data.deliverer.email}>`,
      subject: 'Novo pedido para retirada',
      template: 'newOrder',
      context: {
        deliverer: data.deliverer.name,
        recipientName: data.recipient.name,
        street: data.recipient.street,
        number: data.recipient.number,
        complement: data.recipient.complement,
        city: data.recipient.city,
        state: data.recipient.state,
        zip: data.recipient.zip,
        product: data.order.product,
      },
    });
  }
}

export default new NewOrderMail();
