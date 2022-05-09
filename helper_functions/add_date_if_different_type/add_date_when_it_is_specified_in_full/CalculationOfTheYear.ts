//функция - Подсчет года
function calculationOfTheYear(keyword:string, date:Date):number{
    let yearMessage:number = 0
    if (keyword.length == 10) { // когда год: дд.мм.гггг
        yearMessage = parseInt(keyword.substring(6, 12))
    }
    if ((keyword.length == 8) && (String(date.getFullYear()).slice(2, 4) <= keyword.substring(6, 8))) { // когда год: дд.мм.гг
        yearMessage = parseInt(String(date.getFullYear()).slice(0, 2) + keyword.substring(6, 8))
    }
    return yearMessage
}
export default calculationOfTheYear