"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function RemoveEmptyElementsFromArray(array) {
    var output = array;
    if (array.includes(' ') == true) {
        output = array.filter(function (el) {
            return (el != "");
        });
    }
    return output;
}
exports.default = RemoveEmptyElementsFromArray;
//# sourceMappingURL=RemoveEmptyElementsFromArray.js.map