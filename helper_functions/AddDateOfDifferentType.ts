import MessageToSend from "../MessageToSend";
import addDateWhenItIsSpecifiedInFull from "./date_different_type/AddDateWhenItIsSpecifiedInFull";
import addDayOfTheWeek from "./date_different_type/AddDayWhenTimeAndDayOfTheWeekAreKnown";
import AddDayWhenTimeIsKnown from "./date_different_type/AddDayWhenTimeIsKnown";
import dateAndTimeValidation from  "../helper_functions/DateAndTimeValidation"
import ConvertTime from '../ConvertTime'
import DayOfTheWeek from "../DayOfTheWeek";
const convertTime = new ConvertTime()

function addDateOfDifferentType(date:Date,arrayElementWithDate:string,numberArrayElementResponsiveForTimeType:number,timeRemind:number,dateMs:number,
                                words:Array<string>, numberKeywordInMessage:number,messageFuture:string, millisecondsTime:number) : MessageToSend {
    if(!/[А-яЁё]/.test(arrayElementWithDate) && (arrayElementWithDate.includes('.') == true || arrayElementWithDate.includes('-') == true || arrayElementWithDate.includes('/') == true )) {
       // dateAndTimeValidation(timeRemind,words[numberKeywordInMessage+4],words[numberKeywordInMessage+2])
      //  console.log(timeRemind,words[numberKeywordInMessage+2],words[numberKeywordInMessage])
        return addDateWhenItIsSpecifiedInFull(numberKeywordInMessage,numberArrayElementResponsiveForTimeType,arrayElementWithDate,words,date,dateMs, timeRemind, messageFuture,millisecondsTime)
    }
    else if (/[А-яЁё]/.test(arrayElementWithDate) || /^[0-9]*$/.test(arrayElementWithDate)){ // только буквы
        console.log(numberArrayElementResponsiveForTimeType)
        const dayOfTheWeek = new DayOfTheWeek(arrayElementWithDate)
            /*
        if((words[numberArrayElementResponsiveForTimeType+1]) == "в" || (words[numberArrayElementResponsiveForTimeType+1]) == "во"){
          console.log('нет')
           // console.log(timeRemind,words[numberKeywordInMessage+2],words[numberKeywordInMessage])
           //  dateAndTimeValidation(timeRemind,words[numberKeywordInMessage+2],words[numberKeywordInMessage])
            console.log(numberKeywordInMessage,words[numberArrayElementResponsiveForTimeType],words[numberArrayElementResponsiveForTimeType+2],dateMs,timeRemind,messageFuture,millisecondsTime)
            return addDayOfTheWeek(numberKeywordInMessage,words[numberArrayElementResponsiveForTimeType],words[numberArrayElementResponsiveForTimeType+2],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else if((words[numberArrayElementResponsiveForTimeType]) == "в" || (words[numberArrayElementResponsiveForTimeType]) == "во"){
            console.log('да')

           //  timeRemind = convertTime.ConvertLargeNumberFromStringToNumber(words[numberArrayElementResponsiveForTimeType+1],words[numberArrayElementResponsiveForTimeType+2])
           //  console.log(timeRemind)
           // console.log(numberKeywordInMessage+2,words[numberArrayElementResponsiveForTimeType-1],words[numberArrayElementResponsiveForTimeType+3],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
           // dateAndTimeValidation(timeRemind,words[numberKeywordInMessage+4],words[numberKeywordInMessage+2])
            return addDayOfTheWeek(numberKeywordInMessage+2,words[numberArrayElementResponsiveForTimeType-1],words[numberArrayElementResponsiveForTimeType+2],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }

             */
        if(dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
            return addDayOfTheWeek(numberKeywordInMessage,arrayElementWithDate, words[numberArrayElementResponsiveForTimeType],date,words,dateMs,timeRemind,messageFuture,millisecondsTime)
        }
        else{
            console.log('рррр')
            return AddDayWhenTimeIsKnown(date,arrayElementWithDate,timeRemind,dateMs,words,numberKeywordInMessage,numberArrayElementResponsiveForTimeType,messageFuture, millisecondsTime)
        }
    }
    else {
        throw new Error('Ошибка! Некорректно указана дата. Присутствуют цифры. Пример написания даты: день недели | завтра | послезавра | 20.01.25 | 22-05-27 | 26/07/28')
    }
}
export default addDateOfDifferentType