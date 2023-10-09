module.exports = {
  apps : [{
    script: 'npm start',

  }],

  deploy : {
    production : {
      key : 'mesob.pem' ,
      user : 'ubuntu',
      host : '107.21.89.173',
      ref  : 'origin/main',
      repo : 'git@github.com:uneebmalik99/MesobStore.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};


