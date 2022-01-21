import config from './config.json'
import  TelegramBot from "node-telegram-bot-api"

const token:string = config.token

const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

/*функция перевода времени в милисекунды*/
function ConvertTimeToMilliseconds(chatId:number, word:string,timePhrase:number):number{
    let ms:number
    if(word == "секунд" || word == "секунды" || word == "секунду"){
        ms = timePhrase*1000
    }
    else if(word == "минут" || word == "минуты" || word == "минуту"){
        ms = timePhrase*60*1000
    }
    else if(word == "полчаса"){
        ms = timePhrase*30*1000
    }
    else if(word == "час" || word == "часа" || word == "часов"){
        ms = timePhrase*3600000
    }
    else if(word == "день" || word == "дня" || word == "дней" || word == "сутки" || word == "суток"){
        ms = timePhrase*86400000
    }
    else if(word == "неделю" || word == "недели" || word == "недель"){
        ms = timePhrase*604800000
    }
    else if(word == "месяц" || word == "месяца" || word == "месяцев"){
        ms = timePhrase*2592000000
    }
    else if(word == "полгода"){
        ms = timePhrase*6*2592000000
    }
    else if(word == "год" || word == "года" || word == "лет"){
        ms = timePhrase*31536000000
    }
    else {
        ms = 0
    }
    return ms
}

function ConvertSmallNumberFromStringToNumber(number:string) {
    let numberTime:number
    if(number == "одну" || number == "один"){
        numberTime = 1
    }
    else if(number == "два" || number == "две" ){
        numberTime = 2
    }
    else if(number == "три"){
        numberTime = 3
    }
    else if(number == "четыре"){
        numberTime = 4
    }
    else if(number == "пять"){
        numberTime = 5
    }
    else if(number == "шесть"){
        numberTime = 6
    }
    else if(number == "семь"){
        numberTime = 7
    }
    else if(number == "восемь"){
        numberTime = 8
    }
    else if(number == "девять"){
        numberTime = 9
    }
    else if(number == "десять"){
        numberTime = 10
    }
    else if(number == "одинадцать"){
        numberTime = 11
    }
    else if(number == "двенадцать"){
        numberTime = 12
    }
    else if(number == "тринадцать"){
        numberTime = 13
    }
    else if(number == "четырнадцать"){
        numberTime = 14
    }
    else if(number == "пятнадцать"){
        numberTime = 15
    }
    else if(number == "шестнадцать"){
        numberTime = 16
    }
    else if(number == "семнадцать"){
        numberTime = 17
    }
    else if(number == "семнадцать"){
        numberTime = 17
    }
    else if(number == "восемнадцать"){
        numberTime = 18
    }
    else if(number == "девятнадцать"){
        numberTime = 19
    }
    else if(number == "девятнадцать"){
        numberTime = 19
    }
    else if(number == "двадцать"){
        numberTime = 20
    }
    else if(number == "тридцать"){
        numberTime = 30
    }
    else if(number == "сорок"){
        numberTime = 40
    }
    else if(number == "пятьдесят"){
        numberTime = 50
    }
    else if(number == "шестьдесят"){
        numberTime = 60
    }
    else if(number == "семьдесят"){
        numberTime = 70
    }
    else if(number == "восемьдесят"){
        numberTime = 80
    }
    else if(number == "девяносто"){
        numberTime = 90
    }
    else if(number == "сто"){
        numberTime = 100
    }
    else{
        numberTime = -1
    }
    return numberTime
}
function ConvertLargeNumberFromStringToNumber(number1:string,number2:string) {
    let secondPartOfNumber:number = ConvertSmallNumberFromStringToNumber(number2)
    let numberTime:number
    if(number1 == "двадцать"){
        numberTime = 20 + secondPartOfNumber
    }
    else if(number1 == "тридцать"){
        numberTime = 30 + secondPartOfNumber
    }
    else if(number1 == "сорок"){
        numberTime = 40 + secondPartOfNumber
    }
    else if(number1 == "пятьдесят"){
        numberTime = 50 + secondPartOfNumber
    }
    else if(number1 == "шестьдесят"){
        numberTime = 60 + secondPartOfNumber
    }
    else if(number1 == "семьдесят"){
        numberTime = 70 + secondPartOfNumber
    }
    else if(number1 == "восемьдесят"){
        numberTime = 80 + secondPartOfNumber
    }
    else if(number1 == "девяносто"){
        numberTime = 90 + secondPartOfNumber
    }
    else if(number1 == "сто"){
        numberTime = 100 + secondPartOfNumber
    }
    else{
        numberTime = -1
    }
    return numberTime
}

