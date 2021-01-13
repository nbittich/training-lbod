import Base from 'ember-simple-auth/authenticators/base';
import fetch, { Headers } from 'fetch';
import { getOwner } from '@ember/application';
import config from  '../config/environment'; 

export default class Custom extends Base {
  constructor() {
    super(...arguments);
    const config = getOwner(this).resolveRegistration('config:environment');
    this.basePath = config.emberDataHost +  '/sessions';
  }

  async authenticate(options) {
    const result = await fetch(this.basePath, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }),
      body: JSON.stringify({
        data: {
          type: 'sessions',
          attributes: {
            nickname: options['nickname'],
            password: options['password']
          }
        }
      })
    });

    if (result.ok) {
      return {
        nickname: options['nickname'],
        response: result.json()
      };
    } else {
      const response = await result.json();
      throw response;
    }
  }

  async restore(data) {
    const result = await fetch(`${this.basePath}/current`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      })
    });

    if (result.ok) {
      return {
        nickname: data.nickname,
        response: result.json()
      };
    } else {
      throw result;
    }
  }

  async invalidate() {
    const result = await fetch(`${this.basePath}/current`, {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      })
    });

    if (result.ok)
      return result;
    else
      throw result;
  }
}
