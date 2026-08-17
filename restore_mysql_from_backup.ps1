# MySQL Restore from Backup Script
# Run this as Administrator if the move fails!

Write-Host "====================================" -ForegroundColor Red
Write-Host "MySQL RESTORE from Backup" -ForegroundColor Red
Write-Host "====================================" -ForegroundColor Red
Write-Host ""

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    pause
    exit
}

# Find the most recent backup
$backups = Get-ChildItem E:\ -Directory | Where-Object { $_.Name -like "MySQL_Backup_*" } | Sort-Object Name -Descending
if ($backups.Count -eq 0) {
    Write-Host "ERROR: No backup found on E: drive!" -ForegroundColor Red
    pause
    exit
}

$latestBackup = $backups[0].FullName
Write-Host "Found backup: $latestBackup" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Stopping MySQL Service..." -ForegroundColor Yellow
Stop-Service MySQL80 -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3
Write-Host "MySQL stopped" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Removing MySQL from E: drive..." -ForegroundColor Yellow
if (Test-Path "E:\MySQL") {
    Remove-Item "E:\MySQL" -Recurse -Force
    Write-Host "E:\MySQL removed" -ForegroundColor Green
}
Write-Host ""

Write-Host "Step 3: Restoring from backup to C: drive..." -ForegroundColor Yellow
Copy-Item "$latestBackup\MySQL" -Destination "C:\Program Files\" -Recurse -Force
Copy-Item "$latestBackup\ProgramData_MySQL\*" -Destination "C:\ProgramData\MySQL\" -Recurse -Force
Write-Host "Backup restored!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 4: Recreating service on C: drive..." -ForegroundColor Yellow
sc.exe delete MySQL80
$binPath = "`"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe`" --defaults-file=`"C:\Program Files\MySQL\MySQL Server 8.0\my.ini`" MySQL80"
sc.exe create MySQL80 binPath= $binPath start= auto DisplayName= "MySQL80"
Write-Host "Service recreated" -ForegroundColor Green
Write-Host ""

Write-Host "Step 5: Starting MySQL..." -ForegroundColor Yellow
Start-Service MySQL80
Start-Sleep -Seconds 5
$status = (Get-Service MySQL80).Status
Write-Host "MySQL Status: $status" -ForegroundColor Green
Write-Host ""

if ($status -eq "Running") {
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "MySQL RESTORED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "MySQL is back on C: drive and working." -ForegroundColor Cyan
} else {
    Write-Host "====================================" -ForegroundColor Red
    Write-Host "MySQL did not start. Check Event Viewer for errors." -ForegroundColor Red
    Write-Host "====================================" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
pause
