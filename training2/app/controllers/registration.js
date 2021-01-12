import Controller from '@ember/controller';

import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class RegistrationController extends Controller {
    name = '';
    nickname = '';
    password = '';
    passwordConfirmation = '';
    loading = false;
    errorMessage = null;



    @action
    async register(e) {
        e.preventDefault();

        this.toggleProperty('loading');
        try {
            const response = await fetch("/accounts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/vnd.api+json'
                },
                body: JSON.stringify({
                    data: {
                        type: 'accounts',
                        attributes: {
                            name: this.name,
                            nickname: this.nickname,
                            password: this.password,
                            'password-confirmation': this.passwordConfirmation
                        }
                    }
                    
                })
            });
            this.set('errorMessage', response.statusText);
            this.set('name','');
            this.set('nickname','');
            this.set('password','');
            this.set('passwordConfirmation','');
            setTimeout(() => {
                this.transitionToRoute('home');
            }, 1000);
        } catch (e) {
            const error = reason.responseJSON.errors[0].title;
            console.log('Registration failed: ' + error);
            this.set('errorMessage', error);
        }
        this.toggleProperty('loading');




    }

    @action
    setName(e) {
        this.set('name', e.target.value)
    }

    @action
    setNickname(e) {
        this.set('nickname', e.target.value)
    }

    @action
    setPassword(e) {
        this.set('password', e.target.value)
    }

    @action
    setPasswordConfirmation(e) {
        this.set('passwordConfirmation', e.target.value)
    }
}
