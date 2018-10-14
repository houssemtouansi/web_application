<?php
$conn   = mysqli_connect("mysql-houssemtouansi.alwaysdata.net", "158933", "14janvier2011", "houssemtouansi_database");
$output = array();
$query  = "SELECT * FROM users";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        $output[] = $row;
    }
    echo json_encode($output);
}
?>
