import MessageToSend from "../MessageToSend";
import DayOfTheWeek from "../DayOfTheWeek";
import DateAsString from "./DateAsString";
import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()

function addDayWhenTimeAndDayOfTheWeekAreKnown(numberKeywordInMessage:number,arrayElementWithDayOfTheWeek:string,arrayElementWhitTime:string,date:Date,words:Array<string>,timeMessage:number,time:number,messageFuture:string,millisecondsTime:number) : MessageToSend{
    let dayOfTheWeek = new DayOfTheWeek(arrayElementWithDayOfTheWeek)
    if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
        if((convertTime.ConvertTimeToMilliseconds(arrayElementWhitTime,1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(arrayElementWhitTime,1) == 1800000)){
            throw new Error( 'Ошибка! Некорректно введено время. Вместо времени указана неккоректно дата или непонятное время');
        }
        else {
            let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
            let futureDay = date.getDate() + differenceInDays
            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)

            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementWhitTime,time)
            millisecondsTime = futureMs - timeMessage
            messageFuture = words.slice((numberKeywordInMessage+5),words.length).join(' ')//сообщение, которое напоминаем
            DateAsString(millisecondsTime,date)
            return new MessageToSend(millisecondsTime, messageFuture) }
    }
    throw new Error('Ошибка! Некорректно введен день (день недели). Пример: пн | пнд | понедельник ')
}
export default addDayWhenTimeAndDayOfTheWeekAreKnown
