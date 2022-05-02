import MessageToSend from "./MessageToSend";
import addTimeWhenDayIsKnown from "./helper_functions/AddTimeWhenDayIsKnown";
import ConvertTime from "./ConvertTime";
const convertTime = new ConvertTime()
import DayOfTheWeek from "./DayOfTheWeek";
import addDateOfDifferentType from "./helper_functions/AddDateOfDifferentType"
import calculationTimeAndSearchTimeAndDateInArray from "./helper_functions/CalculationTimeAndSearchTimeAndDateInArray"
import errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry
    from "./helper_functions/calculations_and_handling_errors_on_input_through/ErrorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry";
import deleteFromArray from "./helper_functions/calculations_and_handling_errors_on_input_through/DeleteFromArray";
import errorHandlingInZeroMilliseconds
    from "./helper_functions/calculations_and_handling_errors_on_input_through/ErrorHandlingInZeroMilliseconds";
import countingTheTimeSpecifiedByWords
    from "./helper_functions/calculations_and_handling_errors_on_input_to/CountingTheTimeSpecifiedByWords";
import countingNumberArrayElementResponsiveForTimeType
    from "./helper_functions/calculations_and_handling_errors_on_input_to/CountingNumberArrayElementResponsiveForTimeType";


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

    CalculationsAndHandlingErrorsOnInputThrough(numberKeywordInMessage:number, timeMessage:number): MessageToSend{
        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
        let wordsElementAfterKeyword2 = this.words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
        let keywordIndexes = Array.from(this.words.entries()).filter(i => i[1] == this.words[numberKeywordInMessage]).map(i => i[0])

        if(keywordIndexes.length > 1){
            throw new Error('Ошибка! Несколько раз указан указатель времени "ЧЕРЕЗ"');
        }
        deleteFromArray(this.words,'сегодня')
        errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry(this.words,numberKeywordInMessage)

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)){ // только цифры
            let time = parseInt(wordsElementAfterKeyword1) // время с типом число
            this.messageFuture = this.words.slice((numberKeywordInMessage+3),this.words.length).join(' ')
            this.millisecondsTime = convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,time)
            errorHandlingInZeroMilliseconds(this.millisecondsTime)
            return addTimeWhenDayIsKnown(this.dateMessage, this.words, this.millisecondsTime, this.messageFuture)
        }
        else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
            let time:number = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword1, wordsElementAfterKeyword2)
            let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, this.words,numberKeywordInMessage+1,numberKeywordInMessage+2,numberKeywordInMessage+3,numberKeywordInMessage+4)
            this.messageFuture = objTime.message
            this.millisecondsTime = objTime.millisecondsTime
            errorHandlingInZeroMilliseconds(this.millisecondsTime)
            return addTimeWhenDayIsKnown(this.dateMessage, this.words,this.millisecondsTime,this.messageFuture)
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

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) { // только цифры
            let time = parseInt(wordsElementAfterKeyword1) //время с типом число
           // if(convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,dateOfDifferentType) != -1 && convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,wordsElementAfterKeyword3) != -1 &&
              //  convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,dateOfDifferentType) != convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,wordsElementAfterKeyword3)){
              //  throw new Error('Ошибка! Неккоректно введена дата. Дата введена несколько раз и разная!');
           // }
            let numberArrayElementResponsiveForTimeType:number = numberKeywordInMessage + 2
            let arrayElementWithDate:string
            if(convertTime.ConvertWordIndicatorOfTimeToNumber(this.dateMessage,dateOfDifferentType) != -1){
                arrayElementWithDate = dateOfDifferentType
            }
            else {
                arrayElementWithDate = wordsElementAfterKeyword3
            }
            return addDateOfDifferentType(this.dateMessage, arrayElementWithDate,numberArrayElementResponsiveForTimeType,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
        }
        else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
            const dayOfTheWeek = new DayOfTheWeek(wordsElementAfterKeyword1)

            if(dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){

                let numberArrayElementResponsiveForTimeType:number
                let time = parseInt(wordsElementAfterKeyword3) //время с типом число
                if(isNaN(time)){
                    time = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword3,wordsElementAfterKeyword4)
                    numberArrayElementResponsiveForTimeType = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage+2,wordsElementAfterKeyword1,wordsElementAfterKeyword2)
                }
                else {
                    numberArrayElementResponsiveForTimeType = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage+2,wordsElementAfterKeyword1,wordsElementAfterKeyword2)
                }
                  return addDateOfDifferentType(this.dateMessage,wordsElementAfterKeyword1,numberArrayElementResponsiveForTimeType ,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
            }
            else if (convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) != 0 ||
                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) != 0 ||
                convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) != 0
            ){
                let time:number = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword1,wordsElementAfterKeyword2)
                let numberArrayElementResponsiveForTimeType:number = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage,wordsElementAfterKeyword1,wordsElementAfterKeyword2)
                return addDateOfDifferentType(this.dateMessage,this.words[numberArrayElementResponsiveForTimeType+1],numberArrayElementResponsiveForTimeType ,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
            }
            else {
                let time:number = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword1,wordsElementAfterKeyword2)
                let numberArrayElementResponsiveForTimeType:number = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage,wordsElementAfterKeyword1,wordsElementAfterKeyword2)
                return addDateOfDifferentType(this.dateMessage,dateOfDifferentType,numberArrayElementResponsiveForTimeType ,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
            }
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
            let time:number = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword2,wordsElementAfterKeyword3)
            return addDateOfDifferentType(this.dateMessage,this.words[numberKeywordInMessage],numberKeywordInMessage + 3,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
        }
        else{
            throw new Error('Ошибка! В дате или времени содержатся неизвестные символы. Возможно время или дата указаны слитно')
        }
    }
}
