"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var token = '2090927002:AAGLOKpbLKvMqoveWeGzdRqI3ttDK0-Qcms';
var bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot;
bot.on('message', function (msg) {
    var _a;
    var chatId = msg.chat.id; //id
    var words = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.split(" "); //разбиение на элементы массива, "пробел"
    console.log(words); //массив
    var i;
    //if (words != undefined){
    // for(i = 0, i < words?.length, i++){}
    //  }
    var a = words === null || words === void 0 ? void 0 : words.indexOf('через'); //поиск в массиве (индекс)
    var b = words === null || words === void 0 ? void 0 : words.indexOf('напомни'); //поиск в массиве (индекс)
    function sayHi(textMessage) {
        bot.sendMessage(chatId, textMessage);
    }
    if (a != undefined && words != undefined) {
        console.log(a + 1); //индекс слова в массиве
        console.log(words[a + 1]); //время
        var min = parseInt(words[a + 1]);
        console.log(min); //время
        console.log(min * 1000 * 60);
        var newArray = words.slice((a + 3), words.length);
        console.log(newArray);
        var messageFuture = newArray.join(' ');
        console.log(messageFuture);
        setTimeout(sayHi, min * 1000 * 60, messageFuture);
    }
    bot.sendMessage(chatId, 'Привет');
});
//# sourceMappingURL=index.js.map