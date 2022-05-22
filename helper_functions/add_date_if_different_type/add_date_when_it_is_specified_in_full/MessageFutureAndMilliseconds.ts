
export default class MessageFutureAndMilliseconds {
    //будущее сообщение
    public messageFuture:string;
    //миллисекунды
    public milliseconds:number;

    constructor(messageFuture: string, milliseconds:number) {
        this.messageFuture = messageFuture
        this.milliseconds = milliseconds
    }
}
