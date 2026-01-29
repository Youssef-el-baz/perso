#!/bin/bash

# Script pour pousser vers perso.git uniquement

cd "$(dirname "$0")"

# Initialiser git si nécessaire
if [ ! -d ".git" ]; then
    echo "Initialisation du dépôt Git..."
    git init
fi

# Configurer le remote perso
if ! git remote | grep -q "perso"; then
    echo "Ajout du remote perso..."
    git remote add perso git@github.com:Youssef-el-baz/perso.git
else
    echo "Mise à jour du remote perso..."
    git remote set-url perso git@github.com:Youssef-el-baz/perso.git
fi

# Ajouter tous les fichiers
echo "Ajout des fichiers..."
git add .

# Commit les changements
echo "Création du commit..."
git commit -m "Update portfolio: responsive design improvements for mobile and tablet" || echo "Aucun changement à committer"

# S'assurer qu'on est sur la branche main
git branch -M main

# Push vers perso.git
echo ""
echo "=== Push vers perso.git ==="
git push -u perso main

echo ""
echo "Terminé! Le dépôt perso.git a été mis à jour."

