import ConvertTime from "../ConvertTime";
import errorHandlingOfIncorrectTimeEntryUsingWords from "./ErrorHandlingOfIncorrectTimeEntryUsingWords";
const convertTime = new ConvertTime()
import DayOfTheWeek from "../DayOfTheWeek";


//функция - Обработка ошибок неверного ввода времени
function errorHandlingOfIncorrectTime(time:number,words:Array<string>,arrayElementWithTimeType:string,arrayElementWithDate:string){
    console.log('errorHandlingOfIncorrectTime')

    let wordIn:number = words.indexOf('в')

    //проверка - не указан тип времени (не введен)
    if(!arrayElementWithTimeType){
        throw new Error('<b>Ошибка! Не указан тип времени. </b>\n'+'(сек | мин | час)');
    }
    //проверка - неккоректно введено время - тип времени
    if(convertTime.ConvertTimeToMilliseconds(arrayElementWithTimeType,time) == 0){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Пример: 10 сек | 15 минут | 9 часов');
    }
    //проверка - не указана дата (не введена)
    if(!arrayElementWithDate){
        throw new Error('<b>Ошибка! Не указана дата</b>');
    }
    //проверка на правильный ввод типа времени - минута/час/секунда
    if (convertTime.ConvertTimeToMilliseconds(arrayElementWithTimeType,1) == 0){
        throw new Error('<b>Ошибка! Неизвестный тип времени </b>\n'+'(сек | мин | час)');
    }
    //проверка - если время указано как 0
    if(time == 0){
        time = 24
        return time
    }
    //проверка когда время указано больше 24 часов
    if (time > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementWithTimeType,1) == 3600000){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Время не может быть больше 24 часов');
    }
    //проверка когда время указано больше 59 минут/секунд
    if (time > 59 && (convertTime.ConvertTimeToMilliseconds(arrayElementWithTimeType,1) == 60000 || convertTime.ConvertTimeToMilliseconds(arrayElementWithTimeType,1) == 1000)){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Время не может быть больше 59 секунд/минут');
    }

    //проверка на то,что время не указано как дата - вместо времени: неделя/месяц/год
    if(!/[А-яЁё]/.test(arrayElementWithDate) && (arrayElementWithDate.includes('.') == true || arrayElementWithDate.includes('-') == true || arrayElementWithDate.includes('/') == true ) &&
        (convertTime.ConvertTimeToMilliseconds(arrayElementWithTimeType,1) > 3600000) ||
        (convertTime.ConvertTimeToMilliseconds(arrayElementWithTimeType,1) == 1800000)){
        throw new Error('<b>Ошибка! Некорректно введено время.</b>\n'+'Вместо времени указана неккоректно дата или непонятное время');
    }
    //проверка - когда введено не число
    if(!/^[0-9]*$/.test(words[wordIn+1]) && new DayOfTheWeek(words[wordIn+1]).SearchForTheDayNumberOfTheWeek() == -1){
        //обработка неправильного ввода времени словами
        errorHandlingOfIncorrectTimeEntryUsingWords(words[wordIn+1],words[wordIn+2])
    }
}
export default errorHandlingOfIncorrectTime