import Model, {belongsTo,attr,hasMany} from '@ember-data/model';

export default class CompanyModel extends Model {
    @attr startdate;
    @attr enterprisenumber;
    @belongsTo("denomination") denomination;
    @belongsTo("contact") contact;
    @belongsTo("address") address;
    @belongsTo("code") juridicalform;
    @belongsTo("code") juridicalsituation;
    @belongsTo("code") status;
    @belongsTo("code") typeofcompany;
    @hasMany("file") attachments;

}
