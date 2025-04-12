const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'output-server',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'output-group' });

let latestOutput = '';

const fetchOutput = async() => {
  await consumer.connect();

  await consumer.subscribe({ topic: 'output-submissions', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { output } = JSON.parse(message.value.toString());
      console.log(output); // Now clean output like "✅ Passed"
      latestOutput = output;
    },
  });
}

const getLatestOutput = () => latestOutput;

module.exports = { fetchOutput, getLatestOutput };
