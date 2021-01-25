module.exports= [
    {
      match: {
        // form of element is {subject,predicate,object}
        // predicate: { type: "uri", value: "http://data.vlaanderen.be/ns/mandaat#einde" }
      },
      callback: {
        url: "http://resource/.mu/delta", method: "POST"
      },
      options: {
        resourceFormat: "v0.0.1",
        gracePeriod: 1000,
        ignoreFromSelf: true
      }
    },
    {
      match: {
        // listen to all changes
      },
      callback: {
        url: 'http://search/update',
        method: 'POST'
      },
      options: {
        resourceFormat: "v0.0.1",
        gracePeriod: 10000,
        ignoreFromSelf: true
      }
    }
  ];