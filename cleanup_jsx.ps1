Get-ChildItem -Path E:\maurya-tech-next\components -Recurse -Include *.jsx, *.js | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $c = $c -replace '(?s)React\.forwardRef\s*<.*?>\s*(?=\()', 'React.forwardRef'
    $c = $c -replace '(?s)React\.ElementRef<.*?>', ''
    $c = $c -replace '(?s)React\.ComponentPropsWithoutRef<.*?>', ''
    $c = $c -replace '(?s)React\.HTMLAttributes<.*?>', ''
    $c = $c -replace ',\s*>', '>' # cleanup leftover commas
    $c = $c -replace '>\s*>', '>'
    Set-Content $_.FullName $c
}
