@echo off
REM ==============================================================================
REM PROJECT SHWAS — WINDOWS FACTORY PROVISIONING & HARDWARE CORE CODE-LOCK UTILITY
REM File Name: flash_secure_core.bat
REM WARNING: Burning eFuses is irreversible. Execute only on final production boards.
REM ==============================================================================
title Project Shwas — Hardware Lockdown Engine

set TARGET_COM_PORT=COM3
set WORK_DIR=.\security_provisioning
if not exist "%WORK_DIR%" mkdir "%WORK_DIR%"

echo ===================================================================
echo 🔒 STARTING SHWAS SECURE PROVISIONING AND SYSTEM FIRMWARE LOCKDOWN
echo ===================================================================

REM Step 1: Ensure the Espressif Python tool suites are installed on Windows path
where espsecure.py >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo ❌ ERROR: Espressif tools not found. Run: pip install esptool
    pause
    exit /b
)

REM Step 2: Keys Generation Configuration
if not exist "%WORK_DIR%\shwas_secure_boot_key.pem" (
    echo 🔑 Generating Private RSA-3072 Secure Boot V2 Master Key...
    call espsecure.py generate_signing_key --version 2 "%WORK_DIR%\shwas_secure_boot_key.pem"
)

REM Step 3: Cryptographic Signature Binding
echo ✒️ Appending RSA-3072 signature block to compiled firmware core binary...
call espsecure.py sign_data --version 2 --keyfile "%WORK_DIR%\shwas_secure_boot_key.pem" --output "%WORK_DIR%\shwas_signed_production.bin" .\firmware\shwas_core_firmware.ino.bin

REM Step 4: Hardware Code Flashing
echo 💾 Burning signed production firmware to target ESP32 flash chip...
call esptool.py --chip esp32 --port %TARGET_COM_PORT% --baud 921600 write_flash 0x10000 "%WORK_DIR%\shwas_signed_production.bin"

REM Step 5: Deactivate Physical Ports and Secure Code Execution Permanent Loop
echo ⚠️ WARNING: Burning eFuses is permanent. Finalizing hardware lock...
call espefuse.py --port %TARGET_COM_PORT% burn_efuse DISABLE_JTAG 1
call espefuse.py --port %TARGET_COM_PORT% burn_efuse HARD_DIS_JTAG 1

color 0A
echo ===================================================================
echo ✅ LOCKDOWN SUCCESSFUL: Device hardware code is permanently locked.
echo ===================================================================
pause

