import errorHandlingOfIncorrectTimeEntryUsingWords
    from "../ErrorHandlingOfIncorrectTimeEntryUsingWords";
import checkingTheTypeOfTime from "../CheckingTheTypeOfTime";


function validationOfTimeInput(words:Array<string>,numberArrayElementResponsiveForTimeType:number){
    let wordIn:number = words.indexOf('в')

    checkingTheTypeOfTime(words,numberArrayElementResponsiveForTimeType)

    if(!/^[0-9]*$/.test(words[wordIn+1])){
        errorHandlingOfIncorrectTimeEntryUsingWords(words[wordIn+1],words[wordIn+2])
    }
}

export default validationOfTimeInput