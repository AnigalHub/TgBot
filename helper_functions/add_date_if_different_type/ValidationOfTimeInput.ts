import errorHandlingOfIncorrectTimeEntryUsingWords from "../ErrorHandlingOfIncorrectTimeEntryUsingWords";
import checkingTheTypeOfTime from "../CheckingTheTypeOfTime";

//функция - Проверка ввода времени
function validationOfTimeInput(words:Array<string>,numberArrayElementResponsiveForTimeType:number){
    let wordIn:number = words.indexOf('в')
    //проверка типа времени
    checkingTheTypeOfTime(words,numberArrayElementResponsiveForTimeType)

    //проверка - когда введено не число
    if(!/^[0-9]*$/.test(words[wordIn+1])){
        //обработка неправильного ввода времени словами
        errorHandlingOfIncorrectTimeEntryUsingWords(words[wordIn+1],words[wordIn+2])
    }
}

export default validationOfTimeInput