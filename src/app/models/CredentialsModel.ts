export class CredentialsModel {

    constructor(private name:string, private pass:string) {
    }

    getName() {
        return this.name;
    }

    getPass() {
        return this.pass;
    }
}