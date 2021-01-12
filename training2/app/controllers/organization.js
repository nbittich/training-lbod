import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';
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
        console.log(upload.attachments)
        company.attachments = [uploadData];
        company.save();
        this.set('file', null);
        this.set('isValid', false);
    }


}
