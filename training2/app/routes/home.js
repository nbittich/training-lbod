import Route from '@ember/routing/route';

export default class HomeRoute extends Route {
  async model(){
    const findAll = async type => {
      try {
        return await this.store.findAll(type);
      }catch (e){
        return []
      }
    }
    const telephones = await findAll('telephone');
    const addresses = await findAll('address');
    const individuals = await findAll('individual');
    return {
      telephones: telephones,
      addresses: addresses,
      individuals: individuals
    }
  }

}
