export  default class MessageToSend {
    private millisecondsTime: number;
    private messageFuture: string;

    constructor(millisecondsTime: number, messageFuture: string) {
        this.millisecondsTime = millisecondsTime
        this.messageFuture = messageFuture
    }
}
