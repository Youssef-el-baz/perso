#!/bin/bash

# Script pour pousser le portfolio vers les deux dépôts GitHub

cd "$(dirname "$0")"

# Initialiser git si ce n'est pas déjà fait
if [ ! -d ".git" ]; then
    echo "Initialisation du dépôt Git..."
    git init
fi

# Configurer le remote origin (portfoliopub)
if ! git remote | grep -q "origin"; then
    echo "Ajout du remote origin (portfoliopub)..."
    git remote add origin git@github.com:Youssef-el-baz/portfoliopub.git
else
    echo "Mise à jour du remote origin (portfoliopub)..."
    git remote set-url origin git@github.com:Youssef-el-baz/portfoliopub.git
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
git commit -m "Update portfolio with all skills and improvements" || echo "Aucun changement à committer"

# S'assurer qu'on est sur la branche main
git branch -M main

# Push vers le premier dépôt (portfoliopub)
echo ""
echo "=== Push vers portfoliopub.git ==="
git push -u origin main || echo "Erreur lors du push vers portfoliopub"

# Push vers le second dépôt (perso)
echo ""
echo "=== Push vers perso.git ==="
git push -u perso main || echo "Erreur lors du push vers perso"

echo ""
echo "Terminé! Les deux dépôts ont été mis à jour."

