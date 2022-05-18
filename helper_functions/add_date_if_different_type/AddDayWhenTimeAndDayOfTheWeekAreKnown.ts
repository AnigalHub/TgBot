import MessageToSend from "../../MessageToSend";
import DayOfTheWeek from "../../DayOfTheWeek";
import ConvertTime from '../../ConvertTime'
import messageAssembly from "./add_day_when_time_is_known/MessageAssembly";
const convertTime = new ConvertTime()

//функция - Добавление дня, когда указано время и день недели
function addDayWhenTimeAndDayOfTheWeekAreKnown(numberKeywordInMessage:number,arrayElementWithDayOfTheWeek:string,arrayElementWithTime:string,date:Date,words:Array<string>,timeMessage:number,time:number,messageFuture:string,millisecondsTime:number) : MessageToSend{

    let dayOfTheWeek = new DayOfTheWeek(arrayElementWithDayOfTheWeek)

    if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
        if((convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) == 1800000)){
            throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Вместо времени указана неккоректно дата или время');
        }
        else {
            let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek(date)
            let futureDay = date.getDate() + differenceInDays
            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)

            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,time)
            millisecondsTime = futureMs - timeMessage
            messageFuture = messageAssembly(words,arrayElementWithTime,arrayElementWithDayOfTheWeek)
            return new MessageToSend(millisecondsTime, messageFuture)
        }
    }
    else {
        throw new Error('<b>Ошибка! Некорректно введен день (день недели). </b>\n'+' День недели указывается: пн|пнд|понедельник ')
    }
}
export default addDayWhenTimeAndDayOfTheWeekAreKnown
