# Instructions pour pousser vers perso.git

## Option 1 : Utiliser le script (RECOMMANDÉ)

### Sur WSL/Linux :
```bash
cd portfolio
chmod +x push_perso.sh
./push_perso.sh
```

### Sur Windows PowerShell :
```powershell
cd portfolio
bash push_perso.sh
```

## Option 2 : Commandes manuelles

Exécutez ces commandes dans le dossier `portfolio` :

```bash
# 1. Aller dans le dossier portfolio
cd portfolio

# 2. Initialiser git si nécessaire
git init

# 3. Configurer le remote perso
git remote remove perso 2>/dev/null || true
git remote add perso git@github.com:Youssef-el-baz/perso.git

# 4. Ajouter tous les fichiers
git add .

# 5. Créer un commit
git commit -m "Update portfolio: responsive header and mobile improvements"

# 6. S'assurer qu'on est sur la branche main
git branch -M main

# 7. Push vers perso.git
git push -u perso main
```

## Si vous avez des erreurs

### Erreur "remote already exists" :
```bash
git remote set-url perso git@github.com:Youssef-el-baz/perso.git
```

### Erreur "nothing to commit" :
C'est normal si tous les fichiers sont déjà commités. Le push fonctionnera quand même.

### Erreur d'authentification SSH :
Assurez-vous que votre clé SSH est configurée avec GitHub :
```bash
ssh -T git@github.com
```

