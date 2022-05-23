import MessageToSend from "../../MessageToSend";
import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()
import calculationOfTheYear from "./add_date_when_it_is_specified_in_full/CalculationOfTheYear"
import errorHandlingOfIncorrectFullDateEntry from "./add_date_when_it_is_specified_in_full/ErrorHandlingOfIncorrectFullDateEntry"
import errorHandlingOfIncorrectTime from "../ErrorHandlingOfIncorrectTime"
import countingMessageAndMillisecondsWhenFullDateAheadOfTime
    from "./add_date_when_it_is_specified_in_full/CountingMessageAndMillisecondsWhenFullDateAheadOfTime";
import countingMessageAndMillisecondsWhenTimeAheadOfFullDate
    from "./add_date_when_it_is_specified_in_full/CountingMessageAndMillisecondsWhenTimeAheadOfFullDate";
import errorHandlingWhenPastTimeOrTimeIsZero from "../ErrorHandlingWhenPastTimeOrTimeIsZero";



//функция - Добавление даты, когда дата указана полностью
function addDateWhenItIsSpecifiedInFull(numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number,
                                        keyword:string, words:Array<string>,date:Date,timeMessageMs:number, time:number,messageFuture:string, millisecondsTime:number): MessageToSend {
    console.log('addDateWhenItIsSpecifiedInFull')

    //день
    let dayMessage = parseInt(keyword.substring(0, 2))
    //месяц
    let monthMessage = parseInt(keyword.substring(3, 6)) - 1
    //год
    let yearMessage = calculationOfTheYear(keyword,date)

    //обработка ошибок неверного ввода полной даты
    errorHandlingOfIncorrectFullDateEntry(keyword,dayMessage,monthMessage,yearMessage,date)
    //обработка ошибок неверного ввода времени
    errorHandlingOfIncorrectTime(time,words,words[numberArrayElementResponsiveForTimeType],keyword)

    //будущая дата - объект Data
    let futureDate = new Date(yearMessage, monthMessage, dayMessage)
    //будущая дата в миллисекундах
    const futureDateMs = Date.parse(futureDate.toString())

    //проверка - когда words[numberArrayElementResponsiveForTimeType] - является типом времени (сек/мин/час)
    if (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        //Подсчет сообщения и миллисекунд, когда полная дата раньше времени
        let obj = countingMessageAndMillisecondsWhenFullDateAheadOfTime(futureDateMs, numberArrayElementResponsiveForTimeType, words, timeMessageMs, time, messageFuture, millisecondsTime)
        //сборка будущего сообщения
        messageFuture = obj.messageFuture
        //подсчет миллисекунд
        millisecondsTime = obj.milliseconds
    }
    //проверка - когда words[numberArrayElementResponsiveForTimeType] - не является типом времени (сек/мин/час)
    else {
        //Подсчет сообщения и миллисекунд, когда время раньше полной даты
        let obj = countingMessageAndMillisecondsWhenTimeAheadOfFullDate(keyword, futureDateMs, numberArrayElementResponsiveForTimeType, words, timeMessageMs, time, messageFuture, millisecondsTime)
        //сборка будущего сообщения
        messageFuture = obj.messageFuture
        //подсчет миллисекунд
        millisecondsTime = obj.milliseconds
    }
    errorHandlingWhenPastTimeOrTimeIsZero(millisecondsTime)
    return new MessageToSend(millisecondsTime, messageFuture)
}

export default addDateWhenItIsSpecifiedInFull
