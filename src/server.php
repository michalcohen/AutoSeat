<?php
if(isset($_POST)) {
    deliver_response(200, "success");
}

function deliver_response($status, $status_message) {
    header("HTTP/1.1 $status $status_message");
    $response['status'] = $status;
    $response['status_message'] = $status_message;
    
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$name = $request->invitee;
    
    $name = wordwrap($name,70);
    // send email
    mail("cohenmelany1@gmail.com","My subject",$name);
    
    $jsonFile = file_get_contents('./assets/datastore/invitedSeats.json');
    
    //$jsonFile = mb_convert_encoding($jsonFile, 'HTML-ENTITIES', "UTF-8");
    $file = json_decode($jsonFile, JSON_UNESCAPED_UNICODE);
    if ($file['guests'][0]['hasArrived']){
        file_put_contents("dfile.txt", "yesyeywyysy");
    } else {
         file_put_contents("dfile.txt", "booohoooo");

    }
    
    
    $response['data'] = $name;
    $json_response = json_encode($response);
    echo $json_response;
   
    
    foreach ($file['guests'] as $key => $entry) {
        if ($entry['name'] == $name) {
            file_put_contents("dfile.txt", $entry['name']);
            $file['guests'][$key]['hasArrived'] = true;
        }
    }

    $newJsonString = json_encode($file, JSON_UNESCAPED_UNICODE);
    file_put_contents('./assets/datastore/invitedSeats.json', $newJsonString);
    
    
}
?>