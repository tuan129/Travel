class LoggerObserver {
  update(action, flight) {
    console.log(`[Logger] Flight ${action}:`, flight);
  }
}

module.exports = LoggerObserver;
