importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAGLut_qi52Y5eZcx8imtphVOu3j6V2bSo",
  authDomain: "temlin-b29c9.firebaseapp.com",
  projectId: "temlin-b29c9",
  storageBucket: "temlin-b29c9.appspot.com",
  messagingSenderId: "1048537949060",
  appId: "1:1048537949060:web:4ec45cad8c547c5641f3d1",
  measurementId: "G-6R9JMEM3MV"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


// for notifications recieved in background :
if(messaging) {
    messaging.onBackgroundMessage(function(payload) {

        console.log("Background notification:  " , payload);
      
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: 'https://firebasestorage.googleapis.com/v0/b/yes-4-web.appspot.com/o/pontonos%2Ficons%2Fandroid-chrome-192x192.png?alt=media&token=35616a6b-5e70-43a0-9284-d780793fa076'
        };

        self.clients.matchAll({includeUncontrolled: true}).then(function (clients) {
          clients.forEach(function(client) {
              client.postMessage({notification: {
                title: notificationTitle,
                body: payload.notification.body,
              },data: {
                title: payload.data.title
              }});
          })
        })
      
        self.registration.showNotification(notificationTitle,
        notificationOptions);
      });
}
// ---------------------------------------------