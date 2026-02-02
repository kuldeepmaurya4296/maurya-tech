$mappings = @{
    "E:\maurya-tech-main\src\components" = "E:\maurya-tech-next\components"
    "E:\maurya-tech-main\src\hooks"      = "E:\maurya-tech-next\hooks"
    "E:\maurya-tech-main\src\lib"        = "E:\maurya-tech-next\lib"
    "E:\maurya-tech-main\src\data"       = "E:\maurya-tech-next\data"
    "E:\maurya-tech-main\src\contexts"   = "E:\maurya-tech-next\contexts"
}

foreach ($src in $mappings.Keys) {
    $dst = $mappings[$src]
    if (Test-Path $src) {
        Write-Host "Restoring $src to $dst"
        Get-ChildItem -Path $src -Recurse -File | ForEach-Object {
            $relPath = $_.FullName.Substring($src.Length + 1)
            $newRelPath = $relPath -replace '\.tsx$', '.jsx' -replace '\.ts$', '.js'
            $target = Join-Path $dst $newRelPath
            $parent = Split-Path $target -Parent
            if (!(Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force }
            Copy-Item $_.FullName $target -Force
        }
    }
}
