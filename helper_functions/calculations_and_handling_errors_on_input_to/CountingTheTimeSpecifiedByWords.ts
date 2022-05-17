import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()

//функция - Подсчет времени, указанного словами
function countingTheTimeSpecifiedByWords(element1:string,element2:string):number {
    let time:number
    if(convertTime.ConvertTimeToMilliseconds(element1,1) != 0){
        time = 1
    }
    else if (convertTime.ConvertSmallNumberFromStringToNumber(element2) != 0){
        time = convertTime.ConvertLargeNumberFromStringToNumber(element1, element2)
    }
    else {
        time = convertTime.ConvertSmallNumberFromStringToNumber(element1)
    }
    return time
}
export default countingTheTimeSpecifiedByWords