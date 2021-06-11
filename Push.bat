set /p massage=Enter the massage to GitHub: 
git pull
git add .
git commit -m "%massage%"
git push
TIMEOUT /T 10
set /p massage=Press Enter to exit: 
 