import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { app_strings } from '../_constants/app_strings';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public base_url: string = environment.base_url;
  public socket_url: string =  environment.socket_url;
  public moduleName = 'auth'
  public adminRoute = '/api/admin/v1/';

  // userId: BehaviorSubject<any> = new BehaviorSubject(null);
  public noauthHeaders = new HttpHeaders({ noauth: 'yes' });
  public multipartyHeaders = new HttpHeaders({ multiparty: 'yes' });
  public knowlarity = new HttpHeaders({ knowlarity: 'yes' });
  public showFilter: BehaviorSubject<any> = new BehaviorSubject(null);
  public navBarHeader: BehaviorSubject<any> = new BehaviorSubject('Dashboard');

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  public setFilter(id:any) {
    this.showFilter.next(id);
  }
  public getFilter(): BehaviorSubject<any> {
    return this.showFilter;
  }
  /* start here navBarHeader */
  public setNav(id : any) {
    this.navBarHeader.next(id);
  }
  public getNav(): BehaviorSubject<any> {
    return this.navBarHeader;
  }
  /* end here navBarHeader */

  public success(msg: any) {
    if (!msg) { return; }
    this.toastr.success(msg);
  }
  public showLoader() {
    this.spinner.show();
  }
  public hideLoder() {
    this.spinner.hide();
  }
  public error(msg: any) {
    if (!msg) { return; }
    this.toastr.error(msg);
  }
  public bug(msg : any) {
    if (!msg) { return; }
    this.toastr.warning(msg);
  }
  public setToken(token: any) {
    if (!token) { return; }
    return localStorage.setItem('accessToken', token);
  }
  public defaultImg() {
    return 'src/assets/images/def.png';
  }
  public getToken() {
    return localStorage.getItem('accessToken');
  }
  public getUserId() {
    return localStorage.getItem('x-id');
  }

  public isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }
  /* input of sweet alert */
  public showInput() {
    return Swal.fire({
      title: 'Select Level',
      input: 'select',
      inputOptions: {
        '1': 'Level 1',
        '2': 'Level 2',
        '3': 'Level 3'
      },
      inputPlaceholder: 'Required',
      showCancelButton: true,
      inputValidator: function (value) {
        console.log('input', value);

        return new Promise(function (resolve, reject) {
          if (value !== '') {
            resolve('');
          } else {
            resolve('You need to select a Level');
          }
        });
      }
    }).then(function (result) {

      if (result.value) {
        Swal.fire({
          icon: 'success',
          html: 'You selected: ' + result.value
        });
      }
      return result;
    });
  }


  public showImage(imageUrl : any) {
    return Swal.fire({
      imageUrl,
      imageHeight: 400
    });
  }
  public showImageKYC(imageUrl: any) {
    return Swal.fire({
      imageUrl,
      imageHeight: 400,
      confirmButtonText: 'Approve',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Reject !'
    });
  }
  // tslint:disable-next-line: max-line-length
  public confirmPopup(ob = { confirmButtonText: 'Yes, delete it!', text: 'You won\'t be able to revert this!', title: 'Are you sure?' }): Promise<any> {
    const { title, text, confirmButtonText } = ob;
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
    });
  }
  public imagePreview(file : any) {
    const reader = new FileReader();
    let previewPromise;
    previewPromise = new Promise((resolve, reject) => {
      reader.onload = (loaded: any) => {
        const preview = loaded.target.result;
        resolve(preview);
      };
      reader.readAsDataURL(file);
    });
    return previewPromise;
  }
  public readCSV(file: any) {
    const reader = new FileReader();
    let previewPromise;
    previewPromise = new Promise((resolve, reject) => {
      reader.onload = (loaded: any) => {
        const preview = loaded.target.result;
        resolve(preview);
      };
      reader.readAsText(file);
    });
    return previewPromise;
  }
  public compareTwoCSVarr(array1 :any, array2: any) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  }
  // setuserId(id) {
  //   this.userId.next(id);
  // }
  // getuserId(): BehaviorSubject<any> {
  //   return this.userId;
  // }
  public download(
    byteArrays,
    contentType = 'application/vnd.ms-excel',
    FILENAME = 'report'
  ) {
    const blob = new Blob(byteArrays, { type: contentType });
    const blobUrl = URL.createObjectURL(blob);
    FileSaver.saveAs(
      blobUrl,
      FILENAME + '_export_' + new Date().getTime() + app_strings.XLS_EXTENSION
    );
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  /* export csv function start here */
  public exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
  /* export CCSV function end here */
  public downloadPdf(pdfUrl: string, pdfName: string) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }
  /* enquiries service start here */

  /*_______________ api services start here ______________*/
  /*_______________ api services start here ______________*/
  /*_______________ api services start here ______________*/
  /*_______________ api services start here ______________*/
  /*_______________ api services start here ______________*/
  public login(ob :any): Observable<any> {
    this.showLoader();
    const uri = `${this.base_url}${this.adminRoute}/login`;
    return this.http.post(uri, ob, { headers: this.noauthHeaders });
  }
  /* master api  */
  public getCategoryList(): Observable<any> {
    this.showLoader();
    const uri = `${this.base_url}${this.adminRoute}categoryList`;
    return this.http.get(uri, { headers: this.noauthHeaders });
  }
  public editCategory(ob, id): Observable<any> {
    this.showLoader();
    const uri = `${this.base_url}${this.adminRoute}editCategory/${id}`;
    return this.http.put(uri, ob, { headers: this.multipartyHeaders });
  }
  public addCategory(ob): Observable<any> {
    this.showLoader();
    const uri = `${this.base_url}${this.adminRoute}addCategory`;
    return this.http.post(uri, ob, { headers: this.multipartyHeaders });
  }
  public updateSubcategory(ob): Observable<any> {
    this.showLoader();
    const uri = `${this.base_url}${this.adminRoute}updateSubCategory`;
    return this.http.post(uri, ob, { headers: this.noauthHeaders });
  }
  public options(type): Observable<any> {
    const uri = `${this.base_url}/${this.adminRoute}/options?type=${type}`;
    return this.http.get(uri);
  }
  deleteGalleryImage(obj): Observable<any> {
    const uri = `${this.base_url}/${this.adminRoute}/del/gallery`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'token': (token),
      }),
      body: obj,
    };
    return this.http.delete(uri, httpOptions);
  }
  /* getuserList */
  getUserList(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getUserList`;
    return this.http.get(uri, {
      params: obj
    });
  }
  /* get service list */
  getServices(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getServices`;
    return this.http.get(uri, {
      params: obj
    });
  }

  /* getBookingServies */
  getBookingServies(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getBookingServies`;
    return this.http.get(uri, {
      params: obj
    });
  }
  /* updateBookingstatus */
  updateBookingstatus(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}updateBookingstatus`;
    return this.http.put(uri, {}, {
      params: obj
    });
  }
  /* ------------------------------------------------------ */
  /* getWeddingList */
  getWeddingList(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getWeddingList`;
    return this.http.get(uri, {
      params: obj
    });
  }
  /* getUserCount */
  getUserCount(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getUserCount`;
    return this.http.get(uri, {
      params: obj
    });
  }
  /* getProfessionalListDetails */
  getProfessionalListDetails(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getProfessionalListDetails`;
    return this.http.get(uri, {
      params: obj
    });
  }
  /* getProfessionalById */
  getProfessionalById(id: any): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getProfessionalById`;
    return this.http.get(uri, {
      params: id
    });
  }

  /* getProfessionalById */
  getProfessionalBooking(param: any): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}getProfessionalBooking`;
    return this.http.get(uri, {
      params: param
    });
  }
  /* updateWeddingstatus */
  updateWeddingstatus(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}updateWeddingstatus`;
    return this.http.put(uri, {}, {
      params: obj
    });
  }
  /* change user Status */
  updateUserStatus(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}updateUserStatus`;
    return this.http.put(uri, {}, {
      params: obj
    });
  }
  /* change level   */
  updateUserlevel(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}updateUserlevel`;
    return this.http.put(uri, {}, {
      params: obj
    });
  }
  /* change user Status */
  updateMasterStatus(obj): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}updateMasterStatus`;
    return this.http.put(uri, {}, {
      params: obj
    });
  }

  /* get Feedback List */
  public getFeedbackList(param: any): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}feedbackList`;
    return this.http.get(uri, { params:param });
  }

  /* get Credit List */
  public getCreditList(): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}credit`;
    return this.http.get(uri);
  }


   /* Update Credit Manage
      params @id
      params @data update data
   */
   public updateCreditMange(id:string, data:any): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}credit/${id}`;
    return this.http.put(uri,data);
  }

  /* Add Credit Manage
      params @data Add data
   */
      public addCreditManage(data:any): Observable<any> {
        const uri = `${this.base_url}${this.adminRoute}credit`;
        return this.http.post(uri,data);
      }

  /* Delete Credit Manage
      params @id
   */
  public deleteCreditMange(id:string): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}credit/${id}`;
    return this.http.delete(uri);
  }

/* get Sub Admin List */
public getsubAdminList(): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}subAdmin`;
  return this.http.get(uri);
}


