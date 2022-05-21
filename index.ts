import config from './config.json'
import TelegramBot from "node-telegram-bot-api"
import prepareMessage from "./helper_functions/PrepareMessage";
import DateAsString from "./helper_functions/DateAsString";
import outputMessageOnCommand from "./helper_functions/OutputMessageOnCommand";
import getMessageWithTime from "./helper_functions/GetMessageWithTime";

const token:string = config.token
const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

bot.on('message', async (msg) =>{
    //id пользователя
    const chatId = msg.chat.id
    try{


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
    console.log(msg.text)

    if(!/^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(msg.text) && msg.text[0] != '/'){
        await bot.sendMessage( chatId,"Ошибка! Не корректный ввод. Символы неизвестны - бот знает только русский язык!")
        return
    }

    //вывод сообщения по команде
    if(await outputMessageOnCommand(msg.text, chatId, bot)){
        return
    }
    //массив слов - сообщение, которое написали
    let words = await prepareMessage(msg.text, bot, chatId)
    if(words == undefined){
        return
    }
    //массив
    console.log(words)


    //получение сообщения и Времени в миллисекундах
    let messageWithTime =  await getMessageWithTime(chatId, bot, words, timeMessage, dateMessage)
    console.log(messageWithTime)
    if (messageWithTime != undefined){
        //расчет даты и времени в виде строки
        DateAsString(messageWithTime.millisecondsTime,dateMessage)
    }

} catch (e:any) {
    console.log({e})
}
finally {

}
})


