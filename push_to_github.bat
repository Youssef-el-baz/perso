@echo off
REM Script pour pousser le portfolio vers les deux dépôts GitHub (Windows)

cd /d "%~dp0"

REM Initialiser git si ce n'est pas déjà fait
if not exist ".git" (
    echo Initialisation du depot Git...
    git init
)

REM Configurer le remote origin (portfoliopub)
git remote | findstr /C:"origin" >nul
if errorlevel 1 (
    echo Ajout du remote origin (portfoliopub)...
    git remote add origin git@github.com:Youssef-el-baz/portfoliopub.git
) else (
    echo Mise a jour du remote origin (portfoliopub)...
    git remote set-url origin git@github.com:Youssef-el-baz/portfoliopub.git
)

REM Configurer le remote perso
git remote | findstr /C:"perso" >nul
if errorlevel 1 (
    echo Ajout du remote perso...
    git remote add perso git@github.com:Youssef-el-baz/perso.git
) else (
    echo Mise a jour du remote perso...
    git remote set-url perso git@github.com:Youssef-el-baz/perso.git
)

REM Ajouter tous les fichiers
echo Ajout des fichiers...
git add .

REM Commit les changements
echo Creation du commit...
git commit -m "Update portfolio with all skills and improvements"
if errorlevel 1 (
    echo Aucun changement a committer
)

REM S'assurer qu'on est sur la branche main
git branch -M main

REM Push vers le premier depot (portfoliopub)
echo.
echo === Push vers portfoliopub.git ===
git push -u origin main
if errorlevel 1 (
    echo Erreur lors du push vers portfoliopub
)

REM Push vers le second depot (perso)
echo.
echo === Push vers perso.git ===
git push -u perso main
if errorlevel 1 (
    echo Erreur lors du push vers perso
)

echo.
echo Termine! Les deux depots ont ete mis a jour.

pause

