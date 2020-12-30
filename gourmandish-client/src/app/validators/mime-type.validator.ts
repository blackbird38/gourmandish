/*getting the value of a control (file), reading that, then checking for the mime-type of this file
-> if a validator returns null = the value is valid !
-> if it returns an object, it failed
for an async validator, the returned value is wraped by a Promise or Observable
*/

import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

//[key: string] = a dynamic property name, the value for this prop can be any (:any)
export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const fileReaderObservable = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener('loadend', () => {
        //the equiv for fileReader.onloadend = () => {}
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
          0,
          4
        ); //substracting the the mime-type
        let header = '';
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        //  console.log(arr, header);
        switch (
          header //patterns that stand for specific file types (png, jpg)
        ) {
          case '89504e47': // png
            isValid = true;
            break;
          case 'ffd8ffe0': // jfif, jpe, jpg,
          case 'ffd8ffe1': // jpg with exif
          case 'ffd8ffe3': // samsung d500 jpeg
          case 'ffd8ffe8': // jpg spiff
            isValid = true;
            break;
          default:
            isValid = false; //or use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete(); // letting subscribers know we're done
      });
      //  console.log(file);
      fileReader.readAsArrayBuffer(file); //allows accessing the myme type / for Uint8Array
    }
  );
  return fileReaderObservable;
};
