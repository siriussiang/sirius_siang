# System.Windows.Forms  > System.Windows.Forms.UnsafeNativeMethods > SendInput
#                       > System.Windows.Forms.NativeMethods > INPUT,INPUTUNION,MOUSEINPUT,KEYBDINPUT
# PresentationFramework > Standard.NativeMethods

#WindowsBase       > MS.Win32.UnsafeNativeMethods > BitBlt
#UIAutomationTypes > MS.Win32.UnsafeNativeMethods > BitBlt

#System.Windows.Forms  > System.Windows.Forms.SafeNativeMethods   > [bool]GetClientRect([HandleRef]hwnd,[ref][System.Windows.Forms.NativeMethods+RECT]rect)
#System.Windows.Forms  > System.Windows.Forms.UnsafeNativeMethods > [bool]GetClientRect([HandleRef]hwnd,[ref][System.Windows.Forms.NativeMethods+RECT]rect)
#                                                                   [bool]GetClientRect([HandleRef]hwnd,[IntPtr]rect)
#PresentationFramework > Standard.NativeMethods                   > [Standard.RECT]GetClientRect([IntPtr]hwnd)



Add-Type -Assembly System.Windows.Forms,PresentationFramework
[System.AppDomain]::CurrentDomain.GetAssemblies()|ForEach{
 if($_.FullName -like 'System.Windows.Forms,*'){
  [Reflection.TypeInfo]$FormsUnsafe=$_.GetType('System.Windows.Forms.UnsafeNativeMethods')#SendInput
  [Reflection.TypeInfo]$INPUT1=$_.GetType('System.Windows.Forms.NativeMethods').GetNestedType('INPUT')
  [Reflection.TypeInfo]$INPUT_ARRAY=$INPUT1.MakeArrayType()
  [Reflection.TypeInfo]$FormsSafe=$_.GetType('System.Windows.Forms.SafeNativeMethods')}
 if($_.FullName -like 'System.Drawing,*'){
  [Reflection.TypeInfo]$DrawingSafe=$_.GetType('System.Drawing.SafeNativeMethods')}
 if($_.FullName -like 'PresentationFramework,*'){
  [Reflection.TypeInfo]$WPF=$_.GetType('Standard.NativeMethods')}}
# Search Add-Type-PassThru will miss not direct type(Drawing).
# Add-Type-PassThru return an array, dose not contain not direct type(Drawing).

