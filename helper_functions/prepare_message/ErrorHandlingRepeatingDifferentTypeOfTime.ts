import ConvertTime from "../../ConvertTime";
const convertTime = new ConvertTime()

//функция - Обработка повтора разного типа времени
function errorHandlingRepeatingDifferentTypeOfTime(words:Array<string>) {
//проход по массиву слов в сообщении
    for (let i= 0; i<words.length;i++){
        //проверка на повтор разного типа времени подряд
        if(convertTime.ConvertTimeToMilliseconds(words[i],1) != 0 && convertTime.ConvertTimeToMilliseconds(words[i+1],1) != 0){
            console.log('errorHandlingRepeatingDifferentTypeOfTime')
            throw new Error('Ошибка! Подряд несколько раз указана единица времени')
        }
    }
}
export default errorHandlingRepeatingDifferentTypeOfTime