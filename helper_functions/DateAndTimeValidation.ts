import ConvertTime from '../ConvertTime'
const convertTime = new ConvertTime()
import ErrorHandlingOfIncorrectTimeEntry from "./ErrorHandlingOfIncorrectTimeEntry"

//функция - Проверка даты и времени
function dateAndTimeValidation(time:number,timeType:string,dateType:string){
    //проверка - если время указано как 0
    if(time == 0){
        time = 24
        return time
    }
    //обработка неправильного ввода времени
    ErrorHandlingOfIncorrectTimeEntry(time,timeType)

    //проверка - не указан тип времени (не введен)
    if(!timeType){
        throw new Error('<b>Ошибка! Не указан тип времени. </b>\n'+'(мин | сек | час)');
    }
    //проверка - неккоректно введено время - тип времени
    if(convertTime.ConvertTimeToMilliseconds(timeType,time) == 0){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Пример: 10 сек | 15 минут | 9 часов');
    }
    //проверка - не указана дата (не введена)
    if(!dateType){
        throw new Error('<b>Ошибка! Не указана дата</b>');
    }
}

export default dateAndTimeValidation