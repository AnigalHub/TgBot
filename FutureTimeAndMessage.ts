import MessageToSend from "./MessageToSend";
import addTime from "./helper_functions/AddTimeWhenDayIsKnown";
import ConvertTime from "./ConvertTime";
const convertTime = new ConvertTime()
import addDay from "./helper_functions/AddDayWhenTimeIsKnown"
import addDayOfTheWeek from "./helper_functions/AddDayWhenTimeAndDayOfTheWeekAreKnown"
import addDateWhenItIsSpecifiedInFull from "./helper_functions/AddDateWhenItIsSpecifiedInFull"
import addDateOfDifferentType from "./helper_functions/AddDateOfDifferentType"


export default class FutureTimeAndMessage{
    private readonly chatId:number
    private readonly words:Array<string>
    private readonly dateMessage:Date
    private millisecondsTime: number
    private messageFuture: string = ''//сообщение, которое напоминаем

    constructor(chatId:number,words:Array<string>, dateMessage:Date) {
        this.chatId = chatId
        this.words = words
        this.dateMessage = dateMessage
        this.millisecondsTime = 0
        this.messageFuture = ''
    }

    CalculationsAndHandlingErrorsOnInputThrough(numberKeywordInMessage:number, secondKeywordInMessage:number, timeMessage:number): MessageToSend{

        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
        let wordsElementAfterKeyword3 = this.words[numberKeywordInMessage+3] // элемент массива после ключевого слова - третий
        let wordsElementAfterKeyword4 = this.words[numberKeywordInMessage+4] // элемент массива после ключевого слова - четвертый

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)){ // только цифры
            let time = parseInt(wordsElementAfterKeyword1) // время с типом число
            this.messageFuture = this.words.slice((numberKeywordInMessage+3),this.words.length).join(' ') // сообщение, которое напоминаем
            this.millisecondsTime = convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,time)  //миллисекунды - через сколько надо прислать сообщение
            if(time == 0) { // если время указано цифрой 0
                throw new Error('Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!')
            }
            else if(this.millisecondsTime == 0) { // если такого времени нет и произошла ошибка и вернулся 0
                throw new Error('Ошибка! Отсутствует или некорректно указана единица времени')
            }
            else{ // функция добавления времени когда день известен
                return addTime(this.dateMessage, this.words, secondKeywordInMessage, this.millisecondsTime, this.messageFuture)
            }
        }
        else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
            if(wordsElementAfterKeyword1 == 'ноль' || wordsElementAfterKeyword1 == 'нуль'){ // если время указано ноль/нуль
                throw new Error('Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
            }
            else if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword4,1) == 0){
                throw new Error('Ошибка! Не указана единица времени');
            }
            else{
                let time:number = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword1, wordsElementAfterKeyword2)
                let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, this.words,numberKeywordInMessage+1,numberKeywordInMessage+2,numberKeywordInMessage+3,numberKeywordInMessage+4)
                this.messageFuture = objTime.message
                this.millisecondsTime = objTime.millisecondsTime
                return addTime(this.dateMessage, this.words, secondKeywordInMessage,this.millisecondsTime,this.messageFuture)
            }
        }
        else {
            throw new Error('Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
        }
    }
    CalculationsAndHandlingErrorsOnInputTo( keywordInMessage:number, timeMessage:number){
        /*
            let wordsElementAfterKeyword1 = this.words[keywordInMessage+1] // элемент массива после ключевого слова - первый
            let wordsElementAfterKeyword2 = this.words[keywordInMessage+2] // элемент массива после ключевого слова - второй
            let wordsElementAfterKeyword3 = this.words[keywordInMessage+3] // элемент массива после ключевого слова - третий
            let wordsElementAfterKeyword4 = this.words[keywordInMessage+4] // элемент массива после ключевого слова - четвертый
            let wordsElementAfterKeyword5 = this.words[keywordInMessage+5] // элемент массива после ключевого слова - пятый
            let wordsElementAfterKeyword6 = this.words[keywordInMessage+6] // элемент массива после ключевого слова - шестой

            if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) { // только цифры
                let time = parseInt(wordsElementAfterKeyword1) //время с типом число
                if(time == 0){
                    time = 24
                }
                if(time > 24 && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) >= 3600000){
                    throw new Error('Ошибка! Время не может быть больше 24');
                }
                else if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                    throw new Error('Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
                }
                else if(!wordsElementAfterKeyword3){
                    throw new Error('Ошибка! Не указана дата');
                }
                else{
                    if (/[А-яЁё]/.test(wordsElementAfterKeyword3)){ // только буквы
                        if((wordsElementAfterKeyword3) == "в" || (wordsElementAfterKeyword3) == "во"){
                            let dayOfTheWeek = new DayOfTheWeek(wordsElementAfterKeyword4)
                            if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
                                let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
                                let futureDay = this.dateMessage.getDate() + differenceInDays
                                let futureDate = new Date(this.dateMessage.getFullYear(), this.dateMessage.getMonth(), futureDay)

                                let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,time)
                                this.millisecondsTime = futureMs - timeMessage
                                this.messageFuture = this.words.slice((keywordInMessage+5),this.words.length).join(' ')//сообщение, которое напоминаем
                                DateAsString(this.millisecondsTime,this.dateMessage)
                                return new MessageToSend(this.millisecondsTime, this.messageFuture)
                            }
                            throw new Error('')
                        }
                        else{
                            let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(wordsElementAfterKeyword3)
                            if((time < this.dateMessage.getHours()) && wordsElementAfterKeyword3 == 'сегодня'){
                                throw new Error('Ошибка! Время указано которое уже прошло - напомнить невозможно');
                            }
                            else if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) >= 3600000){
                                throw new Error( 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
                            }
                            else if(futureDay  == -1){
                                throw new Error('Ошибка! Некорректно введена дата. Время указано, а дата нет.');
                            }
                            else{
                                let futureDate = new Date(this.dateMessage.getFullYear(), this.dateMessage.getMonth(), futureDay)
                                const futureDateMs = Date.parse(futureDate.toString()) //будущая дата в миллисекундах

                                this.millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage,futureDateMs,time,this.words,keywordInMessage+2)
                                this.messageFuture = this.words.slice((keywordInMessage+4),this.words.length).join(' ')//сообщение, которое напоминаем
                                DateAsString(this.millisecondsTime,this.dateMessage)
                                return new MessageToSend(this.millisecondsTime, this.messageFuture)
                            }
                        }
                    }
                    else if(!/[А-яЁё]/.test(wordsElementAfterKeyword3) && (wordsElementAfterKeyword3.includes('.') == true || wordsElementAfterKeyword3.includes('-') == true || wordsElementAfterKeyword3.includes('/') == true )) {
                        if  (this.words[keywordInMessage + 3][2] != this.words[keywordInMessage + 3][5] &&
                            (this.words[keywordInMessage + 3][2] != '.' || this.words[keywordInMessage + 3][2] != '-' ||  this.words[keywordInMessage + 3][2] != '/') &&
                            (this.words[keywordInMessage + 3][5] != '.' || this.words[keywordInMessage + 3][5] != '-' || this.words[keywordInMessage + 3][5] != '/') ||
                            (this.words[keywordInMessage + 3].length > 10) || (this.words[keywordInMessage + 3].length == 7) || (this.words[keywordInMessage + 3].length == 9)) {
                            throw new Error( 'Ошибка! Некорректно введена дата. Опечатка в дате!');
                        }
                        else {
                            let yearMessage
                            if (this.words[keywordInMessage + 3].length == 10) {
                                yearMessage = parseInt(wordsElementAfterKeyword3.substring(6, 12))
                            }
                            else if ((wordsElementAfterKeyword3.length == 8) && (String(this.dateMessage.getFullYear()).slice(2, 4) <= wordsElementAfterKeyword3.substring(6, 8))) {
                                yearMessage = parseInt(String(this.dateMessage.getFullYear()).slice(0, 2) + wordsElementAfterKeyword3.substring(6, 8))
                            }
                            else {
                                yearMessage = parseInt(String(parseInt(String(this.dateMessage.getFullYear()).slice(0, 2)) + 1) + wordsElementAfterKeyword3.substring(6, 8))
                            }
                            let monthMessage = parseInt(wordsElementAfterKeyword3.substring(3, 6)) - 1
                            let dayMessage = parseInt(wordsElementAfterKeyword3.substring(0, 2))
                            let futureDate = new Date(yearMessage, monthMessage, dayMessage)
                            const futureDateMs = Date.parse(futureDate.toString()) //будущая дата в миллисекундах

                            this.messageFuture = this.words.slice((keywordInMessage+4),this.words.length).join(' ')//сообщение, которое напоминаем
                            this.millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage, futureDateMs, time, this.words, keywordInMessage + 2)
                            DateAsString(this.millisecondsTime,this.dateMessage)

                            return new MessageToSend(this.millisecondsTime, this.messageFuture)
                        }
                    }
                    else {
                        throw new Error('Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | пт | субботу | 21.05.22 | 21-05-22 | 21/05/22 ');
                    }
                }
            }
            else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
                let dayOfTheWeek = new DayOfTheWeek(wordsElementAfterKeyword1)
                if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
                    let  differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
                    let futureDay = this.dateMessage.getDate() + differenceInDays
                    let futureDate = new Date(this.dateMessage.getFullYear(),this.dateMessage.getMonth(), futureDay)
                    if(wordsElementAfterKeyword2 == "в"){
                        if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword3)){
                            if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) == 0 &&
                                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword4,1) == 0 &&
                                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword5,1) == 0 &&
                                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword6,1) == 0){
                                throw new Error('Ошибка! Не указана единица времени');
                            }
                            else if (this.millisecondsTime < -1 || this.millisecondsTime == 0){
                                throw new Error('Ошибка! Некорректно указано время');
                            }
                            else {
                                let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword3, wordsElementAfterKeyword4)
                                if (wordsElementAfterKeyword3== 'ноль' || wordsElementAfterKeyword3 == 'нуль'){
                                    time = 24
                                }
                                let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time,this.dateMessage.getHours(),futureDate.getHours(),this.words,keywordInMessage+3,keywordInMessage+4,keywordInMessage+5,keywordInMessage+6)
                                this.messageFuture = objTime.message
                                this.millisecondsTime = objTime.millisecondsTime
                                return new MessageToSend(this.millisecondsTime, this.messageFuture)
                            }
                        }
                        else {
                            let time:number = parseInt(wordsElementAfterKeyword3) //время с типом число
                            if (isNaN(time)){
                                throw new Error( 'Ошибка! Неизвестно время - исправьте ошибку');
                            }
                            else if(time > 24){
                                throw new Error( 'Ошибка! Время не может быть больше 24');
                            }
                            else{
                                let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword4,time)
                                const futureDateAndTime = new Date(futureMs)
                                this.millisecondsTime = futureDateAndTime.getTime() - this.dateMessage.getTime()
                                this.messageFuture = this.words.slice((keywordInMessage+5),this.words.length).join(' ')//сообщение, которое напоминаем
                                return new MessageToSend(this.millisecondsTime, this.messageFuture)
                            }
                        }
                    }
                    else {
                        throw new Error('')
                    }
                    DateAsString(this.millisecondsTime,this.dateMessage)
                    let millisecondsTime  = this.millisecondsTime
                    let messageFuture = this.messageFuture
                    return new MessageToSend(millisecondsTime, messageFuture)
                }
                throw new Error('')
            }
            else{
                throw new Error('')
            }

             */
    }
    CalculationsAndHandlingErrorsOnInputTo2(numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
        let wordsElementAfterKeyword3 = this.words[numberKeywordInMessage+3] // элемент массива после ключевого слова - третий
        let wordsElementAfterKeyword4 = this.words[numberKeywordInMessage+4] // элемент массива после ключевого слова - четвертый
        let wordsElementAfterKeyword5 = this.words[numberKeywordInMessage+5] // элемент массива после ключевого слова - пятый
        let wordsElementAfterKeyword6 = this.words[numberKeywordInMessage+6] // элемент массива после ключевого слова - шестой

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) { // только цифры
            let time = parseInt(wordsElementAfterKeyword1) //время с типом число
            if(time == 0){
                time = 24
            }
            if(time > 24 && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) >= 3600000){
                throw new Error('Ошибка! Время не может быть больше 24');
            }
            else if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                throw new Error('Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
            }
            else if(!wordsElementAfterKeyword3){
                throw new Error('Ошибка! Не указана дата');
            }
            else{
                if (/[А-яЁё]/.test(wordsElementAfterKeyword3)){ // только буквы
                    if((wordsElementAfterKeyword3) == "в" || (wordsElementAfterKeyword3) == "во"){
                        return addDayOfTheWeek(numberKeywordInMessage,wordsElementAfterKeyword4,wordsElementAfterKeyword2,this.dateMessage,this.words,timeMessage,time,this.messageFuture,this.millisecondsTime)
                    }
                    else{
                        return addDay(this.dateMessage,wordsElementAfterKeyword3,time,timeMessage,this.words,numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
                    }
                }
                else if(!/[А-яЁё]/.test(wordsElementAfterKeyword3) && (wordsElementAfterKeyword3.includes('.') == true || wordsElementAfterKeyword3.includes('-') == true || wordsElementAfterKeyword3.includes('/') == true )) {
                    return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberKeywordInMessage + 2,this.words[numberKeywordInMessage + 3],this.words,this.dateMessage,timeMessage, time, this.messageFuture,this.millisecondsTime)
                }
                else {
                    throw new Error('Ошибка! Некорректно указана дата. Присутствуют цифры. Пример написания даты: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
                }
            }
        }
        else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
            let time = parseInt(wordsElementAfterKeyword3) //время с типом число
            if(time == NaN){
                if(time == 0){
                    time = 24
                }
                if(time > 24 && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword4,1) >= 3600000){
                    throw new Error('Ошибка! Время не может быть больше 24');
                }
                else if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword4,time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                    throw new Error('Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
                }
                else if(!wordsElementAfterKeyword5){
                    throw new Error('Ошибка! Не указана дата');
                }
                else {
                    return addDayOfTheWeek(numberKeywordInMessage,wordsElementAfterKeyword1,wordsElementAfterKeyword4,this.dateMessage,this.words,timeMessage,time,this.messageFuture,this.millisecondsTime)
                }
            }
            else {
                if(wordsElementAfterKeyword1 == 'ноль' || wordsElementAfterKeyword1 == 'нуль'){ // если время указано ноль/нуль
                    throw new Error('Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                }
                else if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword4,1) == 0){
                    throw new Error('Ошибка! Не указана единица времени');
                }
                else{
                    let time:number = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword1, wordsElementAfterKeyword2)
                    let seconds:number = convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1)
                    let numberArrayElementResponsiveForTimeType:number
                    let arrayElementResponsiveForDateType:string
                    console.log(time)

                    if(time > 20 && time%10 != 0){
                        numberArrayElementResponsiveForTimeType = numberKeywordInMessage+3
                        arrayElementResponsiveForDateType = wordsElementAfterKeyword4

                    }
                    else if(time%10 == 0 && seconds != 60000 && seconds != 180000 && seconds != 3600000 && seconds != 86400000 && seconds != 604800000
                        && seconds != 2592000000 && seconds != 15768000000 && seconds != 31536000000){
                        numberArrayElementResponsiveForTimeType = numberKeywordInMessage+2
                        arrayElementResponsiveForDateType = wordsElementAfterKeyword3
                        time = convertTime.ConvertSmallNumberFromStringToNumber(wordsElementAfterKeyword1)

                    }
                    else {
                        time = 1
                        numberArrayElementResponsiveForTimeType = 2
                        arrayElementResponsiveForDateType = wordsElementAfterKeyword2
                    }
                    console.log(time)


                     return addDateOfDifferentType(this.dateMessage,arrayElementResponsiveForDateType,numberArrayElementResponsiveForTimeType,time,timeMessage,
                        this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)

                    /*
                    if(!/[А-яЁё]/.test(wordsElementAfterKeyword3) && (wordsElementAfterKeyword3.includes('.') == true || wordsElementAfterKeyword3.includes('-') == true || wordsElementAfterKeyword3.includes('/') == true )) {
                        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberArrayElementResponsiveForTimeType,this.words[numberKeywordInMessage + 3],this.words,this.dateMessage,timeMessage, time, this.messageFuture,this.millisecondsTime)
                    }
                    else if (/[А-яЁё]/.test(wordsElementAfterKeyword3)){ // только буквы
                        if((wordsElementAfterKeyword3) == "в" || (wordsElementAfterKeyword3) == "во"){
                            return addDayOfTheWeek(numberKeywordInMessage,wordsElementAfterKeyword4,wordsElementAfterKeyword2,this.dateMessage,this.words,timeMessage,time,this.messageFuture,this.millisecondsTime)
                        }
                        else{
                            return addDay(this.dateMessage,wordsElementAfterKeyword3,time,timeMessage,this.words,numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
                        }
                    }
                    else {
                        throw new Error('Ошибка! Некорректно указана дата. Присутствуют цифры. Пример написания даты: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
                    }

                     */
                }
            }
        }
        else{
            throw new Error('Ошибка! В дате или времени содержатся неизвестные символы. Возможно время или дата указаны слитно')
        }
    }
    CalculationsAndHandlingErrorsOnInputDateFull( numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
        let time = parseInt(wordsElementAfterKeyword2) //время с типом число
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberKeywordInMessage + 3,this.words[numberKeywordInMessage],this.words,this.dateMessage,timeMessage, time, this.messageFuture,this.millisecondsTime)
    }
}




