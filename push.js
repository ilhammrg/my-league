const webPush = require('web-push');

let PUBLIC_KEY = "BFXCX6pO_bpGnDPHRpkiplZ_Z4cIlhL8iATRl-h1eIcmanviJqc9f-hVw7LfHxSs46IjJOIOKGVPLWyrKOimdfA";
let PRIVATE_KEY = "ZoekMofAqgrwiRbUFnfwoQVL_zgF_ZXKrY6dz0H1ers";
let ENDPOINT_URL = "https://fcm.googleapis.com/fcm/send/fdW-6wkCh_w:APA91bHFMDFpPRtA4xyghJYw6_aKhvpvuZbZss3_fB32EgQ2Oz8_Pe-fsEgpLkGxzn2NrLBoheg6lIuhfTcimyR7XZvAWo7VDywuDDWaSExTZKpaL4X2oG77XG_1FEtu24hYZ2mxEZss";
let P256DH_KEY = "BCAVcA7tlvK6XxKNwo114YJaDddxjlRaN5G8zLjR8LD9Hpjb9co11PUGQ9qcMpMMEyHyh+nOu8LX7pGgnHW6xFg=";
let AUTH_KEY = "zf8/V7dkgLvkGdeJZ1Jx4g==";
let FCM_SENDER_ID = "687032362628";
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const vapidKeys = {
   "publicKey": PUBLIC_KEY,
   "privateKey": PRIVATE_KEY
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
);

const pushSubscription = {
   "endpoint": ENDPOINT_URL,
   "keys": {
       "p256dh": P256DH_KEY,
       "auth": AUTH_KEY
   }
};
 
const options = {
   gcmAPIKey: FCM_SENDER_ID,
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);