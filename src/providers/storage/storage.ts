import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';

@Injectable()
export class StorageProvider {
  path: string = "";

  constructor(public http: Http,
    public file: File) {
    this.path = "file:///android_asset/";
  }

  // Fragt ab, ob genug freier Speicher auf dem Gerät verfügbar ist.
  enoughSpace(size: number) {
    return new Promise((resolve, reject) => {
      //Promise
      this.file.getFreeDiskSpace().then((value: number) => {
        if (size > value) {
          console.log("StarDuell: Datei ist zu groß, kann nicht gespeichert werden.");
          resolve(false);
        } else {
          console.log("StarDuell: Genügend Speicher vorhanden, kann gespeichert werden.");
          resolve(true);
        }
      }, (err) => {
        reject(err);
      });
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
        console.error(JSON.stringify(err).toString());
        reject(err);
      });
    });
  }

  /*// Liest die Datei vom Speicher ein.
  readFileAsBinary(filename: string) {
    return new Promise((resolve, reject) => {
      console.error("11")
      this.fileExists(filename).then(() => {
        console.error("12")
        this.file.readAsBinaryString(this.path, filename).then((binaryString: string) => {
          console.log("StarDuell: Datei erfolgreich ausgelesen!");
          resolve(binaryString);

        }, (err) => {
          console.error("13")
          reject(err);
        });
      }, (err: string) => {
        console.error(JSON.stringify(err).toString());
        reject(err);
      });
    });
  }*/

  /*// Legt eine neue Datei auf dem Gerät an.
  createFile(path: string, filename: string, data: string) {
    return new Promise((resolve, reject) => {
      var fileSize = 1; //-------------------------------herausfinden

      this.enoughSpace(fileSize).then((enough: boolean) => {

        if (enough) {
          // Crashes here -----------------------------------------------------------------
          this.file.writeFile(path, filename, data, { replace: true }).then(() => {
            console.log("StarDuell: Datei wurde erfolgreich geschrieben.");
            resolve();

          }), (err) => {
            reject(err);
          };
          // ------------------------------------------------------------------------------
        } else {
          reject("StarDuell: Nicht genügend Speicher vorhanden!")
        }

      }), (err) => {
        reject(err);
      };
    });
  }*/

  /*// Löscht eine Datei auf dem Gerät.
  deleteFile(path: string, filename: string) {
    return new Promise((resolve, reject) => {

      this.fileExists(path + filename).then(() => {

        this.file.removeFile(path, filename).then(() => {
          console.error("Pfad: " + path + filename);
          console.log("StarDuell: Datei erfolgreich gelöscht: " + filename);

        }, (err: string) => {
          console.error("Pfad: " + path + filename);
          console.error(JSON.stringify(err).toString());
          reject(err);
        });

      }, (err: string) => {
        console.error(JSON.stringify(err).toString());
        reject(err);
      });


    });
  }*/

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
        console.error(JSON.stringify(err).toString());
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

            var list: string[] = new Array();
            for (var _i = 0; _i < listing.length; _i++) {
              var temp: string = listing[_i].name;
              list.push(temp);
            }
            resolve(list);

          }, (err) => {
            reject(err);
          });

        } else {
          reject("StarDuell: Verzeichnis existiert nicht!");
        }

      }, (err: string) => {
        console.error(JSON.stringify(err).toString());
        reject(err);
      });
    });
  }

}
