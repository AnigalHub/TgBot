
function checkingForPastTense(milliseconds:number) {
    //проверка, когда миллисекунд 0
    if(milliseconds < 0) {
        console.log('сheckingForPastTense')
        throw new Error('<b>Ошибка! Некорректно введено время. </b>\n'+ 'Время указано которое уже прошло - напомнить невозможно');
    }
}
export default checkingForPastTense