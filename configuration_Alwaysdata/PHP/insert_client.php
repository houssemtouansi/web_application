<?php
$conn   = mysqli_connect("mysql-houssemtouansi.alwaysdata.net", "158933", "14janvier2011", "houssemtouansi_database");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
    $nom     = mysqli_real_escape_string($conn, $info->nom);
    $prenom    = mysqli_real_escape_string($conn, $info->prenom);
    $siret      = mysqli_real_escape_string($conn, $info->siret);
    $adresse      = mysqli_real_escape_string($conn, $info->adresse);
    $contact      = mysqli_real_escape_string($conn, $info->contact);
    $nbemploye      = mysqli_real_escape_string($conn, $info->nbemploye);


    $btn_name = $info->btnName;
    if ($btn_name == "Insert") {
        $query = "INSERT INTO users(nom, prenom, siret,adresse,contact,nbemploye) VALUES ('$nom', '$prenom', '$siret','$adresse','$contact','$nbemploye')";
        if (mysqli_query($conn, $query)) {
            echo "Data Inserted Successfully...";
        } else {
            echo 'Failed';
        }
    }
    if ($btn_name == 'Update') {
        $id    = $info->id;
        $query = "UPDATE users SET nom = '$nom', prenom = '$prenom', siret = '$siret',adresse = '$adresse',contact = '$contact',nbEmploye = '$nbemploye' WHERE id = '$id'";
        if (mysqli_query($conn, $query)) {
            echo 'Data Updated Successfully...';
        } else {
            echo 'Failed';
        }
    }
}
?>
