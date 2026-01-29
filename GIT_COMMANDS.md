# Commandes Git pour pousser vers les deux dépôts

## Commandes à exécuter dans le dossier portfolio

```bash
# 1. Initialiser git si nécessaire
git init

# 2. Configurer le remote origin (portfoliopub)
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:Youssef-el-baz/portfoliopub.git

# 3. Configurer le remote perso
git remote remove perso 2>/dev/null || true
git remote add perso git@github.com:Youssef-el-baz/perso.git

# 4. Ajouter tous les fichiers
git add .

# 5. Créer un commit
git commit -m "Update portfolio with all skills organized by categories"

# 6. S'assurer qu'on est sur la branche main
git branch -M main

# 7. Push vers portfoliopub.git
git push -u origin main

# 8. Push vers perso.git
git push -u perso main
```

## Ou utiliser le script automatique

**Sur Linux/WSL :**
```bash
cd portfolio
chmod +x push_to_github.sh
./push_to_github.sh
```

**Sur Windows :**
```cmd
cd portfolio
push_to_github.bat
```

## Vérifier les remotes configurés

```bash
git remote -v
```

Vous devriez voir :
- origin → git@github.com:Youssef-el-baz/portfoliopub.git
- perso → git@github.com:Youssef-el-baz/perso.git

