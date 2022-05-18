import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()

//функция - Подсчет времени, указанного словами
function countingTheTimeSpecifiedByWords(element1:string,element2:string):number {
    //время
    let time:number

    //проверка - первая часть времени - не является типом времени (пример: в двадцать минут)
    if(convertTime.ConvertTimeToMilliseconds(element1,1) != 0){
        //время
        time = 1
    }
    //проверка - вторая часть времени - не является типом времени (пример: в двадцать две минуты)
    else if (convertTime.ConvertSmallNumberFromStringToNumber(element2) != 0){
        //время
        time = convertTime.ConvertLargeNumberFromStringToNumber(element1, element2)
    }
    //проверка - первая часть и есть тип времени (пример: в минуту)
    else {
        //время
        time = convertTime.ConvertSmallNumberFromStringToNumber(element1)
    }
    return time
}
export default countingTheTimeSpecifiedByWords