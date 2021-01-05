import Route from '@ember/routing/route';

export default class HomeRoute extends Route {
  async model(){
    const telephones = await this.store.findAll('telephone');
    const addresses = await this.store.findAll('address');
    const individuals = await this.store.findAll('individual');
    return {
      telephones: telephones,
      addresses: addresses,
      individuals: individuals
    }
  }
}
