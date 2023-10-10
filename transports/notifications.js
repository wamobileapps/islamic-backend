var admin = require("firebase-admin");
var serviceAccount = require("./../mulsimapp-firebase-adminsdk-41tpf-77fa9aca67.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


exports.sendNotification = (title,token,body) => {
    // var title="my title";
    // var token="do0-SWNZT-yo98tMVWFq2K:APA91bGCU0pgtfziOExX9_fYWenVI8fBsLEty8dQRuotZx6v-TQKyjspMOOlLd7yh9Ri3mqIoICME99w9R8I7iGgVtxK9cqWV-p3trZewO74v-sukClq9GNKL2ggdf4c2np8lxEBmz4h";
    // var body="heyyy";
    // console.log(title,token,body);

    console.log("sending notification")
    admin.messaging().send({
        token: token,
        data: {
            customData: title,
            id: "1",
            ad: "Developer",
            subTitle: body
        },
        android: {
            notification: {
                body: body,
                title: title,
                color: "#fff566",
                priority: "high",
                sound: "default",
                vibrateTimingsMillis: [200, 500, 800],
                
                imageUrl: "https://images.unsplash.com/photo-1516475429286-465d815a0df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            },
            data: {
                alarm: "true",
            }
        }
    }).then((msg) => {
        console.log(msg,'msg,msg')
    })
}


