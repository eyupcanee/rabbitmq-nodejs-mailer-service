const { createConnection, EXCHANGE_NAME } = require("./rabbitMq");
const { sendMail } = require("./emailService");

async function emailConsume() {
  const { connection, channel } = await createConnection();
  const queue = "email_queue";
  const routingKey = "email.*";

  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, EXCHANGE_NAME, routingKey);

  console.log("Waiting for email messages...");

  channel.consume(queue, async (message) => {
    if (message !== null) {
      const messageContent = JSON.parse(message.content.toString());
      const { to, subject, text } = messageContent;
      const res = await sendMail(to, subject, text);
      if (res) channel.ack(message);
    }
  });
}

emailConsume();
