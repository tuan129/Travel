class NotificationObserver {
  update(action) {
    console.log(`[Notification] Có thay đổi về chuyến bay: ${action}`);
  }
}

module.exports = NotificationObserver;
