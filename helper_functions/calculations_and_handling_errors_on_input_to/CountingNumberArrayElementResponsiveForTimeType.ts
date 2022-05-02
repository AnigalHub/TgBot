import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()
function countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage:number,element1:string,element2:string):number {
    let numberArrayElementResponsiveForTimeType:number
    if(convertTime.ConvertTimeToMilliseconds(element1,1) != 0){
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 1
    }
    else if (convertTime.ConvertSmallNumberFromStringToNumber(element2) != 0){
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 3
    }
    else {
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 2
    }
    return  numberArrayElementResponsiveForTimeType
}
export default countingNumberArrayElementResponsiveForTimeType