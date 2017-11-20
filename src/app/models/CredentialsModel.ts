export class CredentialsModel {

    constructor(private name:string, private pass:string) {
    }

    getEmail() {
        return this.name;
    }

    getPass() {
        return this.pass;
    }
}