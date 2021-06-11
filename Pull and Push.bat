set /p massage=Enter the massage to GitHub: 
git pull
git add .
git commit -m "%massage%"
git push
echo done
TIMEOUT /T 7

 