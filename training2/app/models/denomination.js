import Model, {belongsTo,attr} from '@ember-data/model';

export default class DenominationModel extends Model {
    @attr name;
    @attr uri;

    get nameFr(){
        return this.name.find(l => l.language === 'fr') || {content: 'N/A'}
    }
    get nameNl(){
        return this.name.find(l => l.language === 'nl') || {content: 'N/A'}
    }
    get nameEn(){
        return this.name.find(l => l.language === 'en') || {content: 'N/A'}
    }
}
