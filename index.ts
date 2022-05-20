import config from './config.json'
import TelegramBot from "node-telegram-bot-api"
import FutureTimeAndMessage from './FutureTimeAndMessage'
import prepareMessage from "./helper_functions/PrepareMessage";
import MessageToSend from "./MessageToSend";
import DateAsString from "./helper_functions/DateAsString";
import outputMessageOnCommand from "./helper_functions/OutputMessageOnCommand";
import getMessageWithTime from "./helper_functions/GetMessageWithTime";


const token:string = config.token
const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

bot.on('message', async (msg) =>{
    //id пользователя
    const chatId = msg.chat.id
    //дата отправки сообщения в сек
    const timeMessage = msg.date*1000
    //дата отправки сообщения - объект Date
    const dateMessage = new Date(timeMessage)
    //дата и время, когда отправили сообщение, которое напомнить в виде строки
    console.log('дата сообщения',dateMessage.toString())

    //проверка на пустоту ввода
    if(!msg.text){
        console.log('index.js')
        await bot.sendMessage( chatId,"Ошибка! Ожидается текст. Бот работает только с текстом!")
        return
    }
    //вывод сообщения по команде
    if(await outputMessageOnCommand(msg.text, chatId, bot) == true){
        return
    }
    //массив слов - сообщение, которое написали
    let words = await prepareMessage(msg.text, bot, chatId)
    if(words == undefined){
        return
    }
    //массив
    console.log(words)

    let messageWithTime = await getMessageWithTime(chatId, bot, words, timeMessage, dateMessage)
    console.log(messageWithTime)
    if (messageWithTime != undefined){
        //расчет даты и времени в виде строки
        DateAsString(messageWithTime.millisecondsTime,dateMessage)
    }

})


