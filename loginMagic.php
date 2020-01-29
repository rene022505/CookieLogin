<?php

# -------------------- Verbindung zur Datenbank herstellen
require "params.php";

# Verbindung herstellen
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

# Verbindung versichern
if ($conn->connect_error) {
    die("Verbindung zu " . $servername . " fehlgeschlagen: " . $conn->connect_error);
}
# --------------------------------------------------------

# SQL Abfrage vorbereiten
$benutzerUeberpruefen = $conn->prepare(
    "SELECT logindata.user, logindata.pass FROM logindata WHERE (logindata.user=? AND logindata.pass=?)"
    );
# Werte für die Abfrage bestimmen
$benutzerUeberpruefen->bind_param("ss", $username, $password);

# Eingegebene Werte verwenden
$username = $_POST["userName"];
$password = $_POST["passWord"];

# Abfrage ausführen
$benutzerUeberpruefen->execute();

# Wenn eine Zeile aus der Abfrage zurückkommt dann true ansonsten false
$result = $benutzerUeberpruefen->get_result();
if($result->num_rows == 1) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}

# Verbindung beenden
$conn->close();