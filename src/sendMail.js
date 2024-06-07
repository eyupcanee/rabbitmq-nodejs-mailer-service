const publishMessage = require("./emailPublisher");

const routingKey = "email.info";

const testMessage = {
  to: "example@gmail.com",
  subject: "RabbitMQ, Nodemailer Test",
  text: "Testing...",
};

publishMessage(routingKey, testMessage);
