import Model, {belongsTo,attr} from '@ember-data/model';

export default class ContactModel extends Model {
    @attr email;
    @attr phone;
    @attr website;

    get hasContact(){
        return this.email?.length || this.phone?.length || this.website?.length;
    }
}
