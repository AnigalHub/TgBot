import MessageToSend from "./MessageToSend";
import addTimeWhenDayIsKnown from "./helper_functions/AddTimeWhenDayIsKnown";
import ConvertTime from "./ConvertTime";
const convertTime = new ConvertTime()
import addDateOfDifferentType from "./helper_functions/AddDateOfDifferentType"
import errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry
    from "./helper_functions/calculations_and_handling_errors_on_input_through/ErrorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry";
import deleteFromArray from "./helper_functions/calculations_and_handling_errors_on_input_through/DeleteFromArray";
import errorHandlingInZeroMilliseconds
    from "./helper_functions/calculations_and_handling_errors_on_input_through/ErrorHandlingInZeroMilliseconds";
import calculatingTimeAndDateInWords
    from "./helper_functions/calculations_and_handling_errors_on_input_to/CalculatingTimeAndDateInWords";


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
        let time:number

        if(keywordIndexes.length > 1){
            throw new Error('Ошибка! Несколько раз указан указатель времени "ЧЕРЕЗ"');
        }
        deleteFromArray(this.words,'сегодня')
        errorHandlingOfIncorrectTimeAndWordIndicatorOfDateEntry(this.words,numberKeywordInMessage)

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1)){ // только цифры
            time = parseInt(wordsElementAfterKeyword1) // время с типом число
            this.messageFuture = this.words.slice((numberKeywordInMessage+3),this.words.length).join(' ')
            this.millisecondsTime = convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,time)
            errorHandlingInZeroMilliseconds(this.millisecondsTime)
            return addTimeWhenDayIsKnown(this.dateMessage, this.words, this.millisecondsTime, this.messageFuture)
        }
        else if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
            time = convertTime.ConvertLargeNumberFromStringToNumber(wordsElementAfterKeyword1, wordsElementAfterKeyword2)
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
        let wordsElementAfterKeyword1 = this.words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый

        let time:number
        let arrayElementWithDate:string
        let numberArrayElementResponsiveForTimeType:number

        if(/^[0-9]*$/.test(wordsElementAfterKeyword1) || /^[А-яЁё]*$/.test(wordsElementAfterKeyword1)) { // только цифры
            let obj = calculatingTimeAndDateInWords(this.dateMessage,this.words,numberKeywordInMessage)
            time = obj.time
            arrayElementWithDate =obj.arrayElementWithDate
            numberArrayElementResponsiveForTimeType = obj.numberArrayElementResponsiveForTimeType
            return addDateOfDifferentType(this.dateMessage, arrayElementWithDate,numberArrayElementResponsiveForTimeType,time,timeMessage, this.words, numberKeywordInMessage,this.messageFuture, this.millisecondsTime)
        }
        else{
            throw new Error('Ошибка! В дате или времени содержатся неизвестные символы. Возможно время или дата указаны слитно')
        }

    }
}
