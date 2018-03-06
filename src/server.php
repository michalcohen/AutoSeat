<?php
if(isset($_POST)) {
    deliver_response(200, "success");
}

function deliver_response($status, $status_message) {
    header("HTTP/1.1 $status $status_message");
    $response['status'] = $status;
    $response['status_message'] = $status_message;
    $response['data'] = $_REQUEST;
    $json_response = json_encode($response);
    echo $json_response;
    $numberOfTables = 30;
    
    
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$name = $request->invitee;
    $name = wordwrap($name,70);
    $jsonFile = file_get_contents('./assets/datastore/invitedSeats.json');
    $jsonTable = file_get_contents('./assets/datastore/tables.json');
    $file = json_decode($jsonFile, JSON_UNESCAPED_UNICODE);
    $fileTable = json_decode($jsonTable, JSON_UNESCAPED_UNICODE);

    $tables = array();
    for ($i = 0; $i < $numberOfTables; $i++){
        $tables[$i] = array();
    }

    foreach ((array)$file['guests'] as $key => $entry) {
        $guest = new Guest;
        $guest->name = $entry['name'];
        $guest->tableNumber = $entry['tableNumber'];
        $guest->hasArrived = $entry['hasArrived'];
        $guest->amount = $entry['amount'];
        array_push($tables[$entry['tableNumber']], $guest);
    }
    @$tableNumber = -1;
    foreach ((array)$file['guests'] as $key => $entry) {
        if ($entry['name'] == $name) {
            $file['guests'][$key]['hasArrived'] = true;
            $tableNumber = $file['guests'][$key]['tableNumber'];
            $sum = 0;
            $maxVal = 0;
            for ($i = 0; $i < count($tables[$entry['tableNumber']]); $i++){
                if ($tables[$entry['tableNumber']][$i]->hasArrived){
                    $sum += $tables[$entry['tableNumber']][$i]->amount;   
                }
                if ($tables[$entry['tableNumber']][$i]->amount > $maxVal && $entry['hasArrived']== false){
                    $maxVal = $tables[$entry['tableNumber']][$i]->amount;
                }
            }
            file_put_contents("dfile.txt", $entry['name'], FILE_APPEND);
            file_put_contents("dfile.txt", $sum, FILE_APPEND);
            file_put_contents("dfile.txt", $maxVal, FILE_APPEND);
            if ($sum + $maxVal + $file['guests'][$key]['amount'] > 12){
                file_put_contents("dfile.txt", "יhelppppp", FILE_APPEND);
                mail('cohenmelany1@gmail.com', "Table over booked", "Table No." . $entry['tableNumber'] . " may be overbooked.\n Save us, Daria!");
            }
        }
    }


    foreach ((array)$fileTable['tables'] as $key => $entry) {
        if ($entry['tableNumber'] == $tableNumber) {
            $fileTable['tables'][$key]['arrived'] += 1;
        }
    }
    
    $newJsonString = json_encode($file, JSON_UNESCAPED_UNICODE);
    file_put_contents('./assets/datastore/invitedSeats.json', $newJsonString);   

    $newJsonStringTable = json_encode($fileTable, JSON_UNESCAPED_UNICODE);
    file_put_contents('./assets/datastore/tables.json', $newJsonStringTable);   
}

class Guest{
    public $name;
    public $tableNumer;
    public $amount;
    public $hasArrived;
}
?>