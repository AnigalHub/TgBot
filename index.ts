import config from './config.json'
import  TelegramBot from "node-telegram-bot-api"


import ConvertTime from './ConvertTime'
import DayOfTheWeek from './DayOfTheWeek'
import db from './db/index'

const token:string = config.token

const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})
const convertTime = new ConvertTime()


/*функция расчета будущей даты и времени*/
function CalculationOfFutureDateAndTime (time:number){
    let timeFuture = Date.parse(date.toString()) + time
    const d = new Date (timeFuture)
    console.log(d.toString())// точная дата ( день недели | дата | время)
}


/*дата в данную минуту*/
let date = new Date();
console.log(date.toString()) // день недели | дата | время

bot.on('message',(msg) =>{
    const chatId = msg.chat.id //id
    let text = msg.text
    if(text != text?.toLocaleLowerCase()){
        text = text?.toLocaleLowerCase()
    }
    let words = text?.split(" ") //разбиение на элементы массива, "пробел"
    console.log(words) //массив

    if(words?.includes('') == true){
        words = words?.filter(function (el) {
            return (el != "");
        });
        console.log(words) //массив
    }


    let keywordInMessage:number //ключевое слово в сообщении
    let millisecondsTime: number = 0 //миллисекунды - через сколько надо прислать сообщение
    let messageFuture: string //сообщение, которое напоминаем

    if(words!=undefined){
            if (words.includes('через') == true){
                keywordInMessage = words?.indexOf('через')//индекс ключевого слова в массиве
                if(/^[0-9]*$/.test(words[keywordInMessage+1]) == true){ // только цифры
                    let time = parseInt(words[keywordInMessage+1])//время с типом число
                    messageFuture = words.slice((keywordInMessage+3),words.length).join(' ') //сообщение, которое напоминаем
                    millisecondsTime = convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],time)  //миллисекунды - через сколько надо прислать сообщение
                    if(time == 0){
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                    }
                    else if(millisecondsTime == 0) {/*если такого времени нет и произошла ошибка и вернулся 0*/
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                    }
                    else{
                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                        CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                    }
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    if(words[keywordInMessage+1] == 'ноль' || words[keywordInMessage+1] == 'нуль'){
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                    }
                    else if(convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+1],1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],1) == 0 &&
                        convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+3],1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+4],1) == 0){
                        bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                    }
                    else{
                        let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(words[keywordInMessage+1],words[keywordInMessage+2])
                        let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time,date,date,words,keywordInMessage+1,keywordInMessage+2,keywordInMessage+3,keywordInMessage+4)
                        messageFuture = objTime.message
                        millisecondsTime = objTime.millisecondsTime
                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                        CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                    }
                }
                else {
                    bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
                }
            }
            else if(words.includes('в') == true || words.includes('во') == true){
                if(words.includes('во') == true){
                    words.splice(words?.indexOf('во'),1,'в')
                }
                keywordInMessage = words?.indexOf('в') //индекс ключевого слова в массиве
                if(/^[0-9]*$/.test(words[keywordInMessage+1]) == true) { // только цифры
                    let time = parseInt(words[keywordInMessage+1]) //время с типом число
                    if(time == 0){
                        time = 24
                    }
                    if(convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                    }
                    if (time > 24){
                        bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                    }
                    messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем

                    if (/[А-яЁё]/.test(words[keywordInMessage+3]) == true){ // только буквы
                        let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(words[keywordInMessage+3])
                        if(words[keywordInMessage+3] == 'сегодня' && (time < date.getHours())){
                            bot.sendMessage(chatId,'Ошибка! Время указано которое уже прошло - напомнить невозможно');
                        }
                        else if(futureDay  == -1){
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Время указано, а дата нет. ');
                        }
                        else{
                            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
                            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date,futureDate,time,words,keywordInMessage+2)

                            setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                            CalculationOfFutureDateAndTime(millisecondsTime)
                        }
                    }
                    else if(/[А-яЁё]/.test(words[keywordInMessage+3]) == false && (words[keywordInMessage+3].includes('.') == true || words[keywordInMessage+3].includes('-') == true)){
                        if (words[keywordInMessage+3][2] != words[keywordInMessage+3][5] && (words[keywordInMessage+3][2] != '.' ||
                            words[keywordInMessage+3][2] != '-') && (words[keywordInMessage+3][5] != '.' || words[keywordInMessage+3][5] != '-')){
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Опечатка в дате!');
                        }
                        else {
                            let yearMessage = parseInt(words[keywordInMessage+3].substring(6,12))
                            let monthMessage = parseInt(words[keywordInMessage+3].substring(3,6)) - 1
                            let dayMessage = parseInt(words[keywordInMessage+3].substring(0,2))
                            let futureDate = new Date(yearMessage, monthMessage, dayMessage)
                            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date,futureDate,time,words,keywordInMessage+2)

                            setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                            CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                        }
                    }
                    else {
                        bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | 21.01.22 | 21-01-22');
                    }
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    let dayOfTheWeek = new DayOfTheWeek(words[keywordInMessage+1])
                    if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
                       let  differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
                       let futureDay = date.getDate() + differenceInDays
                       let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
                        if(words[keywordInMessage+2] == "в"){
                            if (/^[А-яЁё]*$/.test(words[keywordInMessage+3]) == true){
                                if(convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+3],1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+4],1) == 0 &&
                                    convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+5],1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+6],1) == 0){
                                    bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                                }
                                else if (millisecondsTime < -1 || millisecondsTime == 0){
                                    bot.sendMessage(chatId, 'Ошибка! Некорректно указано время');
                                }
                                else {
                                    let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(words[keywordInMessage+3], words[keywordInMessage+4])
                                    if (words[keywordInMessage+3] == 'ноль' || words[keywordInMessage+3] == 'нуль'){
                                        time = 24
                                    }
                                    let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time,date,futureDate,words,keywordInMessage+3,keywordInMessage+4,keywordInMessage+5,keywordInMessage+6)
                                    messageFuture = objTime.message
                                    millisecondsTime = objTime.millisecondsTime
                                }
                            }
                            else {
                                let time:number = parseInt(words[keywordInMessage+3]) //время с типом число
                                if (isNaN(time) == true){
                                    bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку');
                                }
                                else if(time > 24){
                                    bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                                }
                                else{
                                    let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+4],time)
                                    const futureDateAndTime = new Date(futureMs)
                                    millisecondsTime = futureDateAndTime.getTime() - date.getTime()
                                    messageFuture = words.slice((keywordInMessage+5),words.length).join(' ')//сообщение, которое напоминаем
                                }
                            }
                        }
                        else {

                        }
                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                        CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                    }

                }
            }
            else {
                bot.sendMessage(chatId,'Ошибка! Не корректный ввод');
            }

    }
   // bot.sendMessage(chatId,'Привет');
})


