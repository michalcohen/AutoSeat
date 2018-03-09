<?php
if(isset($_POST)) {
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$hasArrived = $request->hasArrived;
    @$name = $request->name;
    $name = wordwrap($name,70);
    $jsonFile = file_get_contents('./assets/datastore/invitedSeats.json'); 
    $file = json_decode($jsonFile, JSON_UNESCAPED_UNICODE);
    
    foreach ($file['guests'] as $key => $entry) {
        if ($entry['name'] == $name) {
            $file['guests'][$key]['hasArrived'] = $hasArrived;
        }
    }

    $newJsonString = json_encode($file, JSON_UNESCAPED_UNICODE);
    file_put_contents('./assets/datastore/invitedSeats.json', $newJsonString);

    deliver_response(200, "success");
}

function deliver_response($status, $status_message) {
    header("HTTP/1.1 $status $status_message");
    $response['status'] = $status;
    $response['status_message'] = $status_message;
    $response['data'] = $_REQUEST;
    $json_response = json_encode($response);
    echo $json_response;
}
?>