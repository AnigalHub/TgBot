import ConvertTime from "../../../ConvertTime";
const convertTime = new ConvertTime()

function errorHandlingOfIncorrectFullDateEntry(keyword:string, dayMessage:number,monthMessage:number,yearMessage:number,date:Date,words:Array<string>,numberArrayElementResponsiveForTimeType:number){
    if  (keyword[2] != keyword[5] && (keyword.includes('.') == false || keyword.includes('/')== false
        || keyword.includes('-')== false) || (keyword.length > 10) || (keyword.length == 7) || (keyword.length == 9)) {
        throw new Error( '<b>Ошибка! Некорректно введена дата. </b>\n'+'Дата указывается: дд-мм-гггг (дд-мм-гг) | дд.мм.гггг (дд.мм.гг) | дд/мм/гггг (дд/мм/гг)');
    }
    if (dayMessage > 31){
        throw new Error( '<b>Ошибка! Некорректно введен день в дате. </b>\n'+'День не может быть больше 31. Максимальное число в месяце 30 или 31.');
    }
    if (dayMessage == 0){
        throw new Error( '<b>Ошибка! Некорректно введен день в дате. </b>\n'+'День не может быть меньше 01. Такого дня не существует.');
    }
    if(monthMessage > 11){
        throw new Error( '<b>Ошибка! Некорректно введен месяц в дате. </b>\n'+'Месяц не может быть больше 12. В году всего 12 месяцев');
    }
    if(monthMessage < 0){
        throw new Error( '<b>Ошибка! Некорректно введен месяц в дате. </b>\n'+'Месяц не может быть меньше 01. Год начинается с 01 месяца = январь.');
    }
    if(yearMessage < date.getFullYear()){
        throw new Error( '<b>Ошибка! Некорректно введен год в дате. </b>\n'+'Год меньше текущего. Напомнить в тот год, который уже прошел - невозможно!');
    }
    if (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        throw new Error('<b>Ошибка! Неизвестный тип времени </b>\n'+'(сек|мин|час)');
    }
    if((convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 1800000)){
        throw new Error( '<b>Ошибка! Некорректно введено время.</b>\n'+'Вместо времени указана неккоректно дата или непонятное время');
    }
}
export default errorHandlingOfIncorrectFullDateEntry