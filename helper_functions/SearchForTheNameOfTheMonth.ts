import Month from "../Month";

//функция - Поиск названия месяца из сообщения
function searchForTheNameOfTheMonth(words:Array<string>):string{
    //название месяца
    let nameMonth = ''
    //проходим по массиву - сообщению
    for(let i=0; i<words.length; i++){
        //месяц
        let month = new Month(words[i])
        //проверка - если найден месяц в сообщении
        if(month.SearchForTheNumberOfTheMonth() != -1){
            //название месяца
            nameMonth = words[i]
        }
    }
    return nameMonth
}
export default searchForTheNameOfTheMonth