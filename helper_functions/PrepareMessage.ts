import removeEmptyElementsFromArray from "./RemoveEmptyElementsFromArray";
import removeDuplicateAdjacentElementsFromArray from "./RemoveDuplicateAdjacentElementsFromArray";

//функция - Подготовки сообщения
export default function prepareMessage(message:string){
    let text = message.toLocaleLowerCase()
    let words = text.split(" ")

    //Удаление пустых элементов из массива
    words = removeEmptyElementsFromArray(words)

    //Удаление повторяющихся соседних элементов из массива
    words = removeDuplicateAdjacentElementsFromArray (words)
    return words;
}