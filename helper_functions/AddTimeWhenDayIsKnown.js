"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateAsString_1 = require("./DateAsString");
var ConvertTime_1 = __importDefault(require("../ConvertTime"));
var convertTime = new ConvertTime_1.default();
//функция добавления времени, когда известен день
function AddTimeWhenDayIsKnown(bot, chatId, date, array, secondKeywordInMessage, millisecondsTime, messageFuture) {
    return __awaiter(this, void 0, void 0, function () {
        var futureDate, timeAfterSecondKeyword, timeAfterSecondKeyword, objTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(array.includes('в') == true || array.includes('во') == true)) return [3 /*break*/, 16];
                    if (array.includes('во') == true) {
                        array.splice(array.indexOf('во'), 1, 'в');
                    }
                    secondKeywordInMessage = array.indexOf('в');
                    if (!(millisecondsTime >= 86400000 && convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], 1) < 86400000)) return [3 /*break*/, 13];
                    futureDate = new Date(Date.parse(date.toString()) + millisecondsTime);
                    futureDate.setHours(0, 0, 0, 0);
                    if (!/^[0-9]*$/.test(array[secondKeywordInMessage + 1])) return [3 /*break*/, 6];
                    timeAfterSecondKeyword = parseInt(array[secondKeywordInMessage + 1]) //время с типом число
                    ;
                    if (timeAfterSecondKeyword == 0) {
                        timeAfterSecondKeyword = 24;
                    }
                    if (!(convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], timeAfterSecondKeyword) == 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды')];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], 1) >= 3600000)) return [3 /*break*/, 4];
                    return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24')];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    messageFuture = array.slice((secondKeywordInMessage + 3), array.length).join(' '); //сообщение, которое напоминаем
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date.getHours(), futureDate.getHours(), timeAfterSecondKeyword, array, secondKeywordInMessage + 2);
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                    _a.label = 5;
                case 5: return [3 /*break*/, 12];
                case 6:
                    if (!/^[А-яЁё]*$/.test(array[secondKeywordInMessage + 1])) return [3 /*break*/, 10];
                    if (!(convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 1], 1) == 0 &&
                        convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], 1) == 0 &&
                        convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 3], 1) == 0 &&
                        convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 4], 1) == 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Не указана единица времени')];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    timeAfterSecondKeyword = convertTime.ConvertLargeNumberFromStringToNumber(array[secondKeywordInMessage + 1], array[secondKeywordInMessage + 2]);
                    objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(timeAfterSecondKeyword, date.getTime(), futureDate.getTime(), array, secondKeywordInMessage + 1, secondKeywordInMessage + 2, secondKeywordInMessage + 3, secondKeywordInMessage + 4);
                    messageFuture = objTime.message;
                    millisecondsTime = objTime.millisecondsTime;
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                    _a.label = 9;
                case 9: return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время')];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [3 /*break*/, 15];
                case 13: return [4 /*yield*/, bot.sendMessage(chatId, 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать')];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                    _a.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.default = AddTimeWhenDayIsKnown;
//# sourceMappingURL=AddTimeWhenDayIsKnown.js.map