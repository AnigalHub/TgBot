import MessageToSend from "../../MessageToSend";
import DayOfTheWeek from "../../DayOfTheWeek";
import ConvertTime from '../../ConvertTime'
import messageAssembly from "./add_day_when_time_is_known/MessageAssembly";
const convertTime = new ConvertTime()
import errorHandlingWhenPastTimeOrTimeIsZero from "../ErrorHandlingWhenPastTimeOrTimeIsZero";

//функция - Добавление дня, когда указано время и день недели
function addDayWhenTimeAndDayOfTheWeekAreKnown(numberKeywordInMessage:number,arrayElementWithDayOfTheWeek:string,arrayElementWithTime:string,date:Date,words:Array<string>,timeMessage:number,time:number,messageFuture:string,millisecondsTime:number) : MessageToSend{
    console.log('addDayWhenTimeAndDayOfTheWeekAreKnown')
    //день недели
    let dayOfTheWeek = new DayOfTheWeek(arrayElementWithDayOfTheWeek)

    //проверка - является dayOfTheWeek - днем недели (пн/вт/ср...)
    if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
        //проверка - не введено вместо времени - дата (т е вместо сек/мин/час - дни/недели/месяцы)
        if((convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,1) == 1800000)){
            throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Вместо времени указана неккоректно дата или время');
        }
        else {
            //разница между днями недели
            let differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek(date)
            //будущий день
            let futureDay = date.getDate() + differenceInDays
            //будущая дата - объект Data
            let futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay)
            //будущая дата в миллисекундах
            let futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementWithTime,time)
            //подсчет миллисекунд
            millisecondsTime = futureMs - timeMessage
            //проверка времени на прошлое
            errorHandlingWhenPastTimeOrTimeIsZero(millisecondsTime)
            //сборка будущего сообщения
            messageFuture = messageAssembly(words,arrayElementWithTime,arrayElementWithDayOfTheWeek)

            return new MessageToSend(millisecondsTime, messageFuture)
        }
    }
    //проверка - не является dayOfTheWeek - днем недели (пн/вт/ср...)
    else {
        throw new Error('<b>Ошибка! Некорректно введен день (день недели). </b>\n'+' День недели указывается: пн|пнд|понедельник ')
    }
}
export default addDayWhenTimeAndDayOfTheWeekAreKnown
