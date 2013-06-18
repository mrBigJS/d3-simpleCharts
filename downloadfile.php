<?php

$data = $_POST['svg'];
$fileName = $_POST['fname'];
$type = $_POST['type'];
$css = $_POST['cssfile'];

if ($type == 'svg') {
/*
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
*/
$svgheader = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

/* TODO
if ($css) {
	$styles = '<svg><def><style type="text/css"><![CDATA[' . file_get_contents($css) . ']]></style></def>';
	$data = $svgheader . $styles . $data . '</svg>';
} else
*/
$data = $svgheader . $data;
}

// echo $data;

outputFile($data,$fileName,$type);

// outputFile is returning all input back to browser as a saveable attachement
function outputFile( $data, $fileName, $mimeType = '' ) {
    // Setup
    $mimeTypes = array(
        'pdf' => 'application/pdf',
        'txt' => 'text/plain',
        'html' => 'text/html',
        'exe' => 'application/octet-stream',
        'zip' => 'application/zip',
        'doc' => 'application/msword',
        'xls' => 'application/vnd.ms-excel',
        'ppt' => 'application/vnd.ms-powerpoint',
        'gif' => 'image/gif',
        'png' => 'image/png',
        'jpeg' => 'image/jpg',
        'jpg' => 'image/jpg',
        'php' => 'text/plain', 
		'svg' => 'image/svg+xml'
    );

$data = str_replace("\\","",$data);
file_put_contents('tmp/' . $fileName . '.' . $mimeType, $data); // creating download at the tmp dir

/* This is another way to to force download a file, we trust Apache + its .htaccess on tmp dir

    header('Content-Type: ' . $mimeTypes[$mimeType]);
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
    header('Content-Transfer-Encoding: binary');
    header('Accept-Ranges: bytes');
    header('Cache-Control: private');
    header('Pragma: private');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	echo $data;
	
*/
	echo 1;
}

?>