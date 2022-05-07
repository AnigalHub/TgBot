import ConvertTime from "./../../ConvertTime";
const convertTime = new ConvertTime()

function errorHandlingOfIncorrectTimeEntryUsingWords(time:number,arrayElementAfterSecondKeyword1:string,
                                       arrayElementAfterSecondKeyword2:string,arrayElementAfterSecondKeyword3:string) {
    if((time == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1,1) == 0 )
        || (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2,1) == 0 &&
            convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3,1) != 0 )){
        throw new Error('Ошибка! Неккоректно введено время - опечатка во времени после указателя времени "В"');
    }
}
export default errorHandlingOfIncorrectTimeEntryUsingWords