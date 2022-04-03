import config from './config.json'
import  TelegramBot from "node-telegram-bot-api"


import ConvertTime from './ConvertTime'
import DayOfTheWeek from './DayOfTheWeek'
import {DateAsString} from './helper_functions/DateAsString'

import db from './db/index'

import addTime from './helper_functions/AddTimeWhenDayIsKnown'

const token:string = config.token

const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})
const convertTime = new ConvertTime()

//функция удаления пустых элементов из массива
function RemoveEmptyElementsFromArray(array:Array<string>){
    let output:Array<string> = array
    if(array?.includes(' ') == true){
        output = array?.filter(function (el) {
          return (el != "");
        });
    }
    return output
}

//дата в данную минуту
let date = new Date();
console.log(date.toString()) //день недели | дата | время

bot.on('message', async (msg) =>{

    const chatId = msg.chat.id //id пользователя
    const timeMessage = msg.date //дата в сек отправки сообщения, которое напоминаем
    console.log('дата сообщения',new Date(timeMessage*1000).toString())//дата и время, когда отправили сообщение, которое напомнить в виде строки
    let text = msg.text // сообщение пользователя
    if(!text){
        await bot.sendMessage( chatId,"нет сообщения")
        return
    }
    text = text.toLocaleLowerCase() // изменение регистра букв - на маленькие
    let words = text.split(" ") //разбиение на элементы массива, "пробел"

    words = RemoveEmptyElementsFromArray(words) // избавление в массиве от пустых элементов
    console.log(words) //массив


    let keywordInMessage:number //ключевое слово в сообщении
    let secondKeywordInMessage:number = 0 //ключевое слово в сообщении
    let millisecondsTime: number = 0 //миллисекунды - через сколько надо прислать сообщение
    let messageFuture: string //сообщение, которое напоминаем

    if (words.includes('через') == true){
        keywordInMessage = words?.indexOf('через') // индекс ключевого слова в массиве
        let arrayElementAfterKeyword1 = words[keywordInMessage+1] // элемент массива после ключевого слова - первый
        let arrayElementAfterKeyword2 = words[keywordInMessage+2] // элемент массива после ключевого слова - второй
        let arrayElementAfterKeyword3 = words[keywordInMessage+3] // элемент массива после ключевого слова - третий
        let arrayElementAfterKeyword4 = words[keywordInMessage+4] // элемент массива после ключевого слова - четвертый

        if(/^[0-9]*$/.test(arrayElementAfterKeyword1) == true){ // только цифры
            let time = parseInt(arrayElementAfterKeyword1) // время с типом число
            messageFuture = words.slice((keywordInMessage+3),words.length).join(' ') // сообщение, которое напоминаем
            millisecondsTime = convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,time)  //миллисекунды - через сколько надо прислать сообщение
            if(time == 0) { // если время указано цифрой 0
              await  bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
            }
            else if(millisecondsTime == 0) { // если такого времени нет и произошла ошибка и вернулся 0
               await bot.sendMessage(chatId, 'Ошибка! Отсутствует или некорректно указана единица времени');
            }
            else{
                await addTime(bot, chatId,date, words, secondKeywordInMessage,millisecondsTime,messageFuture) // функция добавления времени когда день известен

            }
        }
        else if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword1) == true){ // только буквы
           if(arrayElementAfterKeyword1 == 'ноль' || arrayElementAfterKeyword1 == 'нуль'){ // если время указано ноль/нуль
                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
           }
           else if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword1,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4,1) == 0){
                await bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
           }
           else{
                let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword1,arrayElementAfterKeyword2)
                let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time,timeMessage,timeMessage,words,keywordInMessage+1,keywordInMessage+2,keywordInMessage+3,keywordInMessage+4)
                messageFuture = objTime.message
                millisecondsTime = objTime.millisecondsTime
                await addTime(bot, chatId,date, words,secondKeywordInMessage,millisecondsTime,messageFuture)
           }
        }
        else {
           await bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
        }
    }
    else if(words.includes('в') == true || words.includes('во') == true){
        if(words.includes('во') == true){
            words.splice(words?.indexOf('во'),1,'в')
        }
        keywordInMessage = words?.indexOf('в') //индекс ключевого слова в массиве
        let arrayElementAfterKeyword1 = words[keywordInMessage+1] // элемент массива после ключевого слова - первый
        let arrayElementAfterKeyword2 = words[keywordInMessage+2] // элемент массива после ключевого слова - второй
        let arrayElementAfterKeyword3 = words[keywordInMessage+3] // элемент массива после ключевого слова - третий
        let arrayElementAfterKeyword4 = words[keywordInMessage+4] // элемент массива после ключевого слова - четвертый
        let arrayElementAfterKeyword5 = words[keywordInMessage+5] // элемент массива после ключевого слова - пятый
        let arrayElementAfterKeyword6 = words[keywordInMessage+6] // элемент массива после ключевого слова - шестой

        if(/^[0-9]*$/.test(arrayElementAfterKeyword1 ) == true) { // только цифры
            let time = parseInt(arrayElementAfterKeyword1) //время с типом число
            if(time == 0){
                time = 24
            }
            if(time > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,1) >= 3600000){
                bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
            }
            else if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
            }
            else if(!arrayElementAfterKeyword3){
                bot.sendMessage(chatId, 'Ошибка! Не указана дата');
            }
            else{
                if (/[А-яЁё]/.test(arrayElementAfterKeyword3) == true){ // только буквы
                    if((arrayElementAfterKeyword3) == "в" || (arrayElementAfterKeyword3) == "во"){
                        let dayOfTheWeek = new DayOfTheWeek(arrayElementAfterKeyword4)
                        if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
                            let  differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
                            let futureDay = date.getDate() + differenceInDays
                            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)

                            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,time)
                            const futureDateAndTime = new Date(futureMs)
                            millisecondsTime = futureDateAndTime.getTime() - date.getTime()
                            messageFuture = words.slice((keywordInMessage+5),words.length).join(' ')//сообщение, которое напоминаем
                            setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                            DateAsString(millisecondsTime,date)
                        }
                    }
                    else{
                        let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(arrayElementAfterKeyword3)
                        if((time < date.getHours()) && arrayElementAfterKeyword3 == 'сегодня'){
                            bot.sendMessage(chatId,'Ошибка! Время указано которое уже прошло - напомнить невозможно');
                        }
                        else if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3,1) >= 3600000){
                            bot.sendMessage(chatId, 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
                        }
                        else if(futureDay  == -1){
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Время указано, а дата нет.');
                        }
                        else{
                            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
                            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage,futureDate.getHours(),time,words,keywordInMessage+2)

                            messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем
                            setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                            DateAsString(millisecondsTime,date)
                        }
                    }
                }
                else if(/[А-яЁё]/.test(arrayElementAfterKeyword3) == false && (arrayElementAfterKeyword3.includes('.') == true ||
                    arrayElementAfterKeyword3.includes('-') == true || arrayElementAfterKeyword3.includes('/') == true )) {
                    if (words[keywordInMessage + 3][2] != words[keywordInMessage + 3][5] &&
                        (words[keywordInMessage + 3][2] != '.' || words[keywordInMessage + 3][2] != '-' ||  words[keywordInMessage + 3][2] != '/') &&
                        (words[keywordInMessage + 3][5] != '.' || words[keywordInMessage + 3][5] != '-' || words[keywordInMessage + 3][5] != '/') ||
                        (words[keywordInMessage + 3].length > 10) ||
                        (words[keywordInMessage + 3].length == 7) ||
                        (words[keywordInMessage + 3].length == 9)) {
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Опечатка в дате!');
                    }
                    else {
                        let yearMessage
                        if (words[keywordInMessage + 3].length == 10) {
                            yearMessage = parseInt(words[keywordInMessage + 3].substring(6, 12))
                        }
                        else if ((words[keywordInMessage + 3].length == 8) && (String(date.getFullYear()).slice(2, 4) <= words[keywordInMessage + 3].substring(6, 8))) {
                            yearMessage = parseInt(String(date.getFullYear()).slice(0, 2) + words[keywordInMessage + 3].substring(6, 8))
                        }
                        else {
                            yearMessage = parseInt(String(parseInt(String(date.getFullYear()).slice(0, 2)) + 1) + words[keywordInMessage + 3].substring(6, 8))
                        }
                        let monthMessage = parseInt(words[keywordInMessage + 3].substring(3, 6)) - 1
                        let dayMessage = parseInt(words[keywordInMessage + 3].substring(0, 2))
                        let futureDate = new Date(yearMessage, monthMessage, dayMessage)

                        messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем
                        millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage, futureDate.getHours(), time, words, keywordInMessage + 2)

                        setTimeout(() => bot.sendMessage(chatId, messageFuture), millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                        DateAsString(millisecondsTime,date)
                    }
                }
                else {
                    bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | пт | субботу | 21.05.22 | 21-05-22 | 21/05/22 ');
                }
            }
        }
        else if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword1) == true){ // только буквы
            let dayOfTheWeek = new DayOfTheWeek(arrayElementAfterKeyword1)
            if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
               let  differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
               let futureDay = date.getDate() + differenceInDays
               let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
                if(arrayElementAfterKeyword2 == "в"){
                    if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword3) == true){
                        if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3,1) == 0 &&
                            convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4,1) == 0 &&
                            convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword5,1) == 0 &&
                            convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword6,1) == 0){
                            bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                        }
                        else if (millisecondsTime < -1 || millisecondsTime == 0){
                            bot.sendMessage(chatId, 'Ошибка! Некорректно указано время');
                        }
                        else {
                            let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword3, arrayElementAfterKeyword4)
                            if (arrayElementAfterKeyword3== 'ноль' || arrayElementAfterKeyword3 == 'нуль'){
                                time = 24
                            }
                         let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time,date.getHours(),futureDate.getHours(),words,keywordInMessage+3,keywordInMessage+4,keywordInMessage+5,keywordInMessage+6)
                           messageFuture = objTime.message
                            millisecondsTime = objTime.millisecondsTime
                        }
                    }
                    else {
                        let time:number = parseInt(arrayElementAfterKeyword3) //время с типом число
                        if (isNaN(time) == true){
                            bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку');
                        }
                        else if(time > 24){
                            bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                        }
                        else{
                            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4,time)
                            const futureDateAndTime = new Date(futureMs)
                            millisecondsTime = futureDateAndTime.getTime() - date.getTime()
                            messageFuture = words.slice((keywordInMessage+5),words.length).join(' ')//сообщение, которое напоминаем
                        }
                    }
                }
                else {

                }
                setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                DateAsString(millisecondsTime,date)
            }

        }
    }
    else if ((words.includes('сегодня') == true) || (words.includes('завтра') == true)
    || (words.includes('послезавтра') == true) || (words.includes('послепослезавтра') == true)){
    }
    else {
        bot.sendMessage(chatId,'Ошибка! Не корректный ввод. Символы неизвестны!');
    }

   // bot.sendMessage(chatId,'Привет');
})


