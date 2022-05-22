import ConvertTime from './../../../ConvertTime'
const convertTime = new ConvertTime()
import MessageFutureAndMilliseconds from "./MessageFutureAndMilliseconds";

//Подсчет сообщения и миллисекунд, когда время раньше полной даты
function countingMessageAndMillisecondsWhenTimeAheadOfFullDate(keyword:string,futureDateMs:number,numberArrayElementResponsiveForTimeType:number,
                                                               words:Array<string>,timeMessageMs:number,
                                                               time:number,messageFuture:string, millisecondsTime:number):MessageFutureAndMilliseconds {
    //проверка - когда время указано раньше даты
    if(numberArrayElementResponsiveForTimeType < words.indexOf(keyword)){
        //сборка будущего сообщения
        messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')
    }
    //проверка - когда дата указана раньше времени
    else {
        //сборка будущего сообщения
        messageFuture = words.slice((numberArrayElementResponsiveForTimeType+1),words.length).join(' ')
    }
    //подсчет миллисекунд
    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType)

    return new MessageFutureAndMilliseconds(messageFuture, millisecondsTime)
}
export default countingMessageAndMillisecondsWhenTimeAheadOfFullDate