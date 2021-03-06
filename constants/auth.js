module.exports = {
  provider: {
    facebook: {
      label: 'Facebook',
      name: 'facebook'
    },
    google: {
      label: 'Google',
      name: 'google'
    },
    jwt: {
      label: 'JWT',
      name: 'jwt'
    },
    local: {
      label: 'Local',
      name: 'local'
    }
  },
  strategy: {
    jwt: 'jwt',
    local: 'local',
    oauth: 'oauth'
  }
};
