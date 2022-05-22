import DayOfTheWeek from "../DayOfTheWeek";
import errorHandlingOfIncorrectTime from "./ErrorHandlingOfIncorrectTime";


function optionsForCheckingTimeAndDate(words:Array<string>, numberKeywordInMessage:number, arrayElementWithDate:string, timeRemind:number, numberArrayElementResponsiveForTimeType:number){

    console.log('optionsForCheckingTimeAndDate')

    if(new DayOfTheWeek(arrayElementWithDate).SearchForTheDayNumberOfTheWeek() == -1){
        if (arrayElementWithDate == undefined){
            arrayElementWithDate = words[numberKeywordInMessage-1]
        }
        errorHandlingOfIncorrectTime(timeRemind,words,words[numberArrayElementResponsiveForTimeType],arrayElementWithDate)
    }
    else {
        let arrayElementWithTimeType = words[numberArrayElementResponsiveForTimeType]
        if(timeRemind > 20  && timeRemind%10 != 0 ){
            arrayElementWithTimeType = words[numberArrayElementResponsiveForTimeType+1]
        }
        if (timeRemind == 1) {
            arrayElementWithTimeType = words[numberArrayElementResponsiveForTimeType-1]
        }
        errorHandlingOfIncorrectTime(timeRemind,words,arrayElementWithTimeType,words[numberKeywordInMessage])
    }
}

export default optionsForCheckingTimeAndDate