/* Update SubAdmin
  params @id
  params @data update data
*/
  public updateSubAdmin(id:string, data:any): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}subAdmin/${id}`;
    return this.http.put(uri,data);
  }

/* Add SubAdmin
  params @data Add data
*/
  public addSubAdmin(data:any): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}subAdmin`;
    return this.http.post(uri,data);
  }

/* Delete SubAdmin
  params @id
*/
  public deleteSubAdmin(id:string): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}subAdmin/${id}`;
    return this.http.delete(uri);
  }



  /* get Faq List */
  public getFaqList(): Observable<any> {
    const uri = `${this.base_url}${this.adminRoute}faqList`;
    return this.http.get(uri);
  }


/* Update Faq
  params @id
  params @data update data
*/
public updateFaq(id:string, data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}faqList/${id}`;
  return this.http.put(uri,data);
}

/* Add Faq
  params @data Add data
*/
public addFaq(data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}faqList`;
  return this.http.post(uri,data);
}

/* Delete Faq
    params @id
  */
public deleteFaq(id:string): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}faqList/${id}`;
  return this.http.delete(uri);
}

/* get tutorial Help List */
 public getTutorialHelpList(): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}tutorialHelp`;
  return this.http.get(uri);
}

/* Add Tutorial Help
  params @data Add data
*/
public addTutorialHelp(data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}tutorialHelp`;
  return this.http.post(uri,data,{ headers: this.multipartyHeaders });
}


