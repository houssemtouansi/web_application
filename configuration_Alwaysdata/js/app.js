app.controller("controller", function($scope, $http,authService) {
    $scope.btnName = "Insert";
    $scope.clients = {};
    $scope.formules= {};
    $scope.formules_prix = [];
    $scope.formules_desc = [];
    $scope.client_offre = {};
    $scope.hide_clients = true ;
    $scope.rapport = true ;
    $scope.selectedPrix = 0;
    $scope.authResult = {};
///Controlleur Authentification
    $scope.login = function(){

       authService.login();
       authService.handleAuthentication($scope.authResult);


    } ;

    $scope.logout = function(){
      authService.logout($scope.authResult);
    };

    $scope.isAuthenticated = function(){
      return  authService.isAuthenticated();
    };

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
        else if ($scope.nbemploye == null) {
          alert("entrez votre NbEmploye");
        }
        else {
            $http.post(
                "PHP/insert_client.php", {
                    'nom': $scope.nom,
                    'prenom': $scope.prenom,
                    'siret': $scope.siret,
                    'adresse': $scope.adresse,
                    'contact': $scope.contact,
                    'nbemploye': $scope.nbemploye,
                    'btnName': $scope.btnName,
                    'id': $scope.id
                }
            ).success(function(data) {

                alert(data);
                $scope.nom = null;
                $scope.prenom = null;
                $scope.siret = null;
                $scope.adresse = null;
                $scope.contact = null;
                $scope.nbemploye = null;
                $scope.btnName = "Insert";
                $scope.show_data_client();

            });
        }
    }


    $scope.insert_formule = function() {
        if ($scope.formule_id == null) {
            alert("entrez  l'id de formule");
        } else if ($scope.description == null) {
          alert("entrez la description de formule");
        } else if ($scope.prix == null) {
          alert("entrez le prix");
        }
        else {
            $http.post(
                "PHP/insert_formule.php", {
                    'formule_id': $scope.formule_id,
                    'description': $scope.description,
                    'prix': $scope.prix,
                    'btnName': $scope.btnName,
                    'id': $scope.id
                }
            ).success(function(data) {
                alert(data);
                $scope.formule_id = null;
                $scope.description = null;
                $scope.prix = null;
                $scope.btnName = "Insert";
                $scope.show_data_formule();
            });
        }
    }


    $scope.show_data_client = function() {
        $http.get("PHP/display_client.php")
            .success(function(data) {
                $scope.clients = data;
            });
    }

        $scope.show_data_formule= function() {
            $http.get("PHP/display_formule.php")
                .success(function(data) {
                    $scope.formules = data;
                    for (var i= 0 ; i<$scope.formules.length; i++){
                      $scope.formules_prix[i] = $scope.formules[i].prix;
                      $scope.formules_desc[i] = $scope.formules[i].description;

                    }
                });
        }

    $scope.update_data_client = function(id, nom, prenom, siret,adresse,contact,nbemploye) {
        $scope.id = id;
        $scope.nom = nom;
        $scope.prenom = prenom;
        $scope.siret = siret;
        $scope.adresse = adresse;
        $scope.contact = contact;
        $scope.nbemploye = nbemploye;
        $scope.btnName = "Update";
    }

    $scope.update_data_formule = function(id, formule_id, description, prix) {
        $scope.id = id;
        $scope.formule_id = formule_id;
        $scope.description = description;
        $scope.prix = prix;
        $scope.btnName = "Update";
    }
    $scope.delete_data_client = function(id) {
        if (confirm("Are you sure you want to delete?")) {
            $http.post("PHP/delete_client.php", {
                    'id': id
                })
                .success(function(data) {
                    $scope.show_data_client();
                });
        } else {
            return false;
        }
    }

    $scope.delete_data_formule = function(id) {
        if (confirm("Are you sure you want to delete?")) {
            $http.post("PHP/delete_formule.php", {
                    'id': id
                })
                .success(function(data) {
                    alert(data);
                    $scope.show_data_formule();
                });
        } else {
            return false;
        }
    }

    $scope.find_client = function (){
     $scope.hide_clients = true;

     if ($scope.nom == null) {
         alert("entrez le nom");
     } else if ($scope.siret == null) {
       alert("entrez le siret");
     } else if ($scope.adresse == null) {
       alert("entrez l'adresse");
     }
     else {
       $http.post("PHP/search_client.php",{
           'nom': $scope.nom,
           'siret': $scope.siret,
           'adresse': $scope.adresse
       }).success(function(data) {
         if(data.length != 0){
           $scope.client = data[0];
           $scope.hide_clients = false ;
         }
         else {
           alert ("cant find client");
         }

           }).error(function(error){
             console.log(error);
           });
         }
       }
    $scope.generate_rapport = function(){
           $scope.client_offre.nom = $scope.client.nom;
           $scope.client_offre.prenom= $scope.client.prenom;
           $scope.client_offre.siret= $scope.client.siret;
           $scope.client_offre.adresse= $scope.client.adresse;
           $scope.client_offre.contact= $scope.client.contact;
           $scope.client_offre.nbEmploye= $scope.client.nbemploye;
           $scope.client_offre.prix_unitaire = $scope.selectedPrix;
           $scope.client_offre.prix_totale = $scope.selectedPrix*$scope.client.nbemploye;
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

});
