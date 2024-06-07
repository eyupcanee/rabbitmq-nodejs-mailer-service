const { createConnection, EXCHANGE_NAME } = require("./rabbitMq");

async function publishMessage(routingKey, message) {
  const { connection, channel } = await createConnection();
  await channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(message))
  );
  console.log("Message sent.");
  await channel.close();
  await connection.close();
}

module.exports = {
  publishMessage,
};
