@echo off
echo ========================================
echo   AromaCart Dev Server Restart
echo ========================================
echo.

echo [1/3] Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Cleaning .next folder...
if exist .next (
    rmdir /s /q .next
    echo .next folder deleted
) else (
    echo .next folder not found
)
echo.

echo [3/3] Starting development server...
echo.
echo ========================================
echo   Server starting on http://localhost:3000
echo   Press Ctrl+C to stop
echo ========================================
echo.

npm run dev
