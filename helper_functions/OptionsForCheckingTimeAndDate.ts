import DayOfTheWeek from "../DayOfTheWeek";
import errorHandlingOfIncorrectTime from "./ErrorHandlingOfIncorrectTime";

//функция - Варианты проверки времени и даты
function optionsForCheckingTimeAndDate(words:Array<string>, numberKeywordInMessage:number, arrayElementWithDate:string, timeRemind:number, numberArrayElementResponsiveForTimeType:number){

    console.log('optionsForCheckingTimeAndDate')

    //проверка - arrayElementWithDate - не является днем недели
    if(new DayOfTheWeek(arrayElementWithDate).SearchForTheDayNumberOfTheWeek() == -1){
        //проверка - если элемент массива с датой равно undefined
        if (arrayElementWithDate == undefined){
            //элемент массива с датой
            arrayElementWithDate = words[numberKeywordInMessage-1]
        }
        //Обработка ошибок неверного ввода времени
        errorHandlingOfIncorrectTime(timeRemind,words,words[numberArrayElementResponsiveForTimeType],arrayElementWithDate)
    }
    //проверка - arrayElementWithDate - является днем недели
    else {
        //элемент массива с типой времени (сек/мин/час)
        let arrayElementWithTimeType = words[numberArrayElementResponsiveForTimeType]

        //проверка - если время состоит из двух слов: больше 20 и не делится без остатка на 10
        if(timeRemind > 20  && timeRemind%10 != 0 ){
            //элемент массива с типой времени (сек/мин/час)
            arrayElementWithTimeType = words[numberArrayElementResponsiveForTimeType+1]
        }
        //проверка - если время равно 1
        if (timeRemind == 1) {
            //элемент массива с типой времени (сек/мин/час)
            arrayElementWithTimeType = words[numberArrayElementResponsiveForTimeType-1]
        }
        //Обработка ошибок неверного ввода времени
        errorHandlingOfIncorrectTime(timeRemind,words,arrayElementWithTimeType,words[numberKeywordInMessage])
    }
}

export default optionsForCheckingTimeAndDate
