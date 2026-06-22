import { randomUUID } from 'crypto';
import { getRabbitMQChannel } from './rabbitmq.js';

const rpcRequest = async (queue, payload, timeout = 30000) => {
  const channel = await getRabbitMQChannel();
  const replyQueue = await channel.assertQueue('', { exclusive: true });
  const correlationId = randomUUID();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`RPC timeout: no response from ${queue}`));
    }, timeout);

    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          clearTimeout(timer);
          resolve(JSON.parse(msg.content.toString()));
        }
      },
      { noAck: true },
    );

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
};

export default rpcRequest;
