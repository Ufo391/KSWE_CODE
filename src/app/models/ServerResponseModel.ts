// TODO wird vllt. gebraucht wenn die Server antwort nicht mit .json() geparsed werden kann.
// The Interface is needed for parsing a Json-string into an object with the same information as ServerResponseModel.
/*export interface ServerResponseInterface{
    success: string;
    msg: string;
}*/

// This class provides the server response information.
export class ServerResponseModel {
    
    private success:boolean;
    private msg:string;
    //private sessionID:string;

    constructor(success:boolean, msg:string) {
        this.success = success;
        this.msg = msg;
    }

    succeed() {
        return this.success;
    }

    getMsg() {
        return this.msg;
    }

    /*getSessionID() {
        return this.sessionID;
    }*/
}