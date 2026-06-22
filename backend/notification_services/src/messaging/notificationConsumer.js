import { getRabbitMQChannel } from '../../../shared/messaging/rabbitmq.js';
import { createNotification } from '../services/notificationServices.js'; // Panggil Service

const QUEUE_NAME = 'notification.queue';
const EXCHANGE_NAME = 'ex.notifications';
const ROUTING_KEY = 'claim.created';

const startNotificationConsumer = async () => {
  const channel = await getRabbitMQChannel();

  await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

  console.log(`[RabbitMQ] Notification Service listening on: ${QUEUE_NAME}`);

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg !== null) {
      try {
        const payload = JSON.parse(msg.content.toString());

        // Oper data ke Layer Service
        await createNotification(payload);

        channel.ack(msg); // Sukses, hapus pesan dari antrean
      } catch (error) {
        console.error('[RabbitMQ Consumer Error]:', error);
        channel.nack(msg); // Gagal, kembalikan pesan
      }
    }
  });
};

export default startNotificationConsumer;
