
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "t_shirt";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_POST['flag'] == 'save') {
    $sql = "INSERT INTO clothes (name, number) VALUES ('".$_POST['name']."', '".$_POST['number']."')";
    if ($conn->query($sql) === TRUE) {
      echo "success";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>