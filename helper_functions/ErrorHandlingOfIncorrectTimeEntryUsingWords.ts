import ConvertTime from "../ConvertTime";
const convertTime = new ConvertTime()

//функция - Обработка неправильного ввода времени словами
function errorHandlingOfIncorrectTimeEntryUsingWords(arrayElementAfterSecondKeyword1:string, arrayElementAfterSecondKeyword2:string) {
    console.log('errorHandlingOfIncorrectTimeEntryUsingWords')

    //время1 время2 тип_времени (пример: двадцать два часа)
    //время1 - числом - когда arrayElementAfterSecondKeyword1 - число указано словами (одним словом)
    let number1: number = convertTime.ConvertSmallNumberFromStringToNumber(arrayElementAfterSecondKeyword1)
    //время2 - числом - когда arrayElementAfterSecondKeyword1 - число указано словами (одним словом)
    let number2: number = convertTime.ConvertSmallNumberFromStringToNumber(arrayElementAfterSecondKeyword2)

    //проверка - когда в первой или второй части числа ошибка (неправильный ввод числа словами):
    //1. первая часть == 0 и это не тип времени (сек/мин/час)
    //2. вторая часть == 0 и это не тип времени (сек/мин/час) и также первая часть тоже не тип времени (сек/мин/час)
    if((number1 == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0) ||
        (number2 == 0 && (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 0)
        && (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0))){

        throw new Error('<b>Ошибка! Неккоректно введено время. </b>\n'+'Опечатка во времени после указателя времени "В".');
    }
}
export default errorHandlingOfIncorrectTimeEntryUsingWords