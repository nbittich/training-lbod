import Model, {belongsTo,attr} from '@ember-data/model';

export default class AddressModel extends Model {
    @attr address;
    @attr zipcode;
    @belongsTo("code") addresstype;

    get addressFr(){
        return this.address.find(l => l.language === 'fr')
    }
    get addressNl(){
        return this.address.find(l => l.language === 'nl')
    }
    get addressEn(){
        return this.address.find(l => l.language === 'en')
    }
}
