import Model, { attr } from '@ember-data/model';

export default class AddressModel extends Model {
  @attr country;
  @attr locality;
  @attr postcode;
  @attr street;

  get fullAddress(){
    return `${this.street}, ${this.postcode} - ${this.locality}, ${this.country}`
  }
}
