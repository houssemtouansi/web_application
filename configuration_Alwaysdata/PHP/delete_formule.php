<?php
$conn   = mysqli_connect("mysql-houssemtouansi.alwaysdata.net", "158933", "14janvier2011", "houssemtouansi_database");
$data    = json_decode(file_get_contents("php://input"));
if (count($data) > 0) {
    $id    = $data->id;
    $query = "DELETE FROM formules WHERE id='$id'";
    if (mysqli_query($conn, $query)) {
        echo 'Data Deleted Successfully...';
    } else {
        echo 'Failed';
    }
}
?>
