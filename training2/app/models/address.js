import Model, {belongsTo,attr} from '@ember-data/model';

export default class AddressModel extends Model {
    @attr address;
    @attr zipcode;
    @belongsTo("code") addresstype;

    get addressFr(){
        return this.address.find(l => l.language === 'fr') || {content: 'N/A'}
    }
    get addressNl(){
        return this.address.find(l => l.language === 'nl') || {content: 'N/A'}
    }
    get addressEn(){
        return this.address.find(l => l.language === 'en') || {content: 'N/A'}
    }

    get hasAddress(){
        return this.addressFr?.content?.length  || this.addressEn?.content?.length || this.addressNl?.content?.length
    }
}
