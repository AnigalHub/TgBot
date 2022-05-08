import errorHandlingOfIncorrectTimeEntryUsingWords
    from "../add_time_when_day_is_known/ErrorHandlingOfIncorrectTimeEntryUsingWords";

function validationOfTimeInput(words:Array<string>,arrayElementWithDate:string){
    let wordIn:number = words.indexOf('в')
    if (arrayElementWithDate == undefined){
        throw new Error('Ошибка! Неизвестный тип времени (сек|мин|час)');
    }
    if(!/^[0-9]*$/.test(words[wordIn+1])){
        errorHandlingOfIncorrectTimeEntryUsingWords(words[wordIn+1],words[wordIn+2])
    }
}

export default validationOfTimeInput