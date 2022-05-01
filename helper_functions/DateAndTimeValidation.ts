import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()
import ErrorHandlingOfIncorrectTimeEntry from "./add_time_when_day_is_known/ErrorHandlingOfIncorrectTimeEntry"
function dateAndTimeValidation(time:number,timeType:string,dateType:string){
    if(time == 0){
        time = 24
    }
    ErrorHandlingOfIncorrectTimeEntry(time,timeType)
    if(!timeType){
        throw new Error('Ошибка! Не указано тип времени (мин | сек | час)');
    }
    if(convertTime.ConvertTimeToMilliseconds(timeType,time) == 0){ //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
        throw new Error('Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
    }
    if(!dateType){
        throw new Error('Ошибка! Не указана дата');
    }
}

export default dateAndTimeValidation