export default function removeDuplicateAdjacentElementsFromArray(array:Array<string>){
    let output:Array<string> = []
    for (let i=0;i<array.length;i++){
        if(array[i] != array[i+1]){
            output.push(array[i])
        }
    }
    return output
}
