import MessageToSend from "../MessageToSend";
import DayOfTheWeek from "../DayOfTheWeek";
import DateAsString from "./DateAsString";
import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()

function addDayWhenTimeAndDayOfTheWeekAreKnown(keywordInMessage:number,arrayElementWithDayOfTheWeek:string,arrayElementWhitTime:string,date:Date,words:Array<string>,timeMessage:number,time:number,messageFuture:string,millisecondsTime:number) : MessageToSend{
    let dayOfTheWeek = new DayOfTheWeek(arrayElementWithDayOfTheWeek)
    let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
    let futureDay = date.getDate() + differenceInDays
    let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)

    let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementWhitTime,time)
    millisecondsTime = futureMs - timeMessage
    messageFuture = words.slice((keywordInMessage+5),words.length).join(' ')//сообщение, которое напоминаем
    DateAsString(millisecondsTime,date)
    return new MessageToSend(millisecondsTime, messageFuture)
}
export default addDayWhenTimeAndDayOfTheWeekAreKnown
