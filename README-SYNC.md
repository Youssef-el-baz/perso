# Synchronisation Automatique avec GitHub

Ce dépôt est configuré pour se synchroniser automatiquement avec GitHub.

## Utilisation

### Option 1 : Synchronisation automatique en continu

Pour activer la surveillance automatique des changements :

**Windows :**
```bash
.\sync-auto.bat
```

Ou directement avec PowerShell :
```powershell
.\sync-auto.ps1
```

Le script surveillera tous les changements dans le dossier et les synchronisera automatiquement avec GitHub après 5 secondes d'inactivité.

### Option 2 : Synchronisation manuelle

Si vous préférez synchroniser manuellement :

```bash
git add -A
git commit -m "Votre message de commit"
git push origin main
```

## Configuration

- **Délai de synchronisation** : 5 secondes (modifiable dans `sync-auto.ps1`)
- **Branche** : `main`
- **Message de commit automatique** : Inclut la date et l'heure

## Notes

- Les changements dans le dossier `.git` sont ignorés
- Le script attend 5 secondes après le dernier changement avant de synchroniser (pour éviter trop de commits)
- Appuyez sur `Ctrl+C` pour arrêter la surveillance automatique
