export const providers = {
    google: {
      authUrl: 'https://accounts.google.com/o/oauth2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: 'openid email profile',
      redirectUri: 'http://localhost:5000/auth/google/callback'
    },
    facebook: {
      authUrl: 'https://www.facebook.com/v8.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v8.0/oauth/access_token',
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: 'email public_profile',
      redirectUri: 'http://localhost:5000/auth/facebook/callback'
    },
    github: {
      authUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user user:email',
      redirectUri: 'http://localhost:5000/auth/github/callback'
    }
  };
  

  