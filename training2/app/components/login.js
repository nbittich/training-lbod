import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class LoginComponent extends Component {
  @tracked errorMessage;
  @service session;

  @action
  async authenticate(e) {
    e.preventDefault();
    let { identification, password } = this;
    try {
      await this.session.authenticate('authenticator:custom', {
        nickname:this.identification,
        password:this.password
      });
    } catch(error) {
      console.error(error)
      if (e.errors?.length && e.errors[0].title) {
        this.errorMessage = e.errors[0].title;
      } else {
        if (e.status == 403){
          this.errorMessage = this.forbiddenMessage;
        }
        else{
          this.errorMessage = this.failureMessage;
        }
      }
    }

    if (this.session.isAuthenticated) {
    }
    if(this.errorMessage) {
      alert(this.errorMessage);
    }
  }

  @action
  updateIdentification(e) {
    this.identification = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }


  get forbiddenMessage() {
    return this.args.forbiddenMessage || "You don't have access to this application";
  }

  get failureMessage() {
    return this.args.failureMessage || 'Something went wrong. Please try again later.';
  }

  get label() {
    return this.args.label || 'Login';
  }
}
