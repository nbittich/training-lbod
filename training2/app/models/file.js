import Model, { belongsTo, attr } from '@ember-data/model';

export default class FileModel extends Model {
    @attr name;
    @attr format;
    @attr size;
    @attr extension;
    @attr uri;
    @belongsTo("company") hasattachment;
}
