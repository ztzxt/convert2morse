const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const latinToMorse = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ' ': '/',
};
const morseToLatin = {};
for (let i in latinToMorse) {
    morseToLatin[latinToMorse[i]] = i;
}
morseToLatin[' '] = "/";
function latinConverter(latin){
    latin = latin.trim();
    if(latin.charAt(0) == " ") latin = latin.slice(1, until);
    let printMorse = latinToMorse[latin.charAt(0)];
    for (let i = 1; i < latin.length; i++) {
        printMorse = printMorse + ' ' +latinToMorse[latin.charAt(i)];
    }
    return printMorse;
}

function morseConverter(morse){
    let printLatin = '';
    morse=morse.trim();
    if(morse.charAt(0) == " " || morse.length == 0) morse = '/';
    let inputMorseArr = morse.split(" ");
    for (let i = 0; i < inputMorseArr.length; i++){
        printLatin = printLatin + morseToLatin[inputMorseArr[i]];
    }
    return printLatin;
}
app.get('/morse2latin.html', (req, res) => res.sendFile(__dirname + '/morse2latin.html'));
app.get('/tmp.txt', (req, res) => Response.sendFile(__dirname + '/tmp.txt'));
app.use('/style-vue', express.static(__dirname + '/style-vue'));
app.use('/', (req, res) => res.sendFile(__dirname + '/index.html'));
io.on('connection', function(socket){
    let IP = socket.request.connection.remoteAddress;  
    console.log(IP + ' connected');
    socket.on('disconnect', function(){
        console.log(IP + ' disconnected');
    });
    socket.on('morse', function(morse) {
        socket.emit('latin', morseConverter(morse));
    });
    socket.on('latin', function(latin){
        latin = latin.toUpperCase();
        socket.emit('morse', latinConverter(latin));
    });
    socket.on('previous', function(previous){
        console.log(previous);
        socket.emit('previous', previous);
    });
});

http.listen(8080);