/*функция разницы в днях между двумя датами*/
function diffDates(day_one:Date, day_two:Date) {
    return (day_one.getTime() - day_two.getTime()) / (60 * 60 * 24 * 1000);
}

/*функция разницы во времени между двумя датами (когда указано время в сообщении)*/
function diffTime(chatId:number,timeMessage:number,differenceInDays:number, wordMessage:string ) {
    let millisecondsTime:number
    let timeDifference:number
    timeDifference = Math.abs((date.getHours() - timeMessage))
    if (date.getHours() > timeMessage){
       millisecondsTime =  ConvertTimeToMilliseconds(chatId,"дней",differenceInDays) - ConvertTimeToMilliseconds(chatId,wordMessage, timeDifference )
    }
    else{
       millisecondsTime =  ConvertTimeToMilliseconds(chatId,"дней",differenceInDays) + ConvertTimeToMilliseconds(chatId,wordMessage, timeDifference )
    }
    return  millisecondsTime
}

/*функция поиска индекса (номера) дня недели*/
function SearchForTheDayNumberOfTheWeek (dayOfTheWeek:string):number{
    let indexArray: number
    let array: Array<string>
    if (dayOfTheWeek == 'вс' || dayOfTheWeek == 'пн' || dayOfTheWeek == 'вт' || dayOfTheWeek == 'ср' || dayOfTheWeek == 'чт' || dayOfTheWeek == 'пт' || dayOfTheWeek == 'сб'){
        array = ['вс','пн','вт','ср','чт','пт','cб']
    }
    else if (dayOfTheWeek == 'воскресенье' || dayOfTheWeek == 'понедельник' || dayOfTheWeek == 'вторник' || dayOfTheWeek == 'среда' || dayOfTheWeek == 'четверг' || dayOfTheWeek == 'пятница' || dayOfTheWeek == 'суббота'){
        array = ['воскресенье','понедельник','вторник','среда','четверг','пятница','cуббота']
    }
    else if (dayOfTheWeek == 'воскресенье' || dayOfTheWeek == 'понедельник' || dayOfTheWeek == 'вторник' || dayOfTheWeek == 'среду' || dayOfTheWeek == 'четверг' || dayOfTheWeek == 'пятницу' || dayOfTheWeek == 'субботу'){
        array = ['воскресенье','понедельник','вторник','среду','четверг','пятницу','cубботу']
    }
    else {
        array = []
    }
    indexArray = array.indexOf(dayOfTheWeek)
    return indexArray
}

/*функция разницы между днями недели (когда указано время в сообщении)*/
function diffDaysOfTheWeek(dayMessage:string) {
    let differenceDaysOfTheWeek = Math.abs(date.getDay() - SearchForTheDayNumberOfTheWeek(dayMessage))
    if (differenceDaysOfTheWeek == 0){
        differenceDaysOfTheWeek = 7
    }
    return differenceDaysOfTheWeek
}

/*функция расчета будущей даты и времени*/
function CalculationOfFutureDateAndTime (time:number){
    let timeFuture = Date.parse(date.toString()) + time
    const d = new Date (timeFuture)
    console.log(d.toString()) // точная дата ( день недели | дата | время)
}

/*дата в данную минуту*/
let date = new Date();
console.log(date.toString()) // день недели | дата | время
console.log(Date.parse(date.toString())) //в милисекундах

bot.on('message',(msg) =>{
    const chatId = msg.chat.id //id
    let words = msg.text?.split(" ") //разбиение на элементы массива, "пробел"
    console.log(words) //массив

    let keywordInMessage:number //ключевое слово в сообщении
    let millisecondsTime: number //миллисекунды - через сколько надо прислать сообщение
    let messageFuture: string //сообщение, которое напоминаем

    if(words!=undefined){
        for (let word of words){
            if (word == "через"){
                keywordInMessage = words?.indexOf(word)//индекс ключевого слова в массиве
                if(/^[0-9]*$/.test(words[keywordInMessage+1]) == true){ // только цифры
                    let time = parseInt(words[keywordInMessage+1])//время с типом число
                    millisecondsTime = ConvertTimeToMilliseconds(chatId,words[keywordInMessage+2],time)  //миллисекунды - через сколько надо прислать сообщение
                    if( millisecondsTime == 0) {/*если такого времени нет и произошла ошибка и вернулся 0*/
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                    }
                    messageFuture = words.slice((keywordInMessage+3),words.length).join(' ') //сообщение, которое напоминаем
                    setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    /**/
                    console.log(messageFuture)
                    CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    if(words[keywordInMessage+1] == "секунду" || words[keywordInMessage+1] == "минуту" || words[keywordInMessage+1] == "полчаса"
                        || words[keywordInMessage+1] == "час" || words[keywordInMessage+1] == "день" || words[keywordInMessage+1] == "неделю"
                        || words[keywordInMessage+1] == "месяц" || words[keywordInMessage+1] == "полгода" || words[keywordInMessage+1] == "год"){

                        messageFuture = words.slice((keywordInMessage+2),words.length).join(' ') //сообщение, которое напоминаем
                        millisecondsTime = ConvertTimeToMilliseconds(chatId,words[keywordInMessage+1],1)
                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем

                        /**/
                        console.log(messageFuture)
                        CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                    }


                }
                else {
                    bot.sendMessage(chatId,'Ошибка! Некорректно введено время. Ввод времени указывается днем (словом) или числом. Пример: неделю/месяц | 12 минут/3 дня ');
                }
                break
            }
            else if(word == "в" || word == "во"){
                keywordInMessage = words?.indexOf(word) //индекс ключевого слова в массиве
                if(/^[0-9]*$/.test(words[keywordInMessage+1]) == true) { // только цифры
                    let time = parseInt(words[keywordInMessage+1]) //время с типом число
                    let timeDifference:number = 0
                    if(ConvertTimeToMilliseconds(chatId,words[keywordInMessage+2],time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                    }
                    messageFuture = words.slice((keywordInMessage+4),words.length).join(' ')//сообщение, которое напоминаем
                    console.log(messageFuture)
                    if (/[А-яЁё]/.test(words[keywordInMessage+3]) == true){ // только буквы
                        if(words[keywordInMessage+3] == "сегодня"){
                            timeDifference = Math.abs(date.getHours()  - time)
                        }
                        else if(words[keywordInMessage+3] == "завтра"){
                            timeDifference = Math.abs(24 - date.getHours() + time)
                        }
                        else if  (words[keywordInMessage+3] == "послезавтра"){
                            timeDifference = Math.abs(24*2 - date.getHours() + time)
                        }
                        else if  (words[keywordInMessage+3] == "послепослезавтра"){
                            timeDifference = Math.abs(24*3 - date.getHours() + time)
                        }
                        else{
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Время указано, а дата нет. ');
                            break
                        }
                        millisecondsTime = ConvertTimeToMilliseconds(chatId,words[keywordInMessage+2],timeDifference)
                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем

                            /**/
                        console.log(messageFuture)
                        CalculationOfFutureDateAndTime(millisecondsTime)
                    }
                    else if(/[А-яЁё]/.test(words[keywordInMessage+3]) == false && (words[keywordInMessage+3].includes('.') == true || words[keywordInMessage+3].includes('-') == true)){
                        let differenceInDays = diffDates(
                            new Date (parseInt (words[keywordInMessage+3].substring(6,12)), parseInt (words[keywordInMessage+3].substring(3,6)), parseInt (words[keywordInMessage+3].substring(0,2))),
                            new Date (date.getFullYear(),date.getMonth()+1,date.getDate())
                        )
                        if (words[keywordInMessage+3][2] == words[keywordInMessage+3][5] && (words[keywordInMessage+3][2] == '.' || words[keywordInMessage+3][2] == '-') && (words[keywordInMessage+3][5] == '.' || words[keywordInMessage+3][5] == '-')){
                            millisecondsTime =  diffTime(chatId,time,differenceInDays,words[keywordInMessage+2])
                            setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем

                            /**/
                            console.log(messageFuture)
                            CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                        }
                        bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Опечатка в дате!');
                    }
                    bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | 21.01.22 | 21-01-22');

                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    if (SearchForTheDayNumberOfTheWeek(words[keywordInMessage+1]) != -1){
                       let  differenceInDays = diffDaysOfTheWeek(words[keywordInMessage+1])
                        if(words[keywordInMessage+2] == "в"){
                            if (/^[А-яЁё]*$/.test(words[keywordInMessage+3]) == true){
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                                break
                            }
                            millisecondsTime =  diffTime(chatId,parseInt(words[keywordInMessage+3]),differenceInDays,"часов")
                        }
                        millisecondsTime = ConvertTimeToMilliseconds(chatId,"дней", differenceInDays)

                        /**/
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


