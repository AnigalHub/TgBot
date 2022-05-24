//функция - Обработка ошибок неверного ввода полной даты
function errorHandlingOfIncorrectFullDateEntry(keyword:string, dayMessage:number, monthMessage:number, yearMessage:number, date:Date){
    console.log('errorHandlingOfIncorrectFullDateEntry')

    //проверка на то, когда в дате не хватает символов илм это не дата, а содержатся: . или - или /
    if  (keyword[2] != keyword[5] && (keyword.includes('.') == false || keyword.includes('/')== false
        || keyword.includes('-')== false) || (keyword.length > 10) || (keyword.length == 7) || (keyword.length == 9)) {
        throw new Error( '<b>Ошибка! Некорректно введена дата. </b>\n'+'Дата указывается: дд-мм-гггг (дд-мм-гг) | дд.мм.гггг (дд.мм.гг) | дд/мм/гггг (дд/мм/гг) | день(число:дд) месяц(слово) год(число:гг|ггг)');
    }
    //проверка на то, что день в месяце не может превышать 31 день
    if (dayMessage > 31){
        throw new Error('<b>Ошибка! Некорректно введен день в дате. </b>\n'+'День не может быть больше 31. Максимальное число в месяце 30 или 31.');
    }
    //проверка на то, что день в дате не может быть равен 0
    if (dayMessage == 0){
        throw new Error('<b>Ошибка! Некорректно введен день в дате. </b>\n'+'День не может быть меньше 01. Такого дня не существует.');
    }
    //проверка на то, что месяц в дате (в js) не может быть больше 11
    if(monthMessage > 11){
        throw new Error('<b>Ошибка! Некорректно введен месяц в дате. </b>\n'+'Месяц не может быть больше 12. В году всего 12 месяцев');
    }
    //проверка на то, что месяц не может быть равен 0 и меньше 0
    if(monthMessage <= 0){
        throw new Error('<b>Ошибка! Некорректно введен месяц в дате. </b>\n'+'Месяц не может быть меньше 01. Год начинается с 01 месяца = январь.');
    }
    //проверка года в дате на то, что указаный год в дате меньше текущего
    if(yearMessage < date.getFullYear()){
        throw new Error('<b>Ошибка! Некорректно введен год в дате. </b>\n'+'Указанный год меньше текущего года. Напомнить в тот год, который уже прошел - невозможно!');
    }
    //проверка месяца в дате на то, что указаный месяц в дате меньше текущего
    if(yearMessage == date.getFullYear() && monthMessage < date.getMonth()){
        throw new Error('<b>Ошибка! Некорректно введа дата. </b>\n'+'Год указан текущий, а указанный месяц меньше текущего месяца. Напомнить в тот месяц, который уже прошел - невозможно!');
    }
    //проверка днч в дате на то, что указаный день в дате меньше текущего
    if(yearMessage == date.getFullYear() && monthMessage == date.getMonth() && dayMessage < date.getDate()){
        throw new Error('<b>Ошибка! Некорректно введа дата. </b>\n'+'Год и месяц указаны текущие, а указанный день меньше текущего дня. Напомнить в тот день, который уже прошел - невозможно!\'');
    }
}
export default errorHandlingOfIncorrectFullDateEntry