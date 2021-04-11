$dcd=[System.Text.Encoding]::UTF8.GetDecoder()
Get-ChildItem -File -Path *.obml|Sort-Object -Property LastWriteTime|ForEach-Object{
 [System.IO.FileStream]$fs=[System.IO.FileStream]::new($_.FullName,[System.IO.FileMode]::Open,[System.IO.FileAccess]::Read)
 Out-Null -InputObject $fs.Seek(14,[System.IO.SeekOrigin]::Begin)
 $titleLen=$fs.ReadByte()-shl8-bor$fs.ReadByte()
 [System.Byte[]]$uBytes=[System.Byte[]]::new($titleLen)
 Out-Null -InputObject $fs.Read($uBytes,0,$titleLen)
 $cc=$dcd.GetCharCount($uBytes,0,$titleLen)
 [System.Char[]]$chars=[System.Char[]]::new($cc)
 Out-Null -InputObject $dcd.GetChars($uBytes,0,$titleLen,$chars,0)
 [PSCustomObject]@{Name=$_.BaseName;Title=(-join $chars);Time=$_.LastWriteTime}
 $fs.Close()
 $fs.Dispose()}#|Out-GridView
Pause
# Only file
#Get-ChildItem -Path * -File -Include *.obml
#Get-ChildItem -File -Path *.obml
# Include folder
#Get-Item -Path * -Include *.obml
#Get-Item -Path *.obml




