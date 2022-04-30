function deleteFromArray(words:Array<string>,word:string) {
    if(words.indexOf(word) != -1){
        words.splice(words.indexOf(word),1)
    }
}
export default deleteFromArray