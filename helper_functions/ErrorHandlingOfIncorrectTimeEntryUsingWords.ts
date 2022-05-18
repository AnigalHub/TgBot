import ConvertTime from "../ConvertTime";
const convertTime = new ConvertTime()

//функция - Обработка неправильного ввода времени словами
function errorHandlingOfIncorrectTimeEntryUsingWords(arrayElementAfterSecondKeyword1:string, arrayElementAfterSecondKeyword2:string) {
    let number1: number = convertTime.ConvertSmallNumberFromStringToNumber(arrayElementAfterSecondKeyword1)
    let number2: number = convertTime.ConvertSmallNumberFromStringToNumber(arrayElementAfterSecondKeyword2)

    if((number1 == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0) ||
        (number2 == 0 && (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 0)
        && (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0))){
        throw new Error('<b>Ошибка! Неккоректно введено время. </b>\n'+'Опечатка во времени после указателя времени "В".');
    }
}
export default errorHandlingOfIncorrectTimeEntryUsingWords