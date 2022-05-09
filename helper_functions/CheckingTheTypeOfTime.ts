import ConvertTime from "../../../ConvertTime";
const convertTime = new ConvertTime()

//функция - Проверка типа времени
function checkingTheTypeOfTime(words:Array<string>,numberArrayElementResponsiveForTimeType:number) {
    if (convertTime.ConvertTimeToMilliseconds(words[numberArrayElementResponsiveForTimeType],1) == 0){
        throw new Error('<b>Ошибка! Неизвестный тип времени </b>\n'+'(сек | мин | час)');
    }
}
export default checkingTheTypeOfTime