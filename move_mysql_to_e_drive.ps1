# MySQL Move to E: Drive Script
# Run this as Administrator!

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "MySQL Move to E: Drive - SAFE MODE" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "Step 1: Stopping MySQL Service..." -ForegroundColor Yellow
Stop-Service MySQL80 -Force
Start-Sleep -Seconds 3
$status = (Get-Service MySQL80).Status
Write-Host "MySQL Status: $status" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Creating Backup..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupPath = "E:\MySQL_Backup_$timestamp"

Write-Host "Backing up to: $backupPath" -ForegroundColor Cyan
Copy-Item "C:\Program Files\MySQL" -Destination $backupPath -Recurse -Force
Copy-Item "C:\ProgramData\MySQL" -Destination "$backupPath\ProgramData_MySQL" -Recurse -Force

Write-Host "Backup completed successfully!" -ForegroundColor Green
Write-Host "Backup size: " -NoNewline
$backupSize = [math]::Round((Get-ChildItem $backupPath -Recurse | Measure-Object -Property Length -Sum).Sum / 1GB, 2)
Write-Host "$backupSize GB" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 3: Copying MySQL to E:\MySQL..." -ForegroundColor Yellow
$destPath = "E:\MySQL"
if (Test-Path $destPath) {
    Write-Host "WARNING: E:\MySQL already exists. Removing..." -ForegroundColor Yellow
    Remove-Item $destPath -Recurse -Force
}

Copy-Item "C:\Program Files\MySQL" -Destination $destPath -Recurse -Force
Write-Host "Program files copied!" -ForegroundColor Green

# Copy data directory
Copy-Item "C:\ProgramData\MySQL" -Destination "E:\MySQL\Data" -Recurse -Force
Write-Host "Data directory copied!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 4: Updating MySQL Configuration..." -ForegroundColor Yellow
$iniPath = "E:\MySQL\MySQL Server 8.0\my.ini"

if (Test-Path $iniPath) {
    # Update datadir in my.ini
    $iniContent = Get-Content $iniPath
    $iniContent = $iniContent -replace 'C:\\ProgramData\\MySQL', 'E:\\MySQL\\Data'
    $iniContent = $iniContent -replace 'C:\\Program Files\\MySQL', 'E:\\MySQL'
    $iniContent | Set-Content $iniPath
    Write-Host "my.ini updated!" -ForegroundColor Green
} else {
    Write-Host "WARNING: my.ini not found at expected location" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "Step 5: Updating Windows Service..." -ForegroundColor Yellow
# Remove old service
sc.exe delete MySQL80

# Create new service pointing to E: drive
$binPath = "`"E:\MySQL\MySQL Server 8.0\bin\mysqld.exe`" --defaults-file=`"E:\MySQL\MySQL Server 8.0\my.ini`" MySQL80"
sc.exe create MySQL80 binPath= $binPath start= auto DisplayName= "MySQL80"

Write-Host "Service updated!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 6: Starting MySQL from E: drive..." -ForegroundColor Yellow
Start-Service MySQL80
Start-Sleep -Seconds 5
$newStatus = (Get-Service MySQL80).Status
Write-Host "MySQL Status: $newStatus" -ForegroundColor Green
Write-Host ""

if ($newStatus -eq "Running") {
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "SUCCESS! MySQL is now on E: drive!" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "MySQL Location: E:\MySQL" -ForegroundColor Cyan
    Write-Host "Backup Location: $backupPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Test MySQL connection" -ForegroundColor White
    Write-Host "2. If everything works, you can delete C:\Program Files\MySQL" -ForegroundColor White
    Write-Host "3. Keep the backup on E: drive for safety" -ForegroundColor White
    Write-Host ""
    Write-Host "To free up C: drive space, run:" -ForegroundColor Yellow
    Write-Host "Remove-Item 'C:\Program Files\MySQL' -Recurse -Force" -ForegroundColor Cyan
    Write-Host "Remove-Item 'C:\ProgramData\MySQL' -Recurse -Force" -ForegroundColor Cyan
} else {
    Write-Host "====================================" -ForegroundColor Red
    Write-Host "WARNING: MySQL did not start!" -ForegroundColor Red
    Write-Host "====================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Your backup is safe at: $backupPath" -ForegroundColor Cyan
    Write-Host "We can restore from backup if needed." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
pause
