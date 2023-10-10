const router = require('express').Router();
const CronNotifications = require("../controllers/cron_apis/cron_notifications.js");

router.get('/sendDailyNotificationForPurification',CronNotifications.sendDailyNotificationForPurification);
router.get('/getNotificationList',CronNotifications.getNotificationList);
router.get('/updateReadData',CronNotifications.updateUserInfo);
router.get('/updateReadDataTest',CronNotifications.updateReadDataTest);
router.get('/updateReadDataTest',CronNotifications.updateReadDataTest);
router.get('/updateTodoTest',CronNotifications.todoNotification)
// router.put('/updateUserQuranData',CronNotifications.updateUserQuranData);



module.exports = router;