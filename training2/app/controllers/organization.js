import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';
import config from  '../config/environment'; 

export default class OrganizationController extends Controller {
    @service store;
    file;
    isValid = true;

    @action
    setFile(e) {
        const reader = new FileReader();
        this.file = event.target.files[0];
        this.set('isValid', this.file === null);
    }

    @action
    async upload() {
        const company = this.get('model');
        const formData = new FormData();
        formData.append('file', this.file);
        const response = await fetch("/uploads", {
            method: 'POST',
            body: formData
        });
        const upload = await response.json();
        const uploadData = await this.store.findRecord('file', upload.data.id);
        company.attachments = [...(company.attachments?.toArray() || []),uploadData];
        company.save();
        this.set('file', null);
        this.set('isValid', false);
    }

    @action
    downloadFile(attachment) {
        let url = `${config.emberDataHost}/uploads/${attachment.id}/download`;
        return fetch(url, {
          method: 'GET',
          headers: {
          }
        }).then((resp) =>{
          return resp.blob();
        }).then((blob) =>{
            const downloadLink = document.createElement('a');
            downloadLink.href= window.URL.createObjectURL(blob);
            downloadLink.setAttribute('download', attachment.name);
            downloadLink.click();
        });
      }

      @action
      deleteFile(attachment) {
        const company = this.get('model');
        company.attachments = (company.attachments?.toArray() || []).filter(a => a.id !== attachment.id);
        company.save();
          
      }


}
