const flightObserver = require('./flightObserver');
const LoggerObserver = require('./loggerObserver');
const NotificationObserver = require('./notificationObserver');

flightObserver.subscribe(new LoggerObserver());
flightObserver.subscribe(new NotificationObserver());
