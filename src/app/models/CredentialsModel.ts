// This class stores and  provides the login information.
export class CredentialsModel {

    private name: string;
    private password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    getName() {
        return this.name;
    }

    getPassword() {
        return this.password;
    }
}