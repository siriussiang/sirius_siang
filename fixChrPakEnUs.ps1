[IO.FileStream]$fs=[IO.FileStream]::new((Convert-Path "$env:ProgramFiles\Google\Chrome\Application\*\Locales\en-US.pak"),[IO.FileMode]::Open,[IO.FileAccess]::ReadWrite)
if($fs){
 [IO.BinaryReader]$br=[IO.BinaryReader]::new($fs)
 $vers=$br.ReadUInt32()
 if($vers -eq 4){
  $numb=$br.ReadUInt32()
  $fs.Position++}
 elseif($vers -eq 5){
  $fs.Position+=4
  $numb=$br.ReadUInt16()
  $fs.Position+=2}

 while($br.ReadUInt16()){
  $addr=$br.ReadUInt32()
  $pos=$fs.Position
  $fs.Position+=2
  $leng=$br.ReadUInt32()-$addr
  if($leng -eq 16){
   Out-Null -Inp $fs.Seek($addr,[System.IO.SeekOrigin]::Begin)
   if(-join $br.ReadChars($leng) -ceq '&Translate to $1'){
    Out-Null -Inp $fs.Seek($addr+14,[System.IO.SeekOrigin]::Begin)
    $fs.WriteByte(0x20)
    $fs.WriteByte(0x20)
    break}}
  else{$fs.Position=$pos}}

 $br.Close()
 $fs.Close()
 $br.Dispose()
 $fs.Dispose()}
else{"Open file."}