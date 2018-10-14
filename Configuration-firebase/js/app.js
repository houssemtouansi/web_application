app.controller("controller",['$scope', '$firebaseArray', '$location', '$firebaseObject',
function($scope, $firebaseArray, $location, $firebaseObject) {
    $scope.FBURL_user = "https://config-firebase.firebaseio.com/users/";
    $scope.FBURL_formule = "https://config-firebase.firebaseio.com/formules/";
    $scope.btnName = "Insert";
    $scope.clients = {};
    $scope.formules = {};
    $scope.formules_prix = [];
    $scope.formules_desc = [];
    $scope.client_offre = {};
    $scope.hide_clients = true ;
    $scope.rapport = true ;
    $scope.selectedPrix = 0;
    $scope.insert_client = function() {
        if ($scope.nom == null) {
            alert("entrez votre nom");
        } else if ($scope.prenom == null) {
          alert("entrez votre prenom");
        } else if ($scope.siret == null) {
          alert("entrez votre siret");
        }
        else if ($scope.adresse == null) {
          alert("entrez votre adresse");
        }
        else if ($scope.contact == null) {
          alert("entrez votre contact");
        }
        else if ($scope.nbEmploye == null) {
          alert("entrez votre NbEmploye");
        }
        else {
          var ref = new Firebase($scope.FBURL_user);
          var user = $firebaseArray(ref);
          user.$add({
            nom: $scope.nom,
            prenom: $scope.prenom,
            siret: $scope.siret,
            adresse: $scope.adresse,
            contact: $scope.contact,
            nbEmploye: $scope.nbEmploye,
            nom_siret_adresse: $scope.nom+$scope.siret+$scope.adresse
          });
          $location.path('/');
          $scope.nom = null;
          $scope.prenom = null;
          $scope.siret = null;
          $scope.adresse = null;
          $scope.contact = null;
          $scope.nbEmploye = null;
          $scope.btnName = "Insert";
          $scope.show_data_client();

        }
    }

    $scope.insert_formule = function() {
        if ($scope.formule_id == null) {
            alert("entrez l'Id de formule");
        } else if ($scope.description == null) {
          alert("entrez la description de formule");
        } else if ($scope.prix == null) {
          alert("entrez le prix");
        }
        else {
          var ref = new Firebase($scope.FBURL_formule);
          var formule = $firebaseArray(ref);
          formule.$add({
            formule_id: $scope.formule_id,
            description: $scope.description,
            prix: $scope.prix,
          });
          $location.path('/');
          $scope.formule_id = null;
          $scope.description = null;
          $scope.prix = null;
          $scope.btnName = "Insert";
          $scope.show_data_formule();

        }
    }

    $scope.show_data_client = function() {

            var users = new Firebase($scope.FBURL_user);
            $scope.clients = $firebaseArray(users);
    }

    $scope.show_data_formule = function() {

            var formules_list = new Firebase($scope.FBURL_formule);
            $scope.formules = $firebaseArray(formules_list);
            $scope.formules.$loaded().then(function() {
              for (var i= 0 ; i<$scope.formules.length; i++){
                $scope.formules_prix[i] = $scope.formules[i].prix;
                $scope.formules_desc[i] = $scope.formules[i].description;

              }
              })
              .catch(function(err) {
                console.error(err);
              });


    }

    $scope.update_data_client = function(id, nom, prenom, siret,adresse,contact,nbEmploye) {
      var ref = new Firebase($scope.FBURL_user + id);
  		$scope.user = $firebaseObject(ref);
        $scope.nom = nom;
        $scope.prenom = prenom;
        $scope.siret = siret;
        $scope.adresse = adresse;
        $scope.contact = contact;
        $scope.nbEmploye = nbEmploye;
        $scope.show_data_client();

      $scope.user.$save({
        nom: $scope.user.nom,
        prenom: $scope.user.prenom,
        siret: $scope.user.siret,
        adresse: $scope.user.adresse,
        contact: $scope.user.contact,
        nbEmploye: $scope.user.nbEmploye
      });
    //  $scope.edit_form.$setPristine();
      $scope.user = {};
      $location.path('/users');
      $scope.btnName = "Update";
    }


    $scope.update_data_formule= function(id, formule_id, description, prix) {
      var ref = new Firebase($scope.FBURL_formule + id);
        $scope.formule = $firebaseObject(ref);
        $scope.formule_id = formule_id;
        $scope.description = description;
        $scope.prix = prix;
        $scope.show_data_formule();

      $scope.formule.$save({
        formule_id: $scope.formule.nom,
        description: $scope.formule.description,
        prix: $scope.formule.prix
      });
    //  $scope.edit_form.$setPristine();
      $scope.formule = {};
      $location.path('/formules');
      $scope.btnName = "Update";
    }

    $scope.delete_data_client = function(id) {
        if (confirm("Are you sure you want to delete?")) {
            var ref = new Firebase($scope.FBURL_user + id);
            var user = $firebaseObject(ref)
            user.$remove();
            $scope.show_data_client();
        } else {
            return false;
        }
    }
    $scope.delete_data_formule = function(id) {
        if (confirm("Are you sure you want to delete?")) {
            var ref = new Firebase($scope.FBURL_formule + id);
            var formule = $firebaseObject(ref)
            formule.$remove();
            $scope.show_data_formule();
        } else {
            return false;
        }
    }
    $scope.find_client = function (){
      $scope.hide_clients = true;
      $scope.btnName = "Search";


      if ($scope.nom == null) {
          alert("entrez le nom");
      } else if ($scope.siret == null) {
        alert("entrez le siret");
      } else if ($scope.adresse == null) {
        alert("entrez l'adresse");
      }
      else {
        var firebaseRef = new Firebase($scope.FBURL_user);

       var query = firebaseRef.orderByChild('nom_siret_adresse').equalTo($scope.nom+$scope.siret+$scope.adresse);
       $scope.client = {}
       $scope.client_tab = $firebaseArray(query);
       $scope.client_tab.$loaded().then(function() {
           if($scope.client_tab.length ==0  ){
             alert("Can't find client ")
           }
           else {
             $scope.client =  $scope.client_tab[0];
             $scope.hide_clients = false;

           }

         })
         .catch(function(err) {
           console.error(err);
         });

      }

    }
    $scope.generate_rapport = function(){
      $scope.client_offre.nom = $scope.client.nom;
      $scope.client_offre.prenom= $scope.client.prenom;
      $scope.client_offre.siret= $scope.client.siret;
      $scope.client_offre.adresse= $scope.client.adresse;
      $scope.client_offre.contact= $scope.client.contact;
      $scope.client_offre.nbEmploye= $scope.client.nbEmploye;
      $scope.client_offre.prix_unitaire = $scope.selectedPrix;
      $scope.client_offre.prix_totale = $scope.selectedPrix*$scope.client.nbEmploye;
      $scope.rapport = false ;
    }
    $scope.restart = function(){
      $scope.hide_clients = true ;
      $scope.rapport = true ;
      $scope.siret = null;
      $scope.nom = null;
      $scope.adresse =null ;
    }
    $scope.pdf = function(){

      html2canvas(document.getElementById('exportthis')).then(function(canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
            content: [{
                image: data,
                width: 500,
            }]
        };
        pdfMake.createPdf(docDefinition).download("rapport.pdf");});
    }

}]);
