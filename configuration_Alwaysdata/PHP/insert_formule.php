<?php
$conn   = mysqli_connect("mysql-houssemtouansi.alwaysdata.net", "158933", "14janvier2011", "houssemtouansi_database");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
    $formule_id    = mysqli_real_escape_string($conn, $info->formule_id);
    $description    = mysqli_real_escape_string($conn, $info->description);
    $prix      = mysqli_real_escape_string($conn, $info->prix);
    $btn_name = $info->btnName;

    if ($btn_name == "Insert") {
        $query = "INSERT INTO formules (formule_id, description, prix) VALUES ('$formule_id', '$description', '$prix')";
        if (mysqli_query($conn, $query)) {
            echo "Data Inserted Successfully...";
        } else {
            echo 'Failed';
        }
    }
    if ($btn_name == 'Update') {
        $id    = $info->id;
        $query = "UPDATE formules SET formule_id = '$formule_id', description = '$description', prix = '$prix' WHERE id = '$id'";
        if (mysqli_query($conn, $query)) {
            echo 'Data Updated Successfully...';
        } else {
            echo 'Failed';
        }
    }
}
?>
