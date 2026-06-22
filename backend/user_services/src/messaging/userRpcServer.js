import { getRabbitMQChannel } from '../../../shared/messaging/rabbitmq.js';
import userRepositories from '../repositories/userRepositories.js';

const QUEUE = 'user.verify';

const startUserRpcServer = async () => {
  const channel = await getRabbitMQChannel();
  await channel.assertQueue(QUEUE, { durable: false });
  channel.prefetch(1);

  console.log(`[RabbitMQ] user_services listening on queue: ${QUEUE}`);

  channel.consume(QUEUE, async (msg) => {
    const { userId } = JSON.parse(msg.content.toString());
    const user = await userRepositories.findUserById(userId);

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(
        JSON.stringify({
          exists: !!user,
          user: user ?? null, // ← tambahkan ini
        }),
      ),
      { correlationId: msg.properties.correlationId },
    );

    channel.ack(msg);
  });
};

export default startUserRpcServer;
