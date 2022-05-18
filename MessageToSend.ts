export  default class MessageToSend {
    //миллисекунды
    public millisecondsTime: number;
    //будущее сообщение
    public messageFuture: string;

    constructor(millisecondsTime: number, messageFuture: string) {
        this.millisecondsTime = millisecondsTime
        this.messageFuture = messageFuture
    }
}
