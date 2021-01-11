import Model, {belongsTo,attr} from '@ember-data/model';

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

}
