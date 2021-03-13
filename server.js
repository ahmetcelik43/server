const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//AIzaSyAm5-b8unXmYcXelxm8j7X2csln6trDwME
const webPush = require("web-push");
const vapidKeys = webPush.generateVAPIDKeys();
console.log(vapidKeys);

const vapidKeys =
{
  publicKey: 'BIBMFSOF20Osx84Suo3oI5a1XBiqd1rsc7B4923bJWVZaJ7Qsdewy1pGqZX9uu_UXtRzXxoR6g105PExKYPvUKQ',
  privateKey: 'cXyLDw4gS6aPcsTcFY7rTdiElW4sZqAd4D9tBd7VIwU'
}
webPush.setGCMAPIKey('AIzaSyAm5-b8unXmYcXelxm8j7X2csln6trDwME');

webPush.setVapidDetails("mailto:ahmet.celik5443@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

const PORT = process.env.PORT || 80;

app.post("/send_notification", (req, res) => {
    if (req.body.clientsID && req.body.yazi) {
     
        req.body.clientsID.forEach(function(id){
            let id_= JSON.parse(id);
            webPush.sendNotification(id_,req.body.yazi[0].baslik)
           
        })

      return res.status(201).send({
        message: "Bildirimler gönderildi..",
      });
    } else {
      return res.status(400).send({ message: "Eksik bilgi gönderildi..." });
    }
  });
  app.get("/", (req, res) => {
   res.status(200).send("OK");
  });
  app.listen(PORT, () => {
    console.log("Sunucu Başarılı bir şekilde çalışıyor...");
  });
  
  /*
  {"endpoint":"https://fcm.googleapis.com/fcm/send/czmAx9qMoQE:APA91bGfMbCuWKFWDzMQ8skn76jxJptSrmN3w7M8gF7wR5NGX2ZBzZVR_buyXnWGCKFGEKJ_4Vp-YkDg6TJWG2Ir8U0MeNls997-PPMEb8GnxpZcoXmTXgY91YYDO2zNteGpI3gs5iwO","expirationTime":null,"keys":{"p256dh":"BJ6CnGvYd0p4tOcNCR22ytEaWkLaqZXFmHo9bycAwVb_iCkKA5-dYUxDpM1-IUMhJrgdfExtVgz6zEK1BgvCqqg","auth":"Alu9hVnh1dg6ePXdsd-8Uw"}}*/ 
