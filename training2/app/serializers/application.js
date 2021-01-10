import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
    normalizeQueryResponse(store, clazz, payload) {
        const result = super.normalizeQueryResponse(...arguments);
        result.meta = result.meta || {};
    
        if (payload.links) {
          result.meta.pagination = this.createPageMeta(payload.links);
        }
    
        return result;
      }
      
      createPageMeta(data) {
        let meta = {};
    
        Object.keys(data).forEach(type => {
          const link = data[type];
          meta[type] = {};
    
          if (link) {
            const query = link.split(/\?(.+)/)[1] || '';
    
            query.split('&').forEach(pairs => {
              const [param, value] = pairs.split('=');
    
              if (decodeURIComponent(param) === 'page[number]') {
                meta[type].number = parseInt(value);
              } else if (decodeURIComponent(param) === 'page[size]') {
                meta[type].size = parseInt(value);
              }
    
            });
          }
        });
    
        return meta;
      }

}
