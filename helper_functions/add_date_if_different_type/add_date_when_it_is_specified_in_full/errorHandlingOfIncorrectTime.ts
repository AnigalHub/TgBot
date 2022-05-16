import ConvertTime from "../../../ConvertTime";
const convertTime = new ConvertTime()
import checkingTheTypeOfTime from "../../CheckingTheTypeOfTime";

//функция - Обработка ошибок неверного ввода времени
function errorHandlingOfIncorrectTime(words:Array<string>,numberArrayElementResponsiveForTimeType:number){
    //проверка на правильный ввод типа времени - минута/час/секунда
    checkingTheTypeOfTime(words,numberArrayElementResponsiveForTimeType)

    //проверка на то,что время не указано как дата - вместо времени: неделя/месяц/год
    if((convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 1800000)){
        throw new Error('<b>Ошибка! Некорректно введено время.</b>\n'+'Вместо времени указана неккоректно дата или непонятное время');
    }
}
export default errorHandlingOfIncorrectTime