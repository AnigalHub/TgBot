import MessageToSend from "../../MessageToSend";
import ConvertTime from '../../ConvertTime'
const convertTime = new ConvertTime()
import errorHandlingOfIncorrectDateOrTimeEntry from "./add_day_when_time_is_known/ErrorHandlingOfIncorrectDateOrTimeEntry"

function addDayWhenTimeIsKnown(date:Date, dayRemind:string, timeRemind:number, dateMs:number, words:Array<string>,
                               numberKeywordInMessage:number,numberArrayElementResponsiveForTimeType:number,
                               messageFuture:string, millisecondsTime:number) : MessageToSend {

    let futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(date,dayRemind)
    errorHandlingOfIncorrectDateOrTimeEntry(date, dayRemind,timeRemind,futureDay)
    let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
    const futureDateMs = Date.parse(futureDate.toString())  //будущая дата в миллисекундах

    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs, futureDateMs, timeRemind, words, numberArrayElementResponsiveForTimeType)
    messageFuture = words.slice((numberArrayElementResponsiveForTimeType + 2), words.length).join(' ')//сообщение, которое напоминаем
    return new MessageToSend(millisecondsTime, messageFuture)
}
export default addDayWhenTimeIsKnown