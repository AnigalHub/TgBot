import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()

function errorHandlingOfIncorrecrTimeEntry(timeAfterSecondKeyword:number,wordWithTypeOfTime:string, numberAsWord1:string, numberAsWord2:string) {
    if (timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(wordWithTypeOfTime,1) == 3600000){
        throw new Error('Ошибка! Время не может быть больше 24 часов');
    }
    if (timeAfterSecondKeyword > 59 && (convertTime.ConvertTimeToMilliseconds(wordWithTypeOfTime,1) == 60000 || convertTime.ConvertTimeToMilliseconds(wordWithTypeOfTime,1) == 1000)){
        throw new Error('Ошибка! Время не может быть больше 59 секунд/минут');
    }
   // if ((numberAsWord1 != 'ноль' && numberAsWord1 != 'нуль' ) &&
     //   ((convertTime.ConvertSmallNumberFromStringToNumber(numberAsWord1) == 0 && convertTime.ConvertTimeToMilliseconds(numberAsWord1,1) == 0 ) ||
          //  (convertTime.ConvertSmallNumberFromStringToNumber(numberAsWord2) == 0 &&
             //   convertTime.ConvertTimeToMilliseconds(wordWithTypeOfTime,1) !=0))){
       // throw new Error('Ошибка! Некорректное время: опечатка или отсутствие');
    //}
}
export default errorHandlingOfIncorrecrTimeEntry