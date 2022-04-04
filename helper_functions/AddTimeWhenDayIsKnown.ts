import {DateAsString} from './DateAsString'
import ConvertTime from '../ConvertTime'
import TelegramBot from "node-telegram-bot-api";
const convertTime = new ConvertTime()

//функция добавления времени, когда известен день
async function addTimeWhenDayIsKnown(bot:TelegramBot, chatId:number,date:Date,array:Array<string>,secondKeywordInMessage:number,millisecondsTime:number,messageFuture:string){
    if (array.includes('в') == true || array.includes('во') == true){
        if(array.includes('во') == true){
            array.splice(array.indexOf('во'),1,'в')
        }
        secondKeywordInMessage = array.indexOf('в')
        if(millisecondsTime >= 86400000 && convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage+2],1) < 86400000){
            const futureDate = new Date (Date.parse(date.toString()) + millisecondsTime)
            futureDate.setHours(0,0,0,0)
            if(/^[0-9]*$/.test(array[secondKeywordInMessage + 1])){ //только цифры
                let timeAfterSecondKeyword = parseInt(array[secondKeywordInMessage+1]) //время с типом число
                if(timeAfterSecondKeyword == 0){
                    timeAfterSecondKeyword = 24
                }
                if(convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage+2],timeAfterSecondKeyword) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                    await bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                }
                else if (timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage+2],1) >= 3600000){
                    await bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                }
                else {
                    messageFuture = array.slice((secondKeywordInMessage+3),array.length).join(' ')//сообщение, которое напоминаем
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date.getHours(),futureDate.getHours(),timeAfterSecondKeyword,array, secondKeywordInMessage+2)
                    setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    DateAsString(millisecondsTime,date)
                }
            }
            else if (/^[А-яЁё]*$/.test(array[secondKeywordInMessage + 1])) {// только буквы
                if( convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage+1],1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage+2],1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage+3],1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage+4],1) == 0){
                    await bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                }
                else {
                    let timeAfterSecondKeyword :number =  convertTime.ConvertLargeNumberFromStringToNumber(array[secondKeywordInMessage+1], array[secondKeywordInMessage+2])
                    let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(timeAfterSecondKeyword,date.getTime(),futureDate.getTime(),array,secondKeywordInMessage+1,secondKeywordInMessage+2,secondKeywordInMessage+3,secondKeywordInMessage+4)
                    messageFuture = objTime.message

                    millisecondsTime = objTime.millisecondsTime
                    setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    DateAsString(millisecondsTime,date)
                }
            }
            else {
                await bot.sendMessage(chatId, 'Ошибка! Некорректно введено время');
            }
        }
        else {
            await bot.sendMessage(chatId,'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
        }
    }
    else {
        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
        DateAsString(millisecondsTime,date)
    }
}

export default addTimeWhenDayIsKnown