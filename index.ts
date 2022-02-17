import config from './config.json'
import  TelegramBot from "node-telegram-bot-api"


import ConvertTime from './ConvertTime'
import DayOfTheWeek from './DayOfTheWeek'

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

    let keywordInMessage:number //ключевое слово в сообщении
    let millisecondsTime: number = 0 //миллисекунды - через сколько надо прислать сообщение
    let messageFuture: string //сообщение, которое напоминаем


    if(words!=undefined){
        for (let word of words){
            if (word == "через"){
                keywordInMessage = words?.indexOf(word)//индекс ключевого слова в массиве
                if(/^[0-9]*$/.test(words[keywordInMessage+1]) == true){ // только цифры
                    let time = parseInt(words[keywordInMessage+1])//время с типом число
                    messageFuture = words.slice((keywordInMessage+3),words.length).join(' ') //сообщение, которое напоминаем
                    millisecondsTime = convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],time)  //миллисекунды - через сколько надо прислать сообщение
                    if(millisecondsTime == 0) {/*если такого времени нет и произошла ошибка и вернулся 0*/
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                        break
                    }
                    setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    if(words[keywordInMessage+1] == 'ноль' || words[keywordInMessage+1] == 'ноль'){
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                        break
                    }
                    let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(words[keywordInMessage+1],words[keywordInMessage+2])
                    let futureMs:number = 0
                    if (time == -1 && (convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+1],1) == 0)){
                        time = convertTime.ConvertSmallNumberFromStringToNumber(words[keywordInMessage+1])
                        futureMs = date.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],time)
                        messageFuture = words.slice((keywordInMessage+3),words.length).join(' ')//сообщение, которое напоминаем
                    }
                    else if(time > 20 && time%10 !== 0){
                        futureMs = date.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+3],time)
                        messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем
                    }
                    else{
                        time = 1
                        futureMs = date.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+1],time)
                        messageFuture = words.slice((keywordInMessage+2),words.length).join(' ')//сообщение, которое напоминаем
                    }
                    const futureDateAndTime = new Date(futureMs)
                    millisecondsTime =  futureDateAndTime.getTime() - date.getTime()
                    console.log(messageFuture)

                    setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                }
                else {
                    bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
                }
                break
            }
            else if(word == "в" || word == "во"){
                keywordInMessage = words?.indexOf(word) //индекс ключевого слова в массиве
                if(/^[0-9]*$/.test(words[keywordInMessage+1]) == true) { // только цифры
                    let time = parseInt(words[keywordInMessage+1]) //время с типом число
                    if(time == 0){
                        time = 24
                    }
                    if(convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                        break
                    }
                    if (time > 24){
                        bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                        break
                    }
                    messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем
                    console.log(messageFuture)

                    if (/[А-яЁё]/.test(words[keywordInMessage+3]) == true){ // только буквы
                        if(words[keywordInMessage+3] == 'сегодня' && (time < date.getHours())){
                            bot.sendMessage(chatId,'Ошибка! Время указано которое уже прошло - напомнить невозможно');
                            break
                        }
                        let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(words[keywordInMessage+3])
                        if(futureDay  == -1){
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Время указано, а дата нет. ');
                            break
                        }
                        let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
                        const futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],time)
                        const futureDateAndTime = new Date(futureMs)
                        millisecondsTime = futureDateAndTime.getTime() - date.getTime()

                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем

                        CalculationOfFutureDateAndTime(millisecondsTime)
                    }
                    else if(/[А-яЁё]/.test(words[keywordInMessage+3]) == false && (words[keywordInMessage+3].includes('.') == true || words[keywordInMessage+3].includes('-') == true)){
                        let yearMessage = parseInt(words[keywordInMessage+3].substring(6,12))
                        let monthMessage = parseInt(words[keywordInMessage+3].substring(3,6)) - 1
                        let dayMessage = parseInt(words[keywordInMessage+3].substring(0,2))
                        let futureDate = new Date(yearMessage, monthMessage, dayMessage)
                        const futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+2],time)
                        const futureDateAndTime = new Date(futureMs)

                        if (words[keywordInMessage+3][2] != words[keywordInMessage+3][5] && (words[keywordInMessage+3][2] != '.' || words[keywordInMessage+3][2] != '-') && (words[keywordInMessage+3][5] != '.' || words[keywordInMessage+3][5] != '-')){
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Опечатка в дате!');
                        }
                        millisecondsTime =  futureDateAndTime.getTime() - date.getTime()
                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем
                        CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                    }
                    else {
                        bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | 21.01.22 | 21-01-22');
                    }
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    let dayOfTheWeek = new DayOfTheWeek(words[keywordInMessage+1])
                    if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
                       let  differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
                       let futureDay = date.getDate() + differenceInDays+1
                        if(words[keywordInMessage+2] == "в"){
                            if (/^[А-яЁё]*$/.test(words[keywordInMessage+3]) == true){
                                let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
                                let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(words[keywordInMessage+3],words[keywordInMessage+4])
                                if (words[keywordInMessage+3] == 'ноль' || words[keywordInMessage+3] == 'нуль'){
                                   time = 24
                                }
                                let futureMs:number = 0
                                if (time == -1 && (convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+3],1) == 0)){
                                    time = convertTime.ConvertSmallNumberFromStringToNumber(words[keywordInMessage+3])
                                    futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+4],time)
                                    messageFuture = words.slice((keywordInMessage+5),words.length).join(' ')//сообщение, которое напоминаем
                                }
                                else if(time > 20 && time%10 !== 0){
                                    futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+5],time)
                                    messageFuture = words.slice((keywordInMessage+6),words.length).join(' ')//сообщение, которое напоминаем
                                }
                                else{
                                    time = 1
                                    futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage+3],time)
                                    messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем
                                }
                                const futureDateAndTime = new Date(futureMs)
                                millisecondsTime =  futureDateAndTime.getTime() - date.getTime()
                                console.log(messageFuture)
                            }
                            else {
                                let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
                                let time = parseInt(words[keywordInMessage+3]) //время с типом число
                                if (isNaN(time) == true){
                                    bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку');
                                    break
                                }
                                else if(time > 24){
                                    bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                                    break
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
                            millisecondsTime = convertTime.ConvertTimeToMilliseconds("дней", differenceInDays)
                            messageFuture = words.slice((keywordInMessage+2),words.length).join(' ')//сообщение, которое напоминаем
                        }

                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем

                        
                        CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                        break
                    }
                    bot.sendMessage(chatId,'Ошибка! Не корректное слово, может быть задан только день недели. Пример: ср | среда | среду');
                }
            }
            else {

            }
        }
    }
    bot.sendMessage(chatId,'Привет');
})


