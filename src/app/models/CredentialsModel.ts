// This class stores and  provides the login information.
export class CredentialsModel {

    private name:string;
    private pass:string;

    constructor(name:string, pass:string) {
    }

    getName() {
        return this.name;
    }

    getPass() {
        return this.pass;
    }
}