import Model, {belongsTo,attr} from '@ember-data/model';

export default class CodeModel extends Model {
    @attr label;
    @attr code;

    get labelFr(){
        return this.label.find(l => l.language === 'fr')
    }
    get labelNl(){
        return this.label.find(l => l.language === 'nl')
    }
}
