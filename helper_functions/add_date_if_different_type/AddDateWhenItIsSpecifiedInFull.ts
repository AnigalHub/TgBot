import MessageToSend from "../../MessageToSend";
import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()
import calculationOfTheYear from "./add_date_when_it_is_specified_in_full/CalculationOfTheYear"
import errorHandlingOfIncorrectFullDateEntry from "./add_date_when_it_is_specified_in_full/ErrorHandlingOfIncorrectFullDateEntry"
import errorHandlingOfIncorrectTime from "./add_date_when_it_is_specified_in_full/errorHandlingOfIncorrectTime";

//функция - Добавление даты, когда дата указана полностью
function addDateWhenItIsSpecifiedInFull(numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number, keyword:string, words:Array<string>,date:Date,timeMessageMs:number, time:number,messageFuture:string, millisecondsTime:number): MessageToSend {

    //день
    let dayMessage = parseInt(keyword.substring(0, 2))
    //месяц
    let monthMessage = parseInt(keyword.substring(3, 6)) - 1
    //год
    let yearMessage = calculationOfTheYear(keyword,date)

    //обработка ошибок неверного ввода полной даты
    errorHandlingOfIncorrectFullDateEntry(keyword,dayMessage,monthMessage,yearMessage,date)
    //обработка ошибок неверного ввода времени
    errorHandlingOfIncorrectTime(words,numberArrayElementResponsiveForTimeType)

    //будущая дата - объект Data
    let futureDate = new Date(yearMessage, monthMessage, dayMessage)
    //будущая дата в миллисекундах
    const futureDateMs = Date.parse(futureDate.toString())

    if ( convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        if (convertTime.ConvertSmallNumberFromStringToNumber(words[numberArrayElementResponsiveForTimeType]) != 0){
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')
            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType+1)
        }
        else {
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType),words.length).join(' ')//сообщение, которое напоминаем
            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType-1)
        }
    }
    else {
        if(numberArrayElementResponsiveForTimeType < words.indexOf(keyword)){
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')
        }
        else {
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+1),words.length).join(' ')
        }
        millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType)
    }
    return new MessageToSend(millisecondsTime, messageFuture)
}

export default addDateWhenItIsSpecifiedInFull
