export  default class MessageToSend {
    public millisecondsTime: number;
    public messageFuture: string;

    constructor(millisecondsTime: number, messageFuture: string) {
        this.millisecondsTime = millisecondsTime
        this.messageFuture = messageFuture
    }
}
