<?php
$conn   = mysqli_connect("mysql-houssemtouansi.alwaysdata.net", "158933", "14janvier2011", "houssemtouansi_database");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
  $nom      = mysqli_real_escape_string($conn, $info->nom);
  $siret    = mysqli_real_escape_string($conn, $info->siret);
  $adresse  = mysqli_real_escape_string($conn, $info->adresse);

  $output = array();
  $query  = "SELECT * FROM users WHERE nom = '$nom' &&  siret = '$siret' && adresse = '$adresse'";
  $result = mysqli_query($conn, $query);
  if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_array($result)) {
          $output[] = $row;
      }
      echo json_encode($output);
  }

}

?>
