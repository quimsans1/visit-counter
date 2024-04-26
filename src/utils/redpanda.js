'use server'

import { Kafka } from 'kafkajs'

const redpanda = new Kafka({
  brokers: ['cojmnv7b4g10p5c9adq0.any.eu-central-1.mpx.prd.cloud.redpanda.com:9092'],
  ssl: {},
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'demo-user',
    password: 'VbRjsnuslYy3Q5Q7I4Bv1kHt224grO',
  },
})
const producer = redpanda.producer()

export async function connect() {
  try {
    await producer.connect()
    console.log('Connected to Redpanda')
  } catch (error) {
    console.error('Could not connect to Redpanda:', error)
  }
}

export async function disconnect() {
  try {
    await producer.disconnect()
    console.log('Disconnected from Redpanda')
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function sendMessage(message) {
  try {
    await producer.send({
      topic: 'visit-counter',
      messages: [{ value: JSON.stringify(message) }],
    })
  } catch (error) {
    console.log('Error:', error)
  }
}
