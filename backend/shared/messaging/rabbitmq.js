import amqplib from 'amqplib';

let connection = null;
let channel = null;

const getRabbitMQChannel = async () => {
  if (channel) return channel;
  connection = await amqplib.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  channel = await connection.createChannel();
  return channel;
};

export default getRabbitMQChannel;
