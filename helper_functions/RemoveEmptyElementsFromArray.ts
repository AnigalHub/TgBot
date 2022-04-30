export default function removeEmptyElementsFromArray(array:Array<string>){
    let output:Array<string> = array
    if(array.includes('') == true){
        output = array.filter(function (el) {
            return (el != "");
        });
    }
    return output
}
