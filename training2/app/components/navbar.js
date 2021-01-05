import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class NavbarComponent extends Component {
  @service
  session;

  account = null;
  constructor() {
    super(...arguments);
    this.init();
  }
  async init() {
    if(this.session.isAuthenticated) {
    }
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }

  get auth(){
    return this.session.data.authenticated.nickname;
  }
}
