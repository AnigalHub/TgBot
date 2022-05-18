//функция - Удаление из массива
function deleteFromArray(words:Array<string>,word:string) {
    //проверка - содержится ли элемент в массиве
    if(words.indexOf(word) != -1){
        words.splice(words.indexOf(word),1)
    }
}
export default deleteFromArray