// The Interface is needed for parsing a Json-string into an object with the same information as SessionModel.
export interface SessionInterface {
    name: string;
    sessionID: string;
    timeStamp: number;
}

// This class stores and provides all the session information.
export class SessionModel {

    private timeStamp: number;
    private name: string;
    private sessionID: string;

    constructor(name: string, sessionID: string) {
        this.name = name;
        if(sessionID.length > 3 && sessionID.substring(0,3) === "JWT"){
            this.sessionID = sessionID.substring(4, sessionID.length);
        } else{
            this.sessionID = sessionID;
        }
        this.timeStamp = new Date().getTime();
    }

    setTimeStamp(timeStamp: number) {
        this.timeStamp = timeStamp;
    }

    getName(): string {
        return this.name;
    }

    getSessionID(): string {
        return this.sessionID;
    }

    getAge(): number {
        let timeAgo = (new Date().getTime() - new Date(this.timeStamp).getTime());
        return timeAgo;
    }
}