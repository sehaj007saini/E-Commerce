# Move MySQL to E: Drive - Instructions

## ✅ What This Does:
- Moves MySQL from C: drive (2.28 GB) to E: drive
- Creates backup before moving (safety first!)
- Updates Windows service automatically
- Frees up ~2.28 GB on C: drive

---

## 📋 Steps to Follow:

### Step 1: Run the Move Script

1. **Right-click PowerShell** → Select **"Run as Administrator"**

2. **Navigate to project folder:**
   ```powershell
   cd F:\SummerProject
   ```

3. **Run the move script:**
   ```powershell
   .\move_mysql_to_e_drive.ps1
   ```

4. **Wait 5-10 minutes** while it:
   - Stops MySQL
   - Creates backup on E: drive
   - Copies MySQL to E:\MySQL
   - Updates configuration
   - Starts MySQL from new location

---

## ✅ If Everything Works:

You'll see:
```
SUCCESS! MySQL is now on E: drive!
MySQL Location: E:\MySQL
Backup Location: E:\MySQL_Backup_20260817_XXXXXX
```

### Then Clean Up C: Drive:

**Run in PowerShell (as Admin):**
```powershell
Remove-Item 'C:\Program Files\MySQL' -Recurse -Force
Remove-Item 'C:\ProgramData\MySQL' -Recurse -Force
```

**This frees up 2.28 GB!**

---

## ⚠️ If Something Goes Wrong:

Don't panic! Your backup is safe.

### Restore from Backup:

1. **Right-click PowerShell** → **"Run as Administrator"**

2. **Navigate to project:**
   ```powershell
   cd F:\SummerProject
   ```

3. **Run restore script:**
   ```powershell
   .\restore_mysql_from_backup.ps1
   ```

4. This will restore everything back to C: drive exactly as it was.

---

## 🧪 Test MySQL After Move:

### Option 1: Using Command Line
```powershell
# Check service status
Get-Service MySQL80

# Should show: Status = Running
```

### Option 2: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to localhost
3. If it connects, MySQL is working!

### Option 3: Check from Command Prompt
```cmd
mysql -u root -p
# Enter your password
# If you get mysql> prompt, it's working!
```

---

## 📁 File Locations After Move:

| What | Before | After |
|------|--------|-------|
| **Program Files** | C:\Program Files\MySQL | E:\MySQL |
| **Data Directory** | C:\ProgramData\MySQL | E:\MySQL\Data |
| **Service** | Points to C: | Points to E: |
| **Backup** | N/A | E:\MySQL_Backup_YYYYMMDD_HHMMSS |

---

## 💾 Disk Space Saved:

- **Before**: C: drive has 12.09 GB free
- **After move**: C: drive will have ~14.37 GB free (12.09 + 2.28)
- **Backup on E:**: Uses ~2.28 GB on E: drive (one-time)

---

## 🎯 Summary:

1. ✅ Run `move_mysql_to_e_drive.ps1` as Admin
2. ✅ Wait for "SUCCESS!" message
3. ✅ Test MySQL connection
4. ✅ Delete C:\Program Files\MySQL (frees 2.28 GB)
5. ✅ Keep backup on E: drive (just in case)

---

## ❓ FAQ:

**Q: Will this affect my databases?**  
A: No! All databases are copied and preserved.

**Q: Will my other apps that use MySQL work?**  
A: Yes! The service will work exactly the same.

**Q: Can I move it back to C: drive later?**  
A: Yes! Use the restore script anytime.

**Q: How long does this take?**  
A: 5-10 minutes total.

**Q: What if it fails?**  
A: Use the restore script. Your backup is safe on E:.

---

## 📞 Ready?

Just run this in PowerShell (as Admin):
```powershell
cd F:\SummerProject
.\move_mysql_to_e_drive.ps1
```

Good luck! 🚀
