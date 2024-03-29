import MessageToSend from "../MessageToSend";
import FutureTimeAndMessage from "../FutureTimeAndMessage";
import TelegramBot from "node-telegram-bot-api";
import searchForTheNameOfTheMonth from "./SearchForTheNameOfTheMonth";

//функция - Получение сообщения и Времени в миллисекундах
async function getMessageWithTime(chatId:number, bot:TelegramBot,words:Array<string>,timeMessage:number,dateMessage:Date){
    console.log('getMessageWithTime')

    //номер ключевого слова в сообщении (в массиве слов)
    let numberKeywordInMessage:number
    //миллисекунды и сообщение
    let millisecondsAndMessage:MessageToSend
    //будущее время и сообщение, которое напоминаем
    let futureTimeAndMessage = new FutureTimeAndMessage(chatId,words,dateMessage)

    if(words.includes(searchForTheNameOfTheMonth(words))){
        //номер ключевого слова в сообщении (в массиве слов)
        numberKeywordInMessage = words.indexOf(searchForTheNameOfTheMonth(words)) // индекс ключевого слова в массиве
        try {
            //миллисекунды и сообщение
            millisecondsAndMessage = futureTimeAndMessage.CalculationsAndErrorHandlingWhenEnteringMonthInWords(numberKeywordInMessage, timeMessage)
            return millisecondsAndMessage
        } catch (e:any) {
            await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
        }
    }
    //проверка - если есть ключевое слово "Через"
    else if (words.includes('через') == true){
        //номер ключевого слова в сообщении (в массиве слов)
        numberKeywordInMessage = words.indexOf('через') // индекс ключевого слова в массиве
        try {
            //миллисекунды и сообщение
            millisecondsAndMessage = futureTimeAndMessage.CalculationsAndHandlingErrorsOnInputThrough(numberKeywordInMessage, timeMessage)
            return millisecondsAndMessage
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
            return millisecondsAndMessage
        } catch (e:any) {
            await bot.sendMessage(chatId,e.message,{parse_mode: 'HTML'})
        }
    }

    else {
        await bot.sendMessage(chatId,'Ошибка! Не корректный ввод. Напомнить возможно ЧЕРЕЗ какое-то время или В какое-то время. Возможна опечатка');
    }
}
export default getMessageWithTime