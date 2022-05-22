import ConvertTime from './../../../ConvertTime'
const convertTime = new ConvertTime()
import MessageFutureAndMilliseconds from "./MessageFutureAndMilliseconds";


function countingMessageAndMillisecondsWhenFullDateAheadOfTime(futureDateMs:number,numberArrayElementResponsiveForTimeType:number,
                                                               words:Array<string>,timeMessageMs:number,
                                                               time:number,messageFuture:string, millisecondsTime:number):MessageFutureAndMilliseconds{
    //проверка - если время указано одним словом (один, пятнадцать)
    if (convertTime.ConvertSmallNumberFromStringToNumber(words[numberArrayElementResponsiveForTimeType]) != 0){
        //сборка будущего сообщения
        messageFuture = words.slice((numberArrayElementResponsiveForTimeType+2),words.length).join(' ')
        //подсчет миллисекунд
        millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType+1)
    }
    // проверка - если время указано не одним словом
    else {
        //сборка будущего сообщения
        messageFuture = words.slice((numberArrayElementResponsiveForTimeType),words.length).join(' ')//сообщение, которое напоминаем
        //подсчет миллисекунд
        millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessageMs, futureDateMs, time, words, numberArrayElementResponsiveForTimeType-1)
    }
    return new MessageFutureAndMilliseconds(messageFuture, millisecondsTime)
}
export default countingMessageAndMillisecondsWhenFullDateAheadOfTime