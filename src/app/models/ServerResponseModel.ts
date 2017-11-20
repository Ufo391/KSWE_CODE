export class ServerResponseModel {

    constructor(private success:boolean, private msg:string) {
    }

    succeed() {
        return this.success;
    }

    getMsg() {
        return this.msg;
    }
}