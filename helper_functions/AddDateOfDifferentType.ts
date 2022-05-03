import MessageToSend from "../MessageToSend";
import addDateWhenItIsSpecifiedInFull from "./add_date_if_different_type/AddDateWhenItIsSpecifiedInFull";
import addDayOfTheWeek from "./add_date_if_different_type/AddDayWhenTimeAndDayOfTheWeekAreKnown";
import AddDayWhenTimeIsKnown from "./add_date_if_different_type/AddDayWhenTimeIsKnown";
import dateAndTimeValidation from  "../helper_functions/DateAndTimeValidation"
import DayOfTheWeek from "../DayOfTheWeek";
import ConvertTime from "./../ConvertTime";
const convertTime = new ConvertTime()

function addDateOfDifferentType(date:Date,arrayElementWithDate:string,numberArrayElementResponsiveForTimeType:number,timeRemind:number,dateMs:number,
                                words:Array<string>, numberKeywordInMessage:number,messageFuture:string, millisecondsTime:number) : MessageToSend {

    //dateAndTimeValidation(timeRemind,words[numberArrayElementResponsiveForTimeType],arrayElementWithDate)
    if(!/[А-яЁё]/.test(arrayElementWithDate) && (arrayElementWithDate.includes('.') == true || arrayElementWithDate.includes('-') == true || arrayElementWithDate.includes('/') == true )) {
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberArrayElementResponsiveForTimeType,arrayElementWithDate,words,date,dateMs, timeRemind, messageFuture,millisecondsTime)
    }
    else if (/[А-яЁё]/.test(arrayElementWithDate)){ // только буквы
        const beforeDayOfTheWeek = new DayOfTheWeek(arrayElementWithDate)
        const afterDayOfTheWeek = new DayOfTheWeek(words[numberArrayElementResponsiveForTimeType+2])
        if(beforeDayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
         let dayOfTheWeek:string
           if(convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType-1],1) != 0){
               dayOfTheWeek = words[numberArrayElementResponsiveForTimeType-1]
           }
           else if(convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) != 0){
               dayOfTheWeek = words[numberArrayElementResponsiveForTimeType]
           }
           else {
               dayOfTheWeek = words[numberArrayElementResponsiveForTimeType+1]
           }
            return addDayOfTheWeek(numberKeywordInMessage,arrayElementWithDate, dayOfTheWeek,date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        if (arrayElementWithDate == 'в' || arrayElementWithDate == 'во' &&  afterDayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
            return addDayOfTheWeek(numberKeywordInMessage+1,words[numberArrayElementResponsiveForTimeType+2], words[numberArrayElementResponsiveForTimeType],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else{
            return AddDayWhenTimeIsKnown(date,arrayElementWithDate,timeRemind,dateMs,words,numberKeywordInMessage,numberArrayElementResponsiveForTimeType,messageFuture, millisecondsTime)
        }
    }
    else {
        throw new Error('Ошибка! Некорректно указана дата. Присутствуют цифры. Пример написания даты: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
    }
}
export default addDateOfDifferentType