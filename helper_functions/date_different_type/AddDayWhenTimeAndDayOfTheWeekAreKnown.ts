import MessageToSend from "../../MessageToSend";
import DayOfTheWeek from "../../DayOfTheWeek";
import ConvertTime from '../../ConvertTime'
const convertTime = new ConvertTime()

function addDayWhenTimeAndDayOfTheWeekAreKnown(numberKeywordInMessage:number,arrayElementWithDayOfTheWeek:string,arrayElementWithTime:string,date:Date,words:Array<string>,timeMessage:number,time:number,messageFuture:string,millisecondsTime:number) : MessageToSend{
    console.log(numberKeywordInMessage,arrayElementWithDayOfTheWeek,arrayElementWithTime,date,words,timeMessage,time,messageFuture,millisecondsTime)
    let startFutureMessage = words.indexOf(arrayElementWithTime) +3
    let dayOfTheWeek = new DayOfTheWeek(arrayElementWithDayOfTheWeek)

    if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
        if((convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) == 1800000)){
            throw new Error( 'Ошибка! Некорректно введено время. Вместо времени указана неккоректно дата или непонятное время');
        }
        else {
            let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek()
            let futureDay = date.getDate() + differenceInDays
            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)

            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,time)
            millisecondsTime = futureMs - timeMessage
            messageFuture = words.slice((startFutureMessage),words.length).join(' ')//сообщение, которое напоминаем
            return new MessageToSend(millisecondsTime, messageFuture) }
    }
    throw new Error('Ошибка! Некорректно введен день (день недели). Пример: пн | пнд | понедельник ')
}
export default addDayWhenTimeAndDayOfTheWeekAreKnown
