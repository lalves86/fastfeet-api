import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    // Enviar e-mail ao usuário com notificação de entrega
    await Mail.sendMail({
      to: `${data.order.deliverer.name} <${data.order.deliverer.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation',
      context: {
        deliverer: data.order.deliverer.name,
        recipient: data.order.recipient.name,
        product: data.order.product,
      },
    });
  }
}

export default new CancellationMail();
