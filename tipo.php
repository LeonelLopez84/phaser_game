 <?php
$resultado='';
$fecha_tc='';
$tc='';
$salida_SOAP=array('','','','');
$tablas=array('','','','');
$serie=array('TITULO','IDSERIE','BANXICO_FREQ','BANXICO_FIGURE_TYPE','BANXICO_UNIT_TYPE');
$Obs=array('TIME_PERIOD','OBS_VALUE');
$client = new SoapClient(null, array('location' => 'http://www.banxico.org.mx:80/DgieWSWeb/DgieWS?WSDL',
                             'uri'      => 'http://DgieWSWeb/DgieWS?WSDL',
                             'encoding' => 'ISO-8859-1',
                             'trace'    => 1) );


try
{
    
$salida_SOAP[0]= $client->reservasInternacionalesBanxico();
$salida_SOAP[1]= $client->udisBanxico();
$salida_SOAP[2]= $client->tiposDeCambioBanxico();    
$salida_SOAP[3]= $client->tasasDeInteresBanxico();
}
catch (SoapFault $exception)
{
}


for($k=0; $k<4; $k++){
if($salida_SOAP[$k]<>''){
$dom = new DomDocument();
$dom->loadXML($salida_SOAP[$k]);
$xmlSeries = $dom->getElementsByTagName( "Series" );
$xmlObs = $dom->getElementsByTagName( "Obs" );

for($l=0; $l<$xmlObs->length; $l++){
$itemSeries = $xmlSeries->item($l);
$itemObs = $xmlObs->item($l);

$tablas[$k]=$tablas[$k].'<tr>
<td>'.$itemSeries->getAttribute($serie[0]).'</td>
<td>'.$itemSeries->getAttribute($serie[1]).'</td>
<td>'.$itemSeries->getAttribute($serie[2]).'</td>
<td>'.$itemSeries->getAttribute($serie[3]).'</td>
<td>'.$itemSeries->getAttribute($serie[4]).'</td>
<td>'.$itemObs->getAttribute($Obs[1]).'</td>
<td>'.$itemObs->getAttribute($Obs[0]).'</td>
</tr>';
}

}else{

}

}
$titulos='   <tr>
    <td>T&iacute;tulo</td>
    <td>Serie</td>
    <td>Frecuencia</td>
    <td>Figura tipo</td>
    <td>Unidad tipo</td>
    <td>Monto</td>
    <td>Actualizado a:</td>
  </tr>';
echo '
<!DOCTYPE html>
<html>
<title>Web Service BANXICO </title>
<head>
<style>
table#t01 td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 15px;
}

</style>
</head>
<body>
<h1 align="center">Datos Banxico</h1>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="2"  align="center"></td>
  </tr>
  <tr>
    <td>
    <table width="100%" id="t01">
    <tr>
    <td colspan="7"  align="center">Reservas Internacionales Banxico</td>
    </tr>

'.$titulos.$tablas[0].'
    </table>
    </td>
    <td>
     <table width="100%" id="t01">
    <tr>
    <td colspan="7"  align="center">Valor de UDIS</td>
    </tr>
'.$titulos.$tablas[1].'
    </table>
    </td>
  </tr>
    <tr>
    <td>
        <table width="100%" id="t01">
    <tr>
    <td colspan="7"  align="center">Tipos De Cambio Banxico</td>
    </tr>
'.$titulos.$tablas[2].'
    </table>
    </td>
    <td>
         <table width="100%" id="t01">
    <tr>
    <td colspan="7"  align="center">Tasas De Interes Banxico</td>
    </tr>
'.$titulos.$tablas[3].'
    </table>
    </td>
  </tr>
  </table>
 </body>
</html>';
?> 