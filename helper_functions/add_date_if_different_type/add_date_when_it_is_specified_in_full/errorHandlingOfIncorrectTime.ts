import ConvertTime from "../../../ConvertTime";
const convertTime = new ConvertTime()

//функция - Обработка ошибок неверного ввода времени
function errorHandlingOfIncorrectTime(words:Array<string>,numberArrayElementResponsiveForTimeType:number){
    if (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        throw new Error('<b>Ошибка! Неизвестный тип времени </b>\n'+'(сек | мин | час)');
    }
    if((convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 1800000)){
        throw new Error('<b>Ошибка! Некорректно введено время.</b>\n'+'Вместо времени указана неккоректно дата или непонятное время');
    }
}
export default errorHandlingOfIncorrectTime