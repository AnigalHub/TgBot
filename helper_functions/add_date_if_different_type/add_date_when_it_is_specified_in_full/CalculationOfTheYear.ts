function calculationOfTheYear(keyword:string, date:Date):number{
   let yearMessage:number
    if (keyword.length == 10) {
        yearMessage = parseInt(keyword.substring(6, 12))
    }
    else if ((keyword.length == 8) && (String(date.getFullYear()).slice(2, 4) <= keyword.substring(6, 8))) {
        yearMessage = parseInt(String(date.getFullYear()).slice(0, 2) + keyword.substring(6, 8))
    }
    else {
        yearMessage = parseInt(String(parseInt(String(date.getFullYear()).slice(0, 2)) + 1) + keyword.substring(6, 8))
    }
    return yearMessage
}
export default calculationOfTheYear