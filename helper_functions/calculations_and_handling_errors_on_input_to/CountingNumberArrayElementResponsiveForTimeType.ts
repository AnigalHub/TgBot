import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()

//функция - Подсчет номера элемента массива, отвечающего за тип времени
function countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage:number,element1:string,element2:string):number {

    //номер элемента массива, отвечающего за тип времени
    let numberArrayElementResponsiveForTimeType:number

    //проверка - первая часть времени - не является типом времени (пример: в двадцать минут)
    if(convertTime.ConvertTimeToMilliseconds(element1,1) != 0){
        //номер элемента массива, отвечающего за тип времени
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 1
    }
    //проверка - вторая часть времени - не является типом времени (пример: в двадцать две минуты)
    else if (convertTime.ConvertSmallNumberFromStringToNumber(element2) != 0){
        //номер элемента массива, отвечающего за тип времени
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 3
    }
    //проверка - первая часть и есть тип времени (пример: в минуту)
    else {
        //номер элемента массива, отвечающего за тип времени
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 2
    }
    return numberArrayElementResponsiveForTimeType
}
export default countingNumberArrayElementResponsiveForTimeType