const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'output-server',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const outputController = async(data) => {
  await producer.connect();

  const output = data.toString(); // Convert Buffer to string

  await producer.send({
    topic: 'output-submissions',
    messages: [{
      value: JSON.stringify({ output }), // Wrap as JSON
    }],
  });

  console.log(output);

  await producer.disconnect();
}

module.exports = { outputController };
