import MessageToSend from "./MessageToSend";
import addTime from "./helper_functions/AddTimeWhenDayIsKnown";
import ConvertTime from "./ConvertTime";
const convertTime = new ConvertTime()
import DayOfTheWeek from "./DayOfTheWeek";
import addDateOfDifferentType from "./helper_functions/AddDateOfDifferentType"
import calculationTimeAndSearchTimeAndDateInArray from "./helper_functions/CalculationTimeAndSearchTimeAndDateInArray"


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

        let wordsElementBeforeKeyword1 = this.words[numberKeywordInMessage-1] // элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
        let wordsElementAfterKeyword3 = this.words[numberKeywordInMessage+3] // элемент массива после ключевого слова - третий
        let wordsElementAfterKeyword4 = this.words[numberKeywordInMessage+4] // элемент массива после ключевого слова - четвертый
        let keywordIndexes = Array.from(this.words.entries()).filter(i => i[1] == this.words[numberKeywordInMessage]).map(i => i[0])

        if(keywordIndexes.length > 1){
            throw new Error('Ошибка! Несколько раз указан указатель времени "ЧЕРЕЗ"');
        }

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)){ // только цифры
            let time = parseInt(wordsElementAfterKeyword1) // время с типом число
            if((wordsElementBeforeKeyword1 == 'завтра' || wordsElementBeforeKeyword1 == 'послезавтра' || wordsElementBeforeKeyword1 == 'послепослезавтра') ||
                (wordsElementAfterKeyword3 == 'завтра' || wordsElementAfterKeyword3 == 'послезавтра' || wordsElementAfterKeyword3 == 'послепослезавтра'
                && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) != 0)){
                throw new Error('Ошибка! Несовместимое время и дата. Неизвестно когда напоминать');
            }
            else if(wordsElementAfterKeyword3 == 'сегодня'){
                this.messageFuture = this.words.slice((numberKeywordInMessage+4),this.words.length).join(' ') // сообщение, которое напоминаем
            }
            else {
                this.messageFuture = this.words.slice((numberKeywordInMessage+3),this.words.length).join(' ') // сообщение, которое напоминаем
            }
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
                throw new Error('Ошибка! Некорректно указана единица времени: отсутствует или опечатка');
            }
            else{
                let time:number = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword1, wordsElementAfterKeyword2)
                let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, this.words,numberKeywordInMessage+1,numberKeywordInMessage+2,numberKeywordInMessage+3,numberKeywordInMessage+4)
                this.messageFuture = objTime.message
                this.millisecondsTime = objTime.millisecondsTime
                if(this.millisecondsTime == 0){
                    throw new Error('Ошибка! Некорректное время: опечатка или отсутствие');
                }
                else if((wordsElementBeforeKeyword1 == 'завтра' || wordsElementBeforeKeyword1 == 'послезавтра' || wordsElementBeforeKeyword1 == 'послепослезавтра')
                    || (wordsElementAfterKeyword2 == 'завтра' || wordsElementAfterKeyword2 == 'послезавтра' || wordsElementAfterKeyword2 == 'послепослезавтра' && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) != 0)
                    || (wordsElementAfterKeyword3 == 'завтра' || wordsElementAfterKeyword3 == 'послезавтра' || wordsElementAfterKeyword3 == 'послепослезавтра' && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) != 0)
                    || (wordsElementAfterKeyword4 == 'завтра' || wordsElementAfterKeyword4 == 'послезавтра' || wordsElementAfterKeyword4 == 'послепослезавтра' && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) != 0)
                    ){
                    throw new Error('Ошибка! Несовместимое время и дата. Неизвестно когда напоминать');
                }
                else {
                    return addTime(this.dateMessage, this.words, secondKeywordInMessage,this.millisecondsTime,this.messageFuture)
                }
            }
        }
        else {
            throw new Error('Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
        }
    }
    CalculationsAndHandlingErrorsOnInputTo(numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        let dateOfDifferentType = this.words[numberKeywordInMessage-1] // элемент, в котором может быть указа дата (сегодня/завтра/послезавтра)
        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
        let wordsElementAfterKeyword3 = this.words[numberKeywordInMessage+3] // элемент массива после ключевого слова - третий
        let wordsElementAfterKeyword4 = this.words[numberKeywordInMessage+4] // элемент массива после ключевого слова - четвертый
        let wordsElementAfterKeyword5 = this.words[numberKeywordInMessage+5] // элемент массива после ключевого слова - пятый

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) { // только цифры
            let time = parseInt(wordsElementAfterKeyword1) //время с типом число
            if(convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,dateOfDifferentType) != -1 && convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,wordsElementAfterKeyword3) != -1 &&
                convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,dateOfDifferentType) != convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,wordsElementAfterKeyword3)){
                throw new Error('Ошибка! Неккоректно введена дата. Дата введена несколько раз и разная!');
            }
            else if(convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,dateOfDifferentType) != -1){
                return addDateOfDifferentType(this.dateMessage,dateOfDifferentType,numberKeywordInMessage + 2,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
            }
            else {
                return addDateOfDifferentType(this.dateMessage,wordsElementAfterKeyword3,numberKeywordInMessage + 2,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
            }
        }
        else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
            console.log(wordsElementAfterKeyword1)
            const dayOfTheWeek = new DayOfTheWeek(wordsElementAfterKeyword1)
            let a = dayOfTheWeek.SearchForTheDayNumberOfTheWeek()

            console.log(dayOfTheWeek)
            console.log('это',a)

          //  if(convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) == 0 && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) == 0 && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) == 0 && convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword4,1) == 0){
              //  throw new Error('Ошибка! Не указана единица времени');
          //  }
          //  else{
                let time:number = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword1, wordsElementAfterKeyword2)
                let objTimeAndDate = calculationTimeAndSearchTimeAndDateInArray(time,numberKeywordInMessage,wordsElementAfterKeyword1, wordsElementAfterKeyword2,wordsElementAfterKeyword3,wordsElementAfterKeyword4)

                let numberArrayElementResponsiveForTimeType:number = objTimeAndDate.numberArrayElementResponsiveForTimeType
                let arrayElementResponsiveForDateType:string = objTimeAndDate.arrayElementResponsiveForDateType
                time = objTimeAndDate.time
                return addDateOfDifferentType(this.dateMessage,arrayElementResponsiveForDateType,numberArrayElementResponsiveForTimeType,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
           //}
        }
        else{
            throw new Error('Ошибка! В дате или времени содержатся неизвестные символы. Возможно время или дата указаны слитно')
        }
    }
    CalculationsAndHandlingErrorsOnInputDateFull( numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
        let wordsElementAfterKeyword3 = this.words[numberKeywordInMessage+3] // элемент массива после ключевого слова - второй
        if(/^[0-9]*$/.test(wordsElementAfterKeyword2)) { // только цифры
            let time = parseInt(wordsElementAfterKeyword2) //время с типом число
            return addDateOfDifferentType(this.dateMessage,this.words[numberKeywordInMessage],numberKeywordInMessage + 3,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
        }
        else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword2)){ // только буквы
            let time:number
            if(convertTime.ConvertTimeToMilliseconds(this.words[numberKeywordInMessage + 2],1) != 0){
                time = 1
            }
            else if (convertTime.ConvertSmallNumberFromStringToNumber(this.words[numberKeywordInMessage + 3]) != 0){
                time = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword2, wordsElementAfterKeyword3)
            }
            else {
                time = convertTime.ConvertSmallNumberFromStringToNumber(this.words[numberKeywordInMessage + 2])
            }
            return addDateOfDifferentType(this.dateMessage,this.words[numberKeywordInMessage],numberKeywordInMessage + 3,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
       }
        else{
            throw new Error('Ошибка! В дате или времени содержатся неизвестные символы. Возможно время или дата указаны слитно')
        }
    }
}
