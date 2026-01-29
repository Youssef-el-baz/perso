@echo off
REM Script pour pousser vers perso.git uniquement (Windows)

cd /d "%~dp0"

REM Initialiser git si nécessaire
if not exist ".git" (
    echo Initialisation du depot Git...
    git init
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
git commit -m "Update portfolio: responsive design improvements for mobile and tablet"
if errorlevel 1 (
    echo Aucun changement a committer
)

REM S'assurer qu'on est sur la branche main
git branch -M main

REM Push vers perso.git
echo.
echo === Push vers perso.git ===
git push -u perso main

echo.
echo Termine! Le depot perso.git a ete mis a jour.

pause

