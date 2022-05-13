import MessageToSend from "../../MessageToSend";
import DayOfTheWeek from "../../DayOfTheWeek";
import ConvertTime from '../../ConvertTime'
import MessageAssembly from "./add_day_when_time_is_known/MessageAssembly";
const convertTime = new ConvertTime()


function addDayWhenTimeAndDayOfTheWeekAreKnown(numberKeywordInMessage:number,arrayElementWithDayOfTheWeek:string,arrayElementWithTime:string,date:Date,words:Array<string>,timeMessage:number,time:number,messageFuture:string,millisecondsTime:number) : MessageToSend{

    let dayOfTheWeek = new DayOfTheWeek(arrayElementWithDayOfTheWeek)

    if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
        if((convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) == 1800000)){
            throw new Error( 'Ошибка! Некорректно введено время. Вместо времени указана неккоректно дата или время');
        }
        else {
            let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek(date)
            let futureDay = date.getDate() + differenceInDays
            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)

            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,time)
            millisecondsTime = futureMs - timeMessage
            messageFuture = MessageAssembly(words,arrayElementWithTime,arrayElementWithDayOfTheWeek)
            return new MessageToSend(millisecondsTime, messageFuture)
        }
    }
    else {
        throw new Error('Ошибка! Некорректно введен день (день недели). Пример: пн | пнд | понедельник ')
    }
}
export default addDayWhenTimeAndDayOfTheWeekAreKnown
