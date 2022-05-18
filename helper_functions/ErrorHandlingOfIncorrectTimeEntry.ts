import ConvertTime from "../ConvertTime";
const convertTime = new ConvertTime()

function errorHandlingOfIncorrectTimeEntry(timeAfterSecondKeyword:number,wordWithTypeOfTime:string) {
    if (timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(wordWithTypeOfTime,1) == 3600000){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Время не может быть больше 24 часов');
    }
    if (timeAfterSecondKeyword > 59 && (convertTime.ConvertTimeToMilliseconds(wordWithTypeOfTime,1) == 60000 || convertTime.ConvertTimeToMilliseconds(wordWithTypeOfTime,1) == 1000)){
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+'Время не может быть больше 59 секунд/минут');
    }
}
export default errorHandlingOfIncorrectTimeEntry