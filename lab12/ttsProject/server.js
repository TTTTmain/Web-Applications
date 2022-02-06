const express = require('express');
const { Socket } = require('socket.io-client');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const port = 8080;
const textToSpeech = require("@google-cloud/text-to-speech");
let tttsClient = new textToSpeech.TextToSpeechClient();
const fs = require('fs');

const projectId = 'fit2095project-324903'
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({projectId});

app.use(express.static(path.join(__dirname,'dist/ttsProject')))
app.use(express.static(path.join(__dirname)));

io.on('connection',(socket)=>{
    console.log(`New connection from client ${socket.id}`);

    socket.on('send-text',(data)=>{
        translate.translate(data.userInput,data.translateCode).then((result)=>{
            console.log(result);
            let translateObject = {
                input:{text:result[0]},
                voice: { languageCode: data.langToTran, ssmlGender: "NEUTRAL" },
                audioConfig: { audioEncoding: "MP3" }
            }

            //Make audio
            tttsClient.synthesizeSpeech(translateObject,(err,res)=>{
                if(err){ 
                    console.log(err) 
                    return
                }

                fs.writeFile(`${socket.id}.mp3`,res.audioContent,"binary",(err)=>{
                    if(err){ 
                        console.log(err) 
                        return
                    }
                    console.log(`Audio out for socket ${socket.id}`)
                    //Send audio to client
                    io.to(socket.id).emit('new-audio',{audioPath:`${socket.id}.mp3`,translatedText:result[0]})
                });
            });
            tttsClient = new textToSpeech.TextToSpeechClient();
        })
    });

    socket.on('send-text2',(data)=>{
        translate.translate(data.userInput,data.translateCode).then((result)=>{
            console.log(result);
            let translateObject = {
                input:{text:result[0]},
                voice: { languageCode: data.langToTran, ssmlGender: "NEUTRAL" },
                audioConfig: { audioEncoding: "MP3" }
            }

            //Make audio
            tttsClient.synthesizeSpeech(translateObject,(err,res)=>{
                if(err){ 
                    console.log(err) 
                    return
                }

                fs.writeFile(`${socket.id}_2.mp3`,res.audioContent,"binary",(err)=>{
                    if(err){ 
                        console.log(err) 
                        return
                    }
                    console.log(`Audio out for socket ${socket.id}_2`)
                    //Send audio to client
                    io.to(socket.id).emit('new-audio2',{audioPath:`${socket.id}_2.mp3`,translatedText:result[0]})
                });
            });
            tttsClient = new textToSpeech.TextToSpeechClient();
        })
    });
});

server.listen(port,()=>{
    console.log(`Server is running at http://127.0.0.1:${port}`);
});