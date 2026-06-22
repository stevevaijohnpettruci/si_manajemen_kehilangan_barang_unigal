import amqplib from 'amqplib';

let connection = null;
let channel = null;

export const getRabbitMQChannel = async () => {
  if (channel) return channel;
  
  try {
    connection = await amqplib.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    console.log('[RabbitMQ] Client Connected Successfully');
    return channel;
  } catch (error) {
    console.error('[RabbitMQ] Connection Error:', error);
    throw error;
  }
};

export const publish = async (exchange, routingKey, data) => {
  const ch = await getRabbitMQChannel();
  
  await ch.assertExchange(exchange, 'direct', { durable: true });
  
  ch.publish(
    exchange,
    routingKey,
    Buffer.from(JSON.stringify(data)),
    { persistent: true }
  );
};


export default {
  getRabbitMQChannel,
  publish,
};