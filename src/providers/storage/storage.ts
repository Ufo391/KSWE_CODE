import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';

@Injectable()
export class StorageProvider {
  path: string = "";

  constructor(public http: Http, public file: File) {
    this.path = "file:///android_asset/";
  }

  // Fragt ab, ob genug freier Speicher auf dem Gerät verfügbar ist.
  enoughSpace(size: number) {
    this.file.getFreeDiskSpace().then((value: number) => {
      if (size > value) {
        console.log("StarDuell: Datei ist zu groß, kann nicht gespeichert werden.");
        return false;
      } else {
        console.log("StarDuell: Genügend Speicher vorhanden, kann gespeichert werden.");
        return true;
      }
    }, (err) => {
      return false;
    });
  }

  // Fragt ab, ob die Datei bereits existiert.
  fileExists(filename: string) {
    return new Promise((resolve, reject) => {
      this.file.checkFile(this.path, filename).then((exists: boolean) => {
        if (exists) {
          console.log("StarDuell: Datei existiert");
          resolve();
        } else {
          console.log("StarDuell: Datei existiert nicht");
          reject("StarDuell: Datei existiert nicht");
        }
      }, (err: string) => {
        console.error(err);
        reject(err);
      });
    });
  }

  // Liest die Datei vom Speicher ein.
  readFileAsBinary(filename: string) {
    return new Promise((resolve, reject) => {

      this.fileExists(filename).then(() => {

        this.file.readAsBinaryString(this.path, filename).then((binaryString: string) => {
          console.log("StarDuell: Datei erfolgreich ausgelesen!");
          resolve(binaryString);

        }, (err) => {
          reject(err);
        });
      }, (err: string) => {
        console.error(err);
        reject(err);
      });
    });
  }

  // Legt eine neue Datei auf dem Gerät an.
  createFile(imgString) {

    var img = new Image();
    img.src = imgString;
    img.addEventListener('load', (event) => {
      console.log(1);
      this.file.getFreeDiskSpace().then((value: number) => {
        console.log("2 - " + value);
        if ((img.height * img.width) / 1000.0 < value) {
          console.log(3);
          this.file.writeFile(this.file.applicationDirectory, "bild.jpg", imgString, { replace: true }).then(() => {
            console.log(4);
            this.file.checkFile(this.file.applicationDirectory, "bild.jpg").then(_ => console.log('File exists')).catch(err => console.log('File doesnt exist'));
          }), (err) => { console.log(5); };

        }
      }, (err) => {
        console.error("takeAPicture(): ", err);
      });

    });


  }

  // Löscht eine Datei auf dem Gerät.
  deleteFile(path: string, filename: string) {
    return new Promise((resolve, reject) => {


    });
  }

  // Fragt ab, ob das Verzeichnis existiert.
  dirExists(dir: string) {
    return new Promise((resolve, reject) => {

      this.file.checkDir(this.path, dir).then((exists: boolean) => {
        if (exists) {
          console.log("StarDuell: Verzeichnis existiert: " + dir);
        } else {
          console.error("StarDuell: Verzeichnis existiert nicht: " + dir);
        }
        resolve(exists);
      }, (err: string) => {
        console.error(err);
        reject(err);
      });
    });
  }

  // Liest den Inhalt eines Verzeichnisses aus und gibt die Dateinamen als Entry zurück.
  getFileList(dir: string) {
    return new Promise((resolve, reject) => {

      this.dirExists(dir).then((success: boolean) => {

        if (success) {

          this.file.listDir(this.path, dir).then((listing) => {
            console.log("StarDuell: Verzeichnis erfolgreich ausgelesen.");
            listing.forEach(element => {
              console.error(element.name);
            });
            //--------------------------ALS VECTOR SPEICHERN
            resolve();

          }, (err) => {
            reject(err);
          });

        } else {
          reject("StarDuell: Verzeichnis existiert nicht!");
        }

      }, (err: string) => {
        console.error(err);
        reject(err);
      });
    });
  }

}
