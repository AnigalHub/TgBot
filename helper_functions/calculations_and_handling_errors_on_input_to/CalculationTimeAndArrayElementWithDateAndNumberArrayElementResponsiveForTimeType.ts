import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()
import DayOfTheWeek from "../../DayOfTheWeek";
import countingTheTimeSpecifiedByWords from "./CountingTheTimeSpecifiedByWords";
import countingNumberArrayElementResponsiveForTimeType from "./CountingNumberArrayElementResponsiveForTimeType";

function CalculationTimeAndArrayElementWithDateAndNumberArrayElementResponsiveForTimeType(date:Date,words:Array<string>,numberKeywordInMessage:number):object {

    let dateOfDifferentType = words[numberKeywordInMessage-1] // элемент, в котором может быть указа дата (сегодня/завтра/послезавтра)
    let wordsElementAfterKeyword1 = words[numberKeywordInMessage+1] // элемент массива после ключевого слова - первый
    let wordsElementAfterKeyword2 = words[numberKeywordInMessage+2] // элемент массива после ключевого слова - второй
    let wordsElementAfterKeyword3 = words[numberKeywordInMessage+3] // элемент массива после ключевого слова - третий
    let wordsElementAfterKeyword4 = words[numberKeywordInMessage+4] // элемент массива после ключевого слова - четвертый

    let time:number = 0
    let arrayElementWithDate:string = ''
    let numberArrayElementResponsiveForTimeType:number = 0

    if(/^[0-9]*$/.test(wordsElementAfterKeyword1)) { // только цифры
        time = parseInt(wordsElementAfterKeyword1) //время с типом число
        numberArrayElementResponsiveForTimeType = numberKeywordInMessage + 2
        if(convertTime.ConvertWordIndicatorOfTimeToNumber(date,dateOfDifferentType) != -1){
            arrayElementWithDate = dateOfDifferentType
        }
        else {
            arrayElementWithDate = wordsElementAfterKeyword3
        }
    }
    if (/^[А-яЁё]*$/.test(wordsElementAfterKeyword1)){ // только буквы
        const dayOfTheWeek = new DayOfTheWeek(wordsElementAfterKeyword1)
        time = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword1,wordsElementAfterKeyword2)
        numberArrayElementResponsiveForTimeType = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage,wordsElementAfterKeyword1,wordsElementAfterKeyword2)

        if(dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1){
            time = parseInt(wordsElementAfterKeyword3) //время с типом число
            if(isNaN(time)){
                time = countingTheTimeSpecifiedByWords(wordsElementAfterKeyword3,wordsElementAfterKeyword4)
            }
            numberArrayElementResponsiveForTimeType = countingNumberArrayElementResponsiveForTimeType(numberKeywordInMessage+2,wordsElementAfterKeyword1,wordsElementAfterKeyword2)
            arrayElementWithDate = wordsElementAfterKeyword1
        }
        else if (convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword1,1) != 0 ||
            convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword2,1) != 0 ||
            convertTime.ConvertTimeToMilliseconds(wordsElementAfterKeyword3,1) != 0
        ){
            arrayElementWithDate = words[numberArrayElementResponsiveForTimeType+1]
        }
        else {
            arrayElementWithDate = dateOfDifferentType
        }
    }

    return {time, arrayElementWithDate,numberArrayElementResponsiveForTimeType}
}
export default CalculationTimeAndArrayElementWithDateAndNumberArrayElementResponsiveForTimeType