module.exports = {
  apps : [{
    script: 'npm start',

  }],

  deploy : {
    production : {
      key : 'mesob.pem' ,
      user : 'ubuntu',
      host : '3.216.230.161',
      ref  : 'origin/Uneeb',
      repo : 'git@github.com:uneebmalik99/MesobStore.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm install --legacy-peer-deps && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};


