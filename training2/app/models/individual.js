import Model, {belongsTo,attr} from '@ember-data/model';

export default class IndividualModel extends Model {
  @belongsTo('address') address;
  @belongsTo('telephone') telephone;
  @attr email;
  @attr fullname;
  @attr nickname;
}
