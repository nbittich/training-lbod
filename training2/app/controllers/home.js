import Controller from '@ember/controller';
import { action } from "@ember/object";

export default class HomeController extends Controller {
 /*  isLoading;
  constructor() {
    super();
    this.isLoading = false;
  }
  @action
  async deleteAllRecords(){
    const funcDeleteAllRecords =  records=> records.forEach(async record => {
      await record.destroyRecord();
    });

    const telephones = await this.store.findAll('telephone',{reload: true});
    const addresses = await this.store.findAll('address',{reload: true});
    const individuals = await this.store.findAll('individual',{reload: true});

    await funcDeleteAllRecords(individuals);
    await funcDeleteAllRecords(telephones);
    await funcDeleteAllRecords(addresses);
  }

  @action
  async createRecord(){
    this.toggleProperty('isLoading');

    const individual = await this.store.createRecord(
      'individual', {
        email: 'alo@ah.fr',
        fullname: 'Mike Horn33',
        nickname: 'mhorn44',
      }
    );
   const address= await this.store.createRecord('address',
     {
      country: 'Mejico',
        locality: 'Puerto Rico',
        postcode: '1999',
        street: 'plaja del lumbazur'
    });
   const telephone = await this.store.createRecord('telephone',{
     value: '+666-666.666'
   })
   await address.save();
   await telephone.save();
   individual.address = address;
   individual.telephone = telephone;
   await individual.save();
   this.toggleProperty('isLoading');

  } */
}
