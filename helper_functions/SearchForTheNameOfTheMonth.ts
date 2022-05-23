import Month from "../Month";

function searchForTheNameOfTheMonth(words:Array<string>):string{
    let nameMonth = ''
    for(let i=0; i<words.length; i++){
        //месяц
        let month = new Month(words[i])
        if(month.SearchForTheNumberOfTheMonth() != -1){
            nameMonth = words[i]
        }
    }
    return nameMonth
}
export default searchForTheNameOfTheMonth