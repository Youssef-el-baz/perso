# Script de synchronisation automatique avec GitHub
# Ce script surveille les changements dans le dossier et les pousse automatiquement vers GitHub

$ErrorActionPreference = "Stop"

# Configuration
$repoPath = $PSScriptRoot
$branch = "main"
$commitMessage = "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$debounceSeconds = 5  # Attendre 5 secondes après le dernier changement avant de committer

# Fonction pour synchroniser avec GitHub
function Sync-ToGitHub {
    param([string]$Message)
    
    Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] Synchronisation en cours..." -ForegroundColor Yellow
    
    try {
        # Se déplacer dans le dossier du dépôt
        Set-Location $repoPath
        
        # Vérifier s'il y a des changements
        $status = git status --porcelain
        if ([string]::IsNullOrWhiteSpace($status)) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Aucun changement détecté." -ForegroundColor Gray
            return
        }
        
        # Ajouter tous les changements
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Ajout des fichiers modifiés..." -ForegroundColor Cyan
        git add -A
        
        # Committer
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Création du commit..." -ForegroundColor Cyan
        git commit -m $Message
        
        # Pousser vers GitHub
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Envoi vers GitHub..." -ForegroundColor Cyan
        git push origin $branch
        
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✓ Synchronisation réussie!" -ForegroundColor Green
        
    } catch {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✗ Erreur lors de la synchronisation: $_" -ForegroundColor Red
    }
}

# Timer pour le debounce
$syncTimer = $null

# Fonction appelée lors des changements de fichiers
function On-FileChanged {
    param($SourceEventArgs)
    
    # Ignorer les changements dans .git
    if ($SourceEventArgs.FullPath -like "*\.git\*") {
        return
    }
    
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Changement détecté: $($SourceEventArgs.Name)" -ForegroundColor Gray
    
    # Annuler le timer précédent s'il existe
    if ($syncTimer) {
        $syncTimer.Stop()
        $syncTimer.Dispose()
    }
    
    # Créer un nouveau timer pour le debounce
    $syncTimer = New-Object System.Timers.Timer
    $syncTimer.Interval = $debounceSeconds * 1000
    $syncTimer.AutoReset = $false
    $syncTimer.Add_Elapsed({
        Sync-ToGitHub -Message $commitMessage
    })
    $syncTimer.Start()
}

# Créer le FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $repoPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Surveiller les changements
Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action { On-FileChanged $EventArgs } | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action { On-FileChanged $EventArgs } | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Deleted" -Action { On-FileChanged $EventArgs } | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Renamed" -Action { On-FileChanged $EventArgs } | Out-Null

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Synchronisation automatique activée" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Dossier surveillé: $repoPath" -ForegroundColor White
Write-Host "Branche: $branch" -ForegroundColor White
Write-Host "Délai avant synchronisation: $debounceSeconds secondes" -ForegroundColor White
Write-Host "`nAppuyez sur Ctrl+C pour arrêter la surveillance..." -ForegroundColor Yellow
Write-Host ""

# Garder le script en cours d'exécution
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    # Nettoyage
    if ($syncTimer) {
        $syncTimer.Stop()
        $syncTimer.Dispose()
    }
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Write-Host "`nSynchronisation automatique arrêtée." -ForegroundColor Yellow
}
