// The Interface is needed for parsing a Json-string into an object with the same information as ServerResponseModel.
export interface ServerResponseInterface {
    success: string;
    msg: string;
}

// This class provides the server response information.
export class ServerResponseModel {

    private success: boolean;
    private msg: string;

    constructor(success: string, msg: string) {
        if (success.toString() === "true") {
            this.success = true;
        } else {
            this.success = false;
        }
        this.msg = msg;
    }

    succeed() {
        return this.success;
    }

    getMsg() {
        return this.msg;
    }
}