import config from './config.json'
import TelegramBot from "node-telegram-bot-api"
import FutureTimeAndMessage from './FutureTimeAndMessage'
import prepareMessage from "./helper_functions/PrepareMessage";
import MessageToSend from "./MessageToSend";
import DateAsString from "./helper_functions/DateAsString";
import ConvertTime from './ConvertTime'
import outputMessageOnCommand from "./helper_functions/OutputMessageOnCommand";
const convertTime = new ConvertTime()

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
    let words = prepareMessage(msg.text)

    //проход по массиву слов в сообщении
    for (let i= 0; i<words.length;i++){
        //проверка на одинаковый ввод слова подряд
        if(convertTime.ConvertTimeToMilliseconds(words[i],1) != 0 && convertTime.ConvertTimeToMilliseconds(words[i+1],1) != 0){
            console.log('index.js')
            return await bot.sendMessage(chatId,'Ошибка! Подряд несколько раз указана единица времени')
        }
    }
    //массив
    console.log(words)

    //номер ключевого слова в сообщении (в массиве слов)
    let numberKeywordInMessage:number
    //миллисекунды и сообщение
    let millisecondsAndMessage:MessageToSend
    //будущее время и сообщение, которое напоминаем
    let futureTimeAndMessage = new FutureTimeAndMessage(chatId,words,dateMessage)

    //проверка - если есть ключевое слово "Через"
    if (words.includes('через') == true){
        //номер ключевого слова в сообщении (в массиве слов)
        numberKeywordInMessage = words.indexOf('через') // индекс ключевого слова в массиве
        try {
            //миллисекунды и сообщение
            millisecondsAndMessage = futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputThrough(numberKeywordInMessage, timeMessage)
            console.log(millisecondsAndMessage)
            //расчет даты и времени в виде строки
            DateAsString(millisecondsAndMessage.millisecondsTime,dateMessage)
        } catch (e:any) {
           await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
        }
    }
    //проверка - если есть ключевое слово "В" или "Во"
    else if(words.includes('в') == true || words.includes('во') == true){
        //если Во - меняем на В
        if(words.includes('во') == true){
            words.splice(words.indexOf('во'),1,'в')
        }
        //номер ключевого слова в сообщении (в массиве слов)
        numberKeywordInMessage = words.indexOf('в') //индекс ключевого слова в массиве
        try {
            //миллисекунды и сообщение
            millisecondsAndMessage = futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputTo( numberKeywordInMessage, timeMessage)
            console.log(millisecondsAndMessage)
            //расчет даты и времени в виде строки
            DateAsString(millisecondsAndMessage.millisecondsTime,dateMessage)
        } catch (e:any) {
            await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
        }
    }
    else {
        console.log('index.js')
        await bot.sendMessage(chatId,'Ошибка! Не корректный ввод. Символы неизвестны!');
    }
})