/* Update Tutorial Help
  params @id
  params @data update data
*/
public updateTutorialHelp(id:string, data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}tutorialHelp/${id}`;
  return this.http.put(uri,data,{ headers: this.multipartyHeaders });
}



/* Delete Tutorial
  params @id
*/
public deleteTutorialHelp(id:string): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}tutorialHelp/${id}`;
  return this.http.delete(uri);
}

/* get Mynt Setting List */
public getSettingList(): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}myntSetting`;
  return this.http.get(uri);
}


/* Update Setting
  params @id
  params @data update data
*/
public updateSetting(id:string, data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}myntSetting/${id}`;
  return this.http.put(uri,data);
}

/* get Mynt Cms Page List */
public getCmsPageList(): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}cmsPage`;
  return this.http.get(uri);
}


/* Update Cms Page
  params @id
  params @data update data
*/
public updateCmsPage(id:string, data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}cmsPage/${id}`;
  return this.http.put(uri,data);
}

/* Add Cms
  params @data Add data
*/
public addCmsPage(data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}cmsPage`;
  return this.http.post(uri,data);
}



/* get Gift Card List */
public getGiftCardList(): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}giftCard`;
  return this.http.get(uri);
}


/* Update Gift Card
  params @id
  params @data update data
*/
public updateGiftCard(id:string, data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}giftCard/${id}`;
  return this.http.put(uri,data);
}

/* Add Gift Card
  params @data Add data
*/
public addGiftCard(data:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}giftCard`;
  return this.http.post(uri,data);
}

/* get Photo Shoot List */
public getPhotoShootList(): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}photoShoot`;
  return this.http.get(uri);
}

/* get Photo Shoot List
  @params params object {userType: "pro"}
*/
public getContactList(param:any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}contact`;
  return this.http.get(uri,{params:param});
}


/* forget Password Reset Email*/
public forgetPassword(data:any): Observable<any>  {
  const uri = `${this.base_url}${this.adminRoute}forgetPassword`;
  return this.http.post(uri,data,{ headers: this.noauthHeaders });
}

/* Change Password Reset Email*/
public changePassword(data:any): Observable<any>  {
  const uri = `${this.base_url}${this.adminRoute}changePassword`;
  return this.http.post(uri,data,{ headers: this.noauthHeaders });
}

// get professoinal  List
getProfessionalList(param: any): Observable<any> {
  const uri = `${this.base_url}${this.adminRoute}getProfessionalList`;
  return this.http.get(uri, {params: param});
}



//getChatHistory
getChatHistory(param: any) : any {
  const uri = `${this.socket_url}ChatHistoryofSupport`;
  return this.http.post(uri,param);
}
//getChatUserList
getChatUserList(param: any) : any {
  const uri = `${this.socket_url}getUserList`;
  return this.http.get(uri,{params: param, headers:this.noauthHeaders });
}
//getUnreadMessage
chatSeenUpdate(param: any) : any {
  const uri = `${this.socket_url}chatSeenUpdate`;
  return this.http.post(uri,param);
}


  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/
  /*_______________ api services end here ______________*/


}
