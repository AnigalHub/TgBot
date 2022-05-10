import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()
import ErrorHandlingOfIncorrectTimeEntry from "./add_time_when_day_is_known/ErrorHandlingOfIncorrectTimeEntry"
function dateAndTimeValidation(time:number,timeType:string,dateType:string){
    if(time == 0){
        time = 24
    }
    ErrorHandlingOfIncorrectTimeEntry(time,timeType)
    if(!timeType){
        throw new Error('<b>Ошибка! Не указан тип времени. </b>\n'+'(мин | сек | час)');
    }
    if(convertTime.ConvertTimeToMilliseconds(timeType,time) == 0){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Пример: 10 сек | 15 минут | 9 часов');
    }
    if(!dateType){
        throw new Error('<b>Ошибка! Не указана дата</b>');
    }
}

export default dateAndTimeValidation