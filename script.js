const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

client.on('connect', () => {
  console.log('Connected to HiveMQ broker');
  client.subscribe('attendance/response');
});

function markAttendance() {
  const studentId = document.getElementById('studentId').value;
  const payload = JSON.stringify({ studentId });
  client.publish('attendance/request', payload);
}

client.on('message', (topic, message) => {
  if (topic === 'attendance/response') {
    document.getElementById('response').innerText = message.toString();
  }
});
