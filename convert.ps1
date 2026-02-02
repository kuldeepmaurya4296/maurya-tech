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
        $content = Get-Content $_.FullName -Raw
        
        # 1. Fix "type" imports
        $content = $content -replace 'import type\s+{[^}]+}\s+from\s+[^;]+;\r?\n?', ''
        $content = $content -replace 'import\s+\{([^}]*)type\s+\w+([^}]*)\}\s+from', 'import {$1$2} from'
        
        # 2. Add "use client" if needed
        if ($content -match '(useState|useEffect|useContext|useRef|useMemo|useCallback|React\.forwardRef|Primitive|framer-motion|next/navigation|next/link|lucide-react|sonner|toast)') {
            if ($content -notmatch '(?i)^["'']use client["'']') {
                $content = "`"use client`";`r`n" + $content
            }
        }
        
        # 3. Remove React generics specifically (handles multiline and nested)
        $content = $content -replace '(?s)React\.forwardRef<.+?>(?=\s*\()', 'React.forwardRef'
        $content = $content -replace '(?s)React\.ElementRef<.+?>', ''
        $content = $content -replace '(?s)React\.ComponentPropsWithoutRef<.+?>', ''
        $content = $content -replace '(?s)React\.HTMLAttributes<.+?>', ''
        $content = $content -replace '(?<=\w)<[^>]+>(?=\s*[(\[])', ''
        
        # 4. Remove : Type annotations
        $content = $content -replace ':\s*[A-Z][\w\.]*(?:<[^>]+>)?(?:\[\])*(?=\s*(?:[=,){]|\r?\n))', ''
        $content = $content -replace ':\s*(?:string|number|boolean|any|object|unknown|never|void)(?=\s*(?:[=,){]|\r?\n))', ''
        
        # 5. Remove ? from parameters
        $content = $content -replace '(\w+)\?(?=\s*[:=),])', '$1'
        
        # 6. Remove 'as Type' or 'as const'
        $content = $content -replace '(?<=\w)\s+as\s+[A-Z][\w\.]*', ''
        $content = $content -replace '(?<=\w)\s+as\s+const', ''
        
        # 7. Remove interface/type declarations
        $content = $content -replace '(?m)^(?:export\s+)?(?:interface|type)\s+\w+[\s\S]+?\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}', ''
        $content = $content -replace '(?m)^(?:export\s+)?(?:interface|type)\s+\w+[\s\S]+?=[\s\S]+?;', ''
        
        # 8. Fix react-router-dom
        $content = $content -replace '(?i)''react-router-dom''', "'next/navigation'"
        $content = $content -replace '(?i)"react-router-dom"', '"next/navigation"'
        $content = $content -replace 'useLocation', 'usePathname'
        $content = $content -replace 'useNavigate', 'useRouter'
        
        Set-Content $_.FullName $content
    }
}
