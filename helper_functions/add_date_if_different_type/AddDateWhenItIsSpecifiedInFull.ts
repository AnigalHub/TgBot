import MessageToSend from "../../MessageToSend";
import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()
import CalculationOfTheYear from "./add_date_when_it_is_specified_in_full/CalculationOfTheYear"
import ErrorHandlingOfIncorrectFullDateEntry from "./add_date_when_it_is_specified_in_full/ErrorHandlingOfIncorrectFullDateEntry"

function addDateWhenItIsSpecifiedInFull(numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number, keyword:string, words:Array<string>,date:Date,timeMessageMs:number, time:number,messageFuture:string, millisecondsTime:number): MessageToSend {
    if  (keyword[2] != keyword[5] && (keyword.includes('.') == false || keyword.includes('/')== false
        || keyword.includes('-')== false) || (keyword.length > 10) || (keyword.length == 7) || (keyword.length == 9)) {
        throw new Error( 'Ошибка! Некорректно введена дата. Опечатка в дате!');
    }
    else {

        let monthMessage = parseInt(keyword.substring(3, 6)) - 1

        let dayMessage = parseInt(keyword.substring(0, 2))
        let yearMessage = CalculationOfTheYear(keyword,date)
        ErrorHandlingOfIncorrectFullDateEntry(dayMessage,monthMessage,yearMessage,date,words,numberArrayElementResponsiveForTimeType)

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
}

export default addDateWhenItIsSpecifiedInFull
