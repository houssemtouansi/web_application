(function(){
  app.service('authService',authService);
  authService.$inject = ['angularAuth0','$timeout'];
  function authService(angularAuth0,$timeout){

    function login(){ // la fonction de login par Auth0
      angularAuth0.authorize();
    }

    function handleAuthentication(authResult){ // une fois l'utilisateur est authentifié , on stocke le jeton +
                                    //données personnelles dans le local Storage afain d'établir une session locale
      angularAuth0.parseHash(function(err,authResult){
        if(authResult && authResult.accessToken && authResult.idToken){
          setSession(authResult);
        }
      });
    }

    function setSession(authResult){
      var expiresAt = JSON.stringify(
        (authResult.expiresIn * 1000) + new Date().getTime() // temps d'expiration de Jeton
      );
      var profile = {
        name : authResult.idTokenPayload.name,
        nickname : authResult.idTokenPayload.nickname
      }
      localStorage.setItem('access_token',authResult.accessToken);
      localStorage.setItem('id_token',authResult.idToken);
      localStorage.setItem('expires_at',expiresAt);
      localStorage.setItem('profile',JSON.stringify(profile));
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      var test= new Date().getTime() < expiresAt;
      localStorage.setItem('test',test);
    }
    function logout(authResult){//logout , on vide le localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('profile');
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      localStorage.setItem('test',new Date().getTime() < expiresAt);

    }
   function isAuthenticated(){ // verifier si un utilisateur est authentifié
      return localStorage.getItem('test');
    }
       return{
      login: login,
      handleAuthentication : handleAuthentication,
      logout : logout,
      isAuthenticated : isAuthenticated
    };
  }

})();
