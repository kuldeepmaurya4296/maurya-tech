$folders = @(
    "E:\maurya-tech-next\components",
    "E:\maurya-tech-next\lib",
    "E:\maurya-tech-next\data",
    "E:\maurya-tech-next\hooks",
    "E:\maurya-tech-next\contexts"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) { continue }
    
    Get-ChildItem -Path $folder -Recurse -Include *.jsx, *.js | ForEach-Object {
        $path = $_.FullName
        $content = Get-Content $path -Raw
        
        # Remove multiline generics in forwardRef (greedy)
        $content = $content -replace '(?s)React\.forwardRef\s*<.*>(?=\s*\()', 'React.forwardRef'
        
        # Remove other generics
        $content = $content -replace '(?s)React\.ElementRef<.*?>', ''
        $content = $content -replace '(?s)React\.ComponentPropsWithoutRef<.*?>', ''
        $content = $content -replace '(?s)React\.HTMLAttributes<.*?>', ''
        
        # Cleanup leftover brackets and commas (very common in Shadcn)
        $content = $content -replace 'React\.forwardRef\s*>', 'React.forwardRef'
        $content = $content -replace 'React\.forwardRef\s*,', 'React.forwardRef'
        $content = $content -replace ',\s*>', ''
        
        # Remove : Type annotations (multiline)
        $content = $content -replace ':\s*[A-Z][\w\.]*(?:<.*?>)?(?:\[\])*(?=\s*(?:\r?\n|[=,){]))', ''
        $content = $content -replace ':\s*(?:string|number|boolean|any|object|unknown|never|void)(?=\s*(?:\r?\n|[=,){]))', ''

        Set-Content $path $content
    }
}