if($INPUT1 -and $DrawingSafe){
 $INPUT1,$FormsSafe,$FormsUnsafe,$DrawingSafe,$WPF|% FullName

 #$pInputs=
 # @{type=1;inputUnion=@{ki=@{wVk=0x41}}},@{type=1;inputUnion=@{ki=@{wVk=0x41;dwFlags=2}}},
 # @{type=1;inputUnion=@{ki=@{wVk=0x42}}},@{type=1;inputUnion=@{ki=@{wVk=0x42;dwFlags=2}}} -as $INPUT_ARRAY

 #Start-Sleep -Seconds 4
 #$FormsUnsafe::SendInput(4,$pInputs,[System.Runtime.InteropServices.Marshal]::SizeOf([Type]$INPUT1))
 #INPUT建立後就是唯讀，無法編輯？

#  [Drawing.Graphics]$gr2=[Drawing.Graphics]::FromHwnd([Diagnostics.Process]::GetCurrentProcess().MainWindowHandle)

   #$form1.Paint+={Write-Host 123456} can't use
    #while($i -lt 2){
    # Start-Sleep -Seconds 1
    # $i+=1}
    #$Global:fpGraphUsingState++
    #if($fpGraphUsingState -ge 2){
    # $fpGraph.ReleaseHdc()
    # $fpGraph.Dispose()
    # 'FPG disposed!'}
   #$form1.Paint.GetType().FullName|Write-Host
   #$form1.Paint|Out-Host




 [Diagnostics.Process[]]$flaPlas=[Diagnostics.Process]::GetProcessesByName('flashplayer_32_sa_debug')
 if($flaPlas.Count){
  $fpClientRect=$WPF::GetClientRect($flaPlas[0].MainWindowHandle)
  [int]$w=960
  [int]$h=560
  if($fpClientRect.Width -eq $w -and $fpClientRect.Height -eq $h){
   #All right

   #Form and Bitmap !D
   [Drawing.Bitmap]$poolBackGround=[Drawing.Bitmap]::new('D:\Yo\Screenshots\download.png')
   [Drawing.Bitmap]$calcBmp=[Drawing.Bitmap]::new($w,$h)
   [System.Windows.Forms.Form]$form1=[System.Windows.Forms.Form]::new()

   $form1.ClientSize=[Drawing.Size]::new($w,$h)
   #Must before CreateGraphics
   #Graphic !D
   [Drawing.Graphics]$fpGraph=[Drawing.Graphics]::FromHwnd($flaPlas[0].MainWindowHandle)
   [Drawing.Graphics]$calcGraph=[Drawing.Graphics]::FromImage($calcBmp)
   [Drawing.Graphics]$formGraph=$form1.CreateGraphics()
   # !D
   [System.Windows.Forms.Timer]$fTimer=[System.Windows.Forms.Timer]::new()

   [bool]$isBusy=$false
   $fTimer.Interval=5000


   $form1.add_Paint(($onPaint1={
    $this.remove_Paint($onPaint1)
    Write-Host "Painting!"
    [Runtime.InteropServices.HandleRef]$fpdch=[Runtime.InteropServices.HandleRef]::new($null,$fpGraph.GetHdc())
    [Runtime.InteropServices.HandleRef]$formDch=[Runtime.InteropServices.HandleRef]::new($null,$_.Graphics.GetHdc())
    Out-Null -Inp $DrawingSafe::BitBlt($formDch,0,0,$w,$h,$fpdch,0,0,$DrawingSafe::SRCCOPY)
    $fpGraph.ReleaseHdc()
    $_.Graphics.ReleaseHdc()
    $fTimer.Start()
    7,($PSSenderInfo -eq $null),8,($CurrentlyExecutingCommand -eq $null),9|Format-Table -AutoSize|Out-Host
    Write-Host 'Painted!'}))


   $fTimer.add_Tick({if(-not $isBusy){
    $isBusy=$true
    Write-Host 'Ticking!'
    [Runtime.InteropServices.HandleRef]$fpdch=[Runtime.InteropServices.HandleRef]::new($null,$fpGraph.GetHdc())
    [Runtime.InteropServices.HandleRef]$dch3=[Runtime.InteropServices.HandleRef]::new($null,$calcGraph.GetHdc())
    Out-Null -Inp $DrawingSafe::BitBlt($dch3,0,0,$w,387,$fpdch,0,0,$DrawingSafe::SRCCOPY)
    $fpGraph.ReleaseHdc()
    $calcGraph.ReleaseHdc()

    #$calcBmp.GetPixel(480,280)|Out-Host
    for($y=0;$y -lt 387;$y++){
     for($x=0;$x -lt $w;$x++){
      if($calcBmp.GetPixel($x,$y) -ne $poolBackGround.GetPixel($x,$y)){$calcBmp.SetPixel($x,$y,[Drawing.Color]::Red)}}}
    #$calcBmp.GetPixel(480,280)|Out-Host

    #[Runtime.InteropServices.HandleRef]$dch3=[Runtime.InteropServices.HandleRef]::new($null,$calcGraph.GetHdc())
    #[Runtime.InteropServices.HandleRef]$formDch=[Runtime.InteropServices.HandleRef]::new($null,$formGraph.GetHdc())
    #Out-Null -Inp $DrawingSafe::BitBlt($formDch,0,0,$w,387,$dch3,0,0,$DrawingSafe::SRCCOPY)
    #$calcGraph.ReleaseHdc()
    #$formGraph.ReleaseHdc()
    $formGraph.DrawImage($calcBmp,0,0)
    Write-Host 'Ticked!'
    $isBusy=$false}})


   $form1.add_Click({
    Write-Host 'Clicking!'
    #[Runtime.InteropServices.HandleRef]$fpdch=[Runtime.InteropServices.HandleRef]::new($null,$fpGraph.GetHdc())
    #[Runtime.InteropServices.HandleRef]$dch3=[Runtime.InteropServices.HandleRef]::new($null,$calcGraph.GetHdc())
    #Out-Null -Inp $DrawingSafe::BitBlt($dch3,0,0,$w,$h,$fpdch,0,0,$DrawingSafe::SRCCOPY)
    #$fpGraph.ReleaseHdc()
    #$calcGraph.ReleaseHdc()
    $i=0
    while(Test-Path $env:TMP\Yo\test$i.png){$i++}
    $calcBmp.Save("$env:TMP\Yo\test$i.png")
    Write-Host 'Clicked!'})

   $form1.ShowDialog()


   $fTimer.Stop()

   $fpGraph.Dispose()
   $calcGraph.Dispose()
   $formGraph.Dispose()

   $form1.Close()
   $poolBackGround.Dispose()
   $calcBmp.Dispose()
   $form1.Dispose()

   $fTimer.Dispose()


   #Check end brack
   }
  else{'Size is zero.'}}
 else{'FlashPlayer not found.'}}

Pause
#Start-Sleep -Seconds 10


