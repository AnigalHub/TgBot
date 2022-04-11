import ConvertTime from "../ConvertTime";
const convertTime = new ConvertTime()

function calculationTimeAndSearchTimeAndDateInArray(time:number,numberKeywordInMessage:number,wordsElementAfterKeyword1:string,
                                                    wordsElementAfterKeyword2:string,wordsElementAfterKeyword3:string,wordsElementAfterKeyword4:string) {
    let seconds:number = convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1)
    let numberArrayElementResponsiveForTimeType:number
    let arrayElementResponsiveForDateType:string

    if(time > 20 && time%10 != 0){
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage+3
        arrayElementResponsiveForDateType = wordsElementAfterKeyword4
    }
    else if(time%10 == 0 && seconds != 60000 && seconds != 180000 && seconds != 3600000 && seconds != 86400000 && seconds != 604800000
        && seconds != 2592000000 && seconds != 15768000000 && seconds != 31536000000){
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage+2
        arrayElementResponsiveForDateType = wordsElementAfterKeyword3
        time = convertTime.ConvertSmallNumberFromStringToNumber(wordsElementAfterKeyword1)
    }
    else {
        time = 1
        numberArrayElementResponsiveForTimeType = 2
        arrayElementResponsiveForDateType = wordsElementAfterKeyword2
    }
    return {time,numberArrayElementResponsiveForTimeType,arrayElementResponsiveForDateType}
}
export default calculationTimeAndSearchTimeAndDateInArray