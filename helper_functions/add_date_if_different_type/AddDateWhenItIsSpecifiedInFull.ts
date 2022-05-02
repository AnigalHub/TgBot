import MessageToSend from "../../MessageToSend";
import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()
import calculationOfTheYear from "./add_date_when_it_is_specified_in_full/CalculationOfTheYear"
import errorHandlingOfIncorrectFullDateEntry from "./add_date_when_it_is_specified_in_full/ErrorHandlingOfIncorrectFullDateEntry"

function addDateWhenItIsSpecifiedInFull(numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number, keyword:string, words:Array<string>,date:Date,timeMessageMs:number, time:number,messageFuture:string, millisecondsTime:number): MessageToSend {
    let monthMessage = parseInt(keyword.substring(3, 6)) - 1
    let dayMessage = parseInt(keyword.substring(0, 2))
    let yearMessage = calculationOfTheYear(keyword,date)

    errorHandlingOfIncorrectFullDateEntry(keyword,dayMessage,monthMessage,yearMessage,date,words,numberArrayElementResponsiveForTimeType)

    let futureDate = new Date(yearMessage, monthMessage, dayMessage)
    const futureDateMs = Date.parse(futureDate.toString()) //будущая дата в миллисекундах

    if ( convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        if (convertTime.ConvertSmallNumberFromStringToNumber(words[numberArrayElementResponsiveForTimeType]) != 0){
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')//сообщение, которое напоминаем
            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType+1)
        }
        else {
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType),words.length).join(' ')//сообщение, которое напоминаем
            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType-1)
        }
    }
    else {
        if(numberArrayElementResponsiveForTimeType < words.indexOf(keyword)){
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')//сообщение, которое напоминаем
        }
        else {
            messageFuture = words.slice((numberArrayElementResponsiveForTimeType+1),words.length).join(' ')//сообщение, которое напоминаем
        }
        millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType)
    }
    return new MessageToSend(millisecondsTime, messageFuture)
}

export default addDateWhenItIsSpecifiedInFull