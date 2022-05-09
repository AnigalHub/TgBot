import errorHandlingOfIncorrectTimeEntryUsingWords
    from "../add_time_when_day_is_known/ErrorHandlingOfIncorrectTimeEntryUsingWords";
import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()

function validationOfTimeInput(words:Array<string>,numberArrayElementResponsiveForTimeType:number){
    let wordIn:number = words.indexOf('в')
    if (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        throw new Error('<b>Ошибка! Неизвестный тип времени </b>\n'+'(сек | мин | час)');
    }
    if(!/^[0-9]*$/.test(words[wordIn+1])){
        errorHandlingOfIncorrectTimeEntryUsingWords(words[wordIn+1],words[wordIn+2])
    }
}

export default validationOfTimeInput