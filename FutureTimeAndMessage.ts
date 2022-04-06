import MessageToSend from "./MessageToSend";
import addTime from "./helper_functions/AddTimeWhenDayIsKnown";
import DayOfTheWeek from "./DayOfTheWeek";
import {DateAsString} from "./helper_functions/DateAsString";
import ConvertTime from "./ConvertTime";
const convertTime = new ConvertTime()


export default class FutureTimeAndMessage{
    private readonly chatId:number
    private readonly array:Array<string>
    private readonly dateMessage:Date
    private millisecondsTime: number
    private messageFuture: string = ''//сообщение, которое напоминаем

    constructor(chatId:number,array:Array<string>, dateMessage:Date) {
        this.chatId = chatId
        this.array = array
        this.dateMessage = dateMessage
        this.millisecondsTime = 0
        this.messageFuture = ''
    }

    CalculationsAndHandlingErrorsOnInputThrough(keywordInMessage:number, secondKeywordInMessage:number, timeMessage:number): MessageToSend{

        let arrayElementAfterKeyword1 = this.array[keywordInMessage+1] // элемент массива после ключевого слова - первый
        let arrayElementAfterKeyword2 = this.array[keywordInMessage+2] // элемент массива после ключевого слова - второй
        let arrayElementAfterKeyword3 = this.array[keywordInMessage+3] // элемент массива после ключевого слова - третий
        let arrayElementAfterKeyword4 = this.array[keywordInMessage+4] // элемент массива после ключевого слова - четвертый

        if(/^[0-9]*$/.test(arrayElementAfterKeyword1)){ // только цифры
            let time = parseInt(arrayElementAfterKeyword1) // время с типом число
            this.messageFuture = this.array.slice((keywordInMessage+3),this.array.length).join(' ') // сообщение, которое напоминаем
            this.millisecondsTime = convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,time)  //миллисекунды - через сколько надо прислать сообщение
            if(time == 0) { // если время указано цифрой 0
                throw new Error('Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!')
            }
            else if(this.millisecondsTime == 0) { // если такого времени нет и произошла ошибка и вернулся 0
                throw new Error('Ошибка! Отсутствует или некорректно указана единица времени')
            }
            else{ // функция добавления времени когда день известен
                return addTime(this.dateMessage, this.array, secondKeywordInMessage, this.millisecondsTime, this.messageFuture)
            }
        }
        else if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword1)){ // только буквы
            if(arrayElementAfterKeyword1 == 'ноль' || arrayElementAfterKeyword1 == 'нуль'){ // если время указано ноль/нуль
                throw new Error('Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
            }
            else if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword1,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3,1) == 0 &&
                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4,1) == 0){
                throw new Error('Ошибка! Не указана единица времени');
            }
            else{
                let time:number = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword1, arrayElementAfterKeyword2)
                let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, this.array,keywordInMessage+1,keywordInMessage+2,keywordInMessage+3,keywordInMessage+4)
                this.messageFuture = objTime.message
                this.millisecondsTime = objTime.millisecondsTime
                return addTime(this.dateMessage, this.array, secondKeywordInMessage,this.millisecondsTime,this.messageFuture)
            }
        }
        else {
            throw new Error('Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
        }
    }
    CalculationsAndHandlingErrorsOnInputTo( keywordInMessage:number, timeMessage:number): MessageToSend{
        let arrayElementAfterKeyword1 = this.array[keywordInMessage+1] // элемент массива после ключевого слова - первый
        let arrayElementAfterKeyword2 = this.array[keywordInMessage+2] // элемент массива после ключевого слова - второй
        let arrayElementAfterKeyword3 = this.array[keywordInMessage+3] // элемент массива после ключевого слова - третий
        let arrayElementAfterKeyword4 = this.array[keywordInMessage+4] // элемент массива после ключевого слова - четвертый
        let arrayElementAfterKeyword5 = this.array[keywordInMessage+5] // элемент массива после ключевого слова - пятый
        let arrayElementAfterKeyword6 = this.array[keywordInMessage+6] // элемент массива после ключевого слова - шестой

        if(/^[0-9]*$/.test(arrayElementAfterKeyword1)) { // только цифры
            let time = parseInt(arrayElementAfterKeyword1) //время с типом число
            if(time == 0){
                time = 24
            }
            if(time > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,1) >= 3600000){
                throw new Error('Ошибка! Время не может быть больше 24');
            }
            else if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                throw new Error('Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
            }
            else if(!arrayElementAfterKeyword3){
                throw new Error('Ошибка! Не указана дата');
            }
            else{
                if (/[А-яЁё]/.test(arrayElementAfterKeyword3)){ // только буквы
                    if((arrayElementAfterKeyword3) == "в" || (arrayElementAfterKeyword3) == "во"){
                        let dayOfTheWeek = new DayOfTheWeek(arrayElementAfterKeyword4)
                        if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
                            let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
                            let futureDay = this.dateMessage.getDate() + differenceInDays
                            let futureDate = new Date(this.dateMessage.getFullYear(), this.dateMessage.getMonth(), futureDay)

                            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2,time)
                            const futureDateAndTime = new Date(futureMs)
                            this.millisecondsTime = futureDateAndTime.getTime() - this.dateMessage.getTime()
                            this.messageFuture = this.array.slice((keywordInMessage+5),this.array.length).join(' ')//сообщение, которое напоминаем
                            DateAsString(this.millisecondsTime,this.dateMessage)
                            return new MessageToSend(this.millisecondsTime, this.messageFuture)
                        }
                        throw new Error('')
                    }
                    else{
                        let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(arrayElementAfterKeyword3)
                        if((time < this.dateMessage.getHours()) && arrayElementAfterKeyword3 == 'сегодня'){
                            throw new Error('Ошибка! Время указано которое уже прошло - напомнить невозможно');
                        }
                        else if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3,1) >= 3600000){
                            throw new Error( 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
                        }
                        else if(futureDay  == -1){
                            throw new Error('Ошибка! Некорректно введена дата. Время указано, а дата нет.');
                        }
                        else{
                            let futureDate = new Date(this.dateMessage.getFullYear(), this.dateMessage.getMonth(), futureDay)
                            this.millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage,futureDate.getHours(),time,this.array,keywordInMessage+2)
                            this.messageFuture = this.array.slice((keywordInMessage+4),this.array.length).join(' ')//сообщение, которое напоминаем
                            DateAsString(this.millisecondsTime,this.dateMessage)
                            return new MessageToSend(this.millisecondsTime, this.messageFuture)
                        }
                    }
                    throw new Error('')
                }
                else if(!/[А-яЁё]/.test(arrayElementAfterKeyword3) && (arrayElementAfterKeyword3.includes('.') == true || arrayElementAfterKeyword3.includes('-') == true || arrayElementAfterKeyword3.includes('/') == true )) {
                    if  (this.array[keywordInMessage + 3][2] != this.array[keywordInMessage + 3][5] &&
                        (this.array[keywordInMessage + 3][2] != '.' || this.array[keywordInMessage + 3][2] != '-' ||  this.array[keywordInMessage + 3][2] != '/') &&
                        (this.array[keywordInMessage + 3][5] != '.' || this.array[keywordInMessage + 3][5] != '-' || this.array[keywordInMessage + 3][5] != '/') ||
                        (this.array[keywordInMessage + 3].length > 10) ||
                        (this.array[keywordInMessage + 3].length == 7) ||
                        (this.array[keywordInMessage + 3].length == 9)) {
                        throw new Error( 'Ошибка! Некорректно введена дата. Опечатка в дате!');
                    }
                    else {
                        let yearMessage
                        if (this.array[keywordInMessage + 3].length == 10) {
                            yearMessage = parseInt(arrayElementAfterKeyword3.substring(6, 12))
                        }
                        else if ((arrayElementAfterKeyword3.length == 8) && (String(this.dateMessage.getFullYear()).slice(2, 4) <= arrayElementAfterKeyword3.substring(6, 8))) {
                            yearMessage = parseInt(String(this.dateMessage.getFullYear()).slice(0, 2) + arrayElementAfterKeyword3.substring(6, 8))
                        }
                        else {
                            yearMessage = parseInt(String(parseInt(String(this.dateMessage.getFullYear()).slice(0, 2)) + 1) + arrayElementAfterKeyword3.substring(6, 8))
                        }
                        let monthMessage = parseInt(arrayElementAfterKeyword3.substring(3, 6)) - 1
                        let dayMessage = parseInt(arrayElementAfterKeyword3.substring(0, 2))
                        let futureDate = new Date(yearMessage, monthMessage, dayMessage)

                        this.messageFuture = this.array.slice((keywordInMessage+4),this.array.length).join(' ')//сообщение, которое напоминаем
                        this.millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage, futureDate.getHours(), time, this.array, keywordInMessage + 2)
                        DateAsString(this.millisecondsTime,this.dateMessage)

                        return new MessageToSend(this.millisecondsTime, this.messageFuture)
                    }
                }
                else {
                    throw new Error('Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | пт | субботу | 21.05.22 | 21-05-22 | 21/05/22 ');
                }
                throw new Error('')
            }
        }
        else if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword1)){ // только буквы
            let dayOfTheWeek = new DayOfTheWeek(arrayElementAfterKeyword1)
            if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
                let  differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
                let futureDay = this.dateMessage.getDate() + differenceInDays
                let futureDate = new Date(this.dateMessage.getFullYear(),this.dateMessage.getMonth(), futureDay)
                if(arrayElementAfterKeyword2 == "в"){
                    if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword3)){
                        if(convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3,1) == 0 &&
                            convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4,1) == 0 &&
                            convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword5,1) == 0 &&
                            convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword6,1) == 0){
                            throw new Error('Ошибка! Не указана единица времени');
                        }
                        else if (this.millisecondsTime < -1 || this.millisecondsTime == 0){
                            throw new Error('Ошибка! Некорректно указано время');
                        }
                        else {
                            let time:number =  convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword3, arrayElementAfterKeyword4)
                            if (arrayElementAfterKeyword3== 'ноль' || arrayElementAfterKeyword3 == 'нуль'){
                                time = 24
                            }
                            let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time,this.dateMessage.getHours(),futureDate.getHours(),this.array,keywordInMessage+3,keywordInMessage+4,keywordInMessage+5,keywordInMessage+6)
                            this.messageFuture = objTime.message
                            this.millisecondsTime = objTime.millisecondsTime
                            return new MessageToSend(this.millisecondsTime, this.messageFuture)
                        }
                    }
                    else {
                        let time:number = parseInt(arrayElementAfterKeyword3) //время с типом число
                        if (isNaN(time)){
                            throw new Error( 'Ошибка! Неизвестно время - исправьте ошибку');
                        }
                        else if(time > 24){
                            throw new Error( 'Ошибка! Время не может быть больше 24');
                        }
                        else{
                            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4,time)
                            const futureDateAndTime = new Date(futureMs)
                            this.millisecondsTime = futureDateAndTime.getTime() - this.dateMessage.getTime()
                            this.messageFuture = this.array.slice((keywordInMessage+5),this.array.length).join(' ')//сообщение, которое напоминаем
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

        }
        throw new Error('')
    }
}