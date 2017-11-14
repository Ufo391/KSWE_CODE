export class CredentialsModel {

    constructor(private email:string, private pass:string) {
    }

    getEmail() {
        return this.email;
    }

    getPass() {
        return this.pass;
    }
}