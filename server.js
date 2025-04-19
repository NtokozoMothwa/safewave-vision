socket.on('trigger:incident', ({ type, message }) => {
  if (type === 'responder') {
    io.emit('incident:responder', message);
  }
  if (type === 'guard') {
    io.emit('incident:guard', message);
  }
  if (type === 'admin') {
    io.emit('admin:log', message);
  }
});
