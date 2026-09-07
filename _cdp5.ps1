param(
  [string]$WsUrl = "ws://localhost:9227/devtools/page/0"
)
$ws = New-Object System.Net.WebSockets.ClientWebSocket
$ct = New-Object System.Threading.CancellationTokenSource
$ct.CancelAfter(15000)
$ws.ConnectAsync([Uri]$WsUrl, $ct.Token).GetAwaiter().GetResult()

function Invoke-CDP($ws, $id, $method, $params) {
  $obj = @{ id = $id; method = $method }
  if ($params) { $obj.params = $params }
  $json = $obj | ConvertTo-Json -Compress -Depth 10
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  $seg = [ArraySegment[byte]]::new($bytes)
  $ws.SendAsync($seg, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct.Token).GetAwaiter().GetResult()
  $buf = New-Object byte[] 1048576
  $sb = New-Object System.Text.StringBuilder
  do {
    $arr = [ArraySegment[byte]]::new($buf)
    $res = $ws.ReceiveAsync($arr, $ct.Token).GetAwaiter().GetResult()
    $sb.Append([System.Text.Encoding]::UTF8.GetString($buf, 0, $res.Count)) | Out-Null
  } while (-not $res.EndOfMessage)
  return $sb.ToString()
}

# клик магазин
$e1 = @"
(function(){
  var btn = document.querySelector('.btn-shop');
  if(!btn) return {ok:false, why:'no btn'};
  btn.click();
  return {ok:true};
})()
"@
$r1 = Invoke-CDP $ws 1 "Runtime.evaluate" @{ expression = $e1; returnByValue = $true }
Write-Output "R1: $r1"
Start-Sleep -Milliseconds 1200
$e2 = @"
(function(){
  var skins=document.getElementById('gg-skins');
  var ammo=document.getElementById('gg-ammo');
  var ac=document.getElementById('bb-ammo-count');
  return {
    skins: skins?skins.children.length:-1,
    ammo: ammo?ammo.children.length:-1,
    ammoCountChip: ac?ac.children.length:-1,
    errs: 0
  };
})()
"@
$r2 = Invoke-CDP $ws 2 "Runtime.evaluate" @{ expression = $e2; returnByValue = $true }
Write-Output "R2: $r2"
$ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct.Token).GetAwaiter().GetResult()