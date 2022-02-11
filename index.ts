import config from './config.json'
import  TelegramBot from "node-telegram-bot-api"



const token:string = config.token

const bot = new TelegramBot(token,{polling:true, baseApiUrl: "https://api.telegram.org"})

/*функция перевода времени в милисекунды*/
function ConvertTimeToMilliseconds(word:string,timePhrase:number):number{
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
/*функция перевода однословного времени в число*/
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
/*функция перевода времени, состоящего из двух слов в число*/
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
/*функция поиска индекса (номера) дня недели*/
function SearchForTheDayNumberOfTheWeek (dayOfTheWeek:string):number{
    let indexArray: number
    let array: Array<string>
    if (dayOfTheWeek == 'вс' || dayOfTheWeek == 'пн' || dayOfTheWeek == 'вт' || dayOfTheWeek == 'ср' || dayOfTheWeek == 'чт' || dayOfTheWeek == 'пт' || dayOfTheWeek == 'сб'){
        array = ['вс','пн','вт','ср','чт','пт','сб']
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
    let numberOfTheWeekDayMessage:number = SearchForTheDayNumberOfTheWeek(dayMessage)
    let differenceDaysOfTheWeek:number

    if(date.getDay() > numberOfTheWeekDayMessage){
        differenceDaysOfTheWeek = 7 - date.getDay() + numberOfTheWeekDayMessage
    }
    else if (date.getDay() < numberOfTheWeekDayMessage){
        differenceDaysOfTheWeek = numberOfTheWeekDayMessage - date.getDay()
    }
    else {
        differenceDaysOfTheWeek = 7
    }
    return differenceDaysOfTheWeek
}


/*функция разницы в днях между двумя датами*/
function diffDates(day_one:Date, day_two:Date) {
    return (day_one.getTime() - day_two.getTime()) / (60 * 60 * 24 * 1000);
}
/*функция подсчета времени и сообщения при вводе времени в виде строки*/
function CountMillisecondsAndMessageWhenEnteringTimeAsString(array:Array<string>,parameter1:number,parameter2:number,parameter3:number,parameter4:number) {
    let messageFuture:string
    let millisecondsTime:number

    if(array[parameter1] == "секунду" || array[parameter1] == "минуту" || array[parameter1] == "полчаса"
        || array[parameter1] == "час" || array[parameter1] == "день" || array[parameter1] == "неделю"
        || array[parameter1] == "месяц" || array[parameter1] == "полгода" || array[parameter1] == "год"){

        messageFuture = array.slice((parameter2),array.length).join(' ') //сообщение, которое напоминаем
        millisecondsTime = ConvertTimeToMilliseconds(array[parameter1],1)
    }
    else if(array[parameter2]  == "одну" || array[parameter2] == "один" || array[parameter2] == "два" || array[parameter2] == "две"
        || array[parameter2] == "три" || array[parameter2] == "четыре" || array[parameter2] == "пять" || array[parameter2] == "шесть"
        || array[parameter2] == "семь" || array[parameter2] == "восемь" || array[parameter2] == "девять" || array[parameter2] == "десять"
        || array[parameter2] == "одинадцать" || array[parameter2] == "двенадцать" || array[parameter2] == "тринадцать" ||
        array[parameter2] == "четырнадцать" || array[parameter2] == "пятнадцать" || array[parameter2] == "шестнадцать" ||
        array[parameter2] == "семнадцать" || array[parameter2] == "семнадцать" || array[parameter2] == "восемнадцать" ||
        array[parameter2] == "девятнадцать" || array[parameter2] == "девятнадцать" || array[parameter2] == "двадцать" ||
        array[parameter2] == "тридцать" || array[parameter2] == "сорок" || array[parameter2] == "пятьдесят"  ||
        array[parameter2] == "шестьдесят" || array[parameter2] == "семьдесят" || array[parameter2] == "восемьдесят" ||
        array[parameter2] == "девяносто" || array[parameter2] == "сто"){

        messageFuture = array.slice((parameter4),array.length).join(' ') //сообщение, которое напоминаем
        millisecondsTime = ConvertTimeToMilliseconds(array[parameter3],ConvertLargeNumberFromStringToNumber(array[parameter1],array[parameter2]))
    }
    else if( array[parameter1]  == "одну" || array[parameter1] == "один" || array[parameter1] == "два" || array[parameter1] == "две"
        || array[parameter1] == "три" || array[parameter1] == "четыре" || array[parameter1] == "пять" || array[parameter1] == "шесть"
        || array[parameter1] == "семь" || array[parameter1] == "восемь" || array[parameter1] == "девять" || array[parameter1] == "десять"
        || array[parameter1] == "одинадцать" || array[parameter1] == "двенадцать" || array[parameter1] == "тринадцать" ||
        array[parameter1] == "четырнадцать" || array[parameter1] == "пятнадцать" || array[parameter1] == "шестнадцать" ||
        array[parameter1] == "семнадцать" || array[parameter1] == "семнадцать" || array[parameter1] == "восемнадцать" ||
        array[parameter1] == "девятнадцать" || array[parameter1] == "девятнадцать" || array[parameter1] == "двадцать" ||
        array[parameter1] == "тридцать" || array[parameter1] == "сорок" || array[parameter1] == "пятьдесят"  ||
        array[parameter1] == "шестьдесят" || array[parameter1] == "семьдесят" || array[parameter1] == "восемьдесят" ||
        array[parameter1] == "девяносто" || array[parameter1] == "сто"){

        messageFuture = array.slice((parameter3),array.length).join(' ') //сообщение, которое напоминаем
        millisecondsTime = ConvertTimeToMilliseconds(array[parameter2],ConvertSmallNumberFromStringToNumber(array[parameter1]))
    }
    else {
        messageFuture = ''
        millisecondsTime = 0
    }
    return {messageFuture,millisecondsTime}
}
/*функция разницы во времени между двумя датами (когда указано время в сообщении)*/
function diffTime(timeMessage:number,differenceInDays:number, wordMessage:string ) {
    let millisecondsTime:number
    let time:number
    let timeDifference:number
    if (wordMessage == 'секунд'){
        time = timeMessage/3600000
    }
    else {
        time=timeMessage
    }
    timeDifference = Math.abs(date.getHours() - time)
    if (date.getHours() > time){
        millisecondsTime =  ConvertTimeToMilliseconds("дней",differenceInDays) - ConvertTimeToMilliseconds("час", timeDifference )
    }
    else{
        millisecondsTime =  ConvertTimeToMilliseconds("дней",differenceInDays) + ConvertTimeToMilliseconds("час", timeDifference )
    }
    return  millisecondsTime
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
    let millisecondsTime: number = 0 //миллисекунды - через сколько надо прислать сообщение
    let messageFuture: string //сообщение, которое напоминаем

    if(words!=undefined){
        for (let word of words){
            if (word == "через"){
                keywordInMessage = words?.indexOf(word)//индекс ключевого слова в массиве
                if(/^[0-9]*$/.test(words[keywordInMessage+1]) == true){ // только цифры
                    let time = parseInt(words[keywordInMessage+1])//время с типом число
                    millisecondsTime = ConvertTimeToMilliseconds(words[keywordInMessage+2],time)  //миллисекунды - через сколько надо прислать сообщение
                    if( millisecondsTime == 0) {/*если такого времени нет и произошла ошибка и вернулся 0*/
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                    }
                    messageFuture = words.slice((keywordInMessage+3),words.length).join(' ') //сообщение, которое напоминаем
                    setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    /**/
                    CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    let objMessageAndMilliseconds = CountMillisecondsAndMessageWhenEnteringTimeAsString(words,keywordInMessage+1,keywordInMessage+2, keywordInMessage+3,keywordInMessage+4)
                    if (objMessageAndMilliseconds.messageFuture == '' && objMessageAndMilliseconds.millisecondsTime == 0){
                        bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку');
                        break
                    }
                    messageFuture = objMessageAndMilliseconds.messageFuture
                    millisecondsTime = objMessageAndMilliseconds.millisecondsTime

                    setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем

                    /**/
                    CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
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
                    if(ConvertTimeToMilliseconds(words[keywordInMessage+2],time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
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
                        millisecondsTime = ConvertTimeToMilliseconds(words[keywordInMessage+2],timeDifference)
                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем

                        /**/
                        CalculationOfFutureDateAndTime(millisecondsTime)
                    }
                    else if(/[А-яЁё]/.test(words[keywordInMessage+3]) == false && (words[keywordInMessage+3].includes('.') == true || words[keywordInMessage+3].includes('-') == true)){
                        let differenceInDays = diffDates(
                            new Date (parseInt (words[keywordInMessage+3].substring(6,12)), parseInt (words[keywordInMessage+3].substring(3,6)), parseInt (words[keywordInMessage+3].substring(0,2))),
                            new Date (date.getFullYear(),date.getMonth()+1,date.getDate())
                        )
                        if (words[keywordInMessage+3][2] == words[keywordInMessage+3][5] && (words[keywordInMessage+3][2] == '.' || words[keywordInMessage+3][2] == '-') && (words[keywordInMessage+3][5] == '.' || words[keywordInMessage+3][5] == '-')){
                            millisecondsTime =  diffTime(time,differenceInDays,words[keywordInMessage+2])
                            setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем

                            /**/
                            CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                        }
                        else {
                            bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Опечатка в дате!');
                        }

                    }
                    else {
                        bot.sendMessage(chatId,'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | 21.01.22 | 21-01-22');
                    }
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage+1]) == true){ // только буквы
                    if (SearchForTheDayNumberOfTheWeek(words[keywordInMessage+1]) != -1){
                       let  differenceInDays = diffDaysOfTheWeek(words[keywordInMessage+1])
                        if(words[keywordInMessage+2] == "в"){
                            if (/^[А-яЁё]*$/.test(words[keywordInMessage+3]) == true){
                                let objMessageAndMilliseconds = CountMillisecondsAndMessageWhenEnteringTimeAsString(words,keywordInMessage+3,keywordInMessage+4, keywordInMessage+5,keywordInMessage+6)
                                if (objMessageAndMilliseconds.messageFuture == '' && objMessageAndMilliseconds.millisecondsTime == 0){
                                    bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку');
                                    break
                                }
                                messageFuture = objMessageAndMilliseconds.messageFuture
                                millisecondsTime =  diffTime(objMessageAndMilliseconds.millisecondsTime,differenceInDays,"секунд")
                            }
                            else {
                                millisecondsTime =  diffTime(parseInt(words[keywordInMessage+3]),differenceInDays,"часов")
                                messageFuture = words.slice((keywordInMessage+5),words.length).join(' ')//сообщение, которое напоминаем
                            }
                        }
                        else {
                            millisecondsTime = ConvertTimeToMilliseconds("дней", differenceInDays)
                            messageFuture = words.slice((keywordInMessage+2),words.length).join(' ')//сообщение, которое напоминаем
                        }

                        setTimeout(() => bot.sendMessage(chatId, messageFuture),millisecondsTime);// функция со временем - когда напомнить + сообщение - что напоминаем

                        /**/
                        CalculationOfFutureDateAndTime(millisecondsTime) /*дата в которую напоминаем сообщение*/
                        break
                    }
                    bot.sendMessage(chatId,'Ошибка! Не корректное слово, может быть задан только день недели. Пример: ср | среда | среду');
                }
            }
            else {

            }
            console.log(CalculationOfFutureDateAndTime(millisecondsTime))

        }
    }
    bot.sendMessage(chatId,'Привет');
})


