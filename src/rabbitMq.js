const amqp = require("amqplib");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;

async function createConnection() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: true });
  return { connection, channel };
}

module.exports = {
  createConnection,
  EXCHANGE_NAME,
};
