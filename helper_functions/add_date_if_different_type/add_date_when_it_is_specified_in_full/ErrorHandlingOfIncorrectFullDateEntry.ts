import ConvertTime from "../../../ConvertTime";
const convertTime = new ConvertTime()

function errorHandlingOfIncorrectFullDateEntry(dayMessage:number,monthMessage:number,yearMessage:number,date:Date,words:Array<string>,numberArrayElementResponsiveForTimeType:number){
    if (dayMessage > 31){
        throw new Error( 'Ошибка! Некорректно введен день в дате. День не может быть больше 31. Максимальное число в месяце 30 или 31.');
    }
    if (dayMessage == 0){
        throw new Error( 'Ошибка! Некорректно введен день в дате. День не может быть меньше 01. Такого дня не существует.');
    }
    if(monthMessage > 11){
        throw new Error( 'Ошибка! Некорректно введен месяц в дате. Месяц не может быть больше 12. В году всего 12 месяцев');
    }
    if(monthMessage < 0){
        throw new Error( 'Ошибка! Некорректно введен месяц в дате. Месяц не может быть меньше 01. Год начинается с 01 месяца = январь.');
    }
    if(yearMessage < date.getFullYear()){
        throw new Error( 'Ошибка! Некорректно введен год в дате. Год меньше текущего. Напомнить в тот год, который уже прошел - невозможно!');
    }
    if((convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) > 3600000) || (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 1800000)){
        throw new Error( 'Ошибка! Некорректно введено время. Вместо времени указана неккоректно дата или непонятное время');
    }
}
export default errorHandlingOfIncorrectFullDateEntry