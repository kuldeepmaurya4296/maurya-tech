import os
import re

def clean_content(content):
    # Add 'use client'; if client-side features are used
    client_keywords = [
        'useState', 'useEffect', 'useContext', 'useRef', 'useMemo', 'useCallback', 
        'React.forwardRef', 'Primitive', 'framer-motion', 'next/navigation', 
        'next/link', 'lucide-react', 'sonner', 'Toaster', 'DialogPrimitive',
        'TooltipPrimitive', 'PopoverPrimitive', 'TabsPrimitive', 'SelectPrimitive'
    ]
    if any(k in content for k in client_keywords):
        if '"use client"' not in content and "'use client'" not in content:
            content = '"use client";\n' + content

    # Remove TypeScript imports and type-only imports
    content = re.sub(r'import\s+type\s+{[^}]+}\s+from\s+[^;]+;\r?\n?', '', content)
    content = re.sub(r'import\s+{[^}]*type\s+\w+[^}]*}\s+from\s+[^;]+;', lambda m: m.group(0).replace('type ', ''), content)

    # Remove generic type arguments from common React/Shadcn patterns
    # Handles nested generics by matching greedily until the opening paren of the component
    content = re.sub(r'React\.forwardRef<[\s\S]+?>(?=\s*\()', 'React.forwardRef', content)
    content = re.sub(r'React\.ElementRef<[\s\S]+?>', '', content)
    content = re.sub(r'React\.ComponentPropsWithoutRef<[\s\S]+?>', '', content)
    content = re.sub(r'React\.HTMLAttributes<[\s\S]+?>', '', content)
    content = re.sub(r':\s*React\.FC(?:<[^>]*>)?', '', content)
    
    # Remove interface and type definitions
    content = re.sub(r'(?m)^(?:export\s+)?(?:interface|type)\s+\w+\s*(?:=|\{)[\s\S]*?(?:;|\})\r?\n', '', content)
    
    # Remove remaining type annotations: variable: Type, function(arg: Type)
    # Target simple cases to avoid breaking object literals
    content = re.sub(r':\s*(?:string|number|boolean|any|object|unknown|never|void|React\.\w+|[A-Z]\w*(?:\[\])?)(?=\s*[=,)])', '', content)
    
    # Remove 'as Type' assertions
    content = re.sub(r'\s+as\s+[A-Z]\w*', '', content)
    
    # Fix React-Router-Dom to Next.js
    if 'react-router-dom' in content:
        content = content.replace("'react-router-dom'", "'next/navigation'")
        content = content.replace('"react-router-dom"', '"next/navigation"')
        content = content.replace('useLocation', 'usePathname')
        content = content.replace('useNavigate', 'useRouter')
        content = content.replace('location.pathname', 'pathname')
        
        # Link needs special care as it's from next/link
        if 'Link' in content:
            # Replace the import source and the named import if it's the only one
            content = re.sub(r'import\s+{[^}]*Link[^}]*}\s+from\s+["\']next/navigation["\']', 
                             'import Link from "next/link"; import { usePathname, useRouter } from "next/navigation"', content)
    
    return content

tasks = [
    (r"E:\maurya-tech-main\src\components", r"E:\maurya-tech-next\components"),
    (r"E:\maurya-tech-main\src\lib", r"E:\maurya-tech-next\lib"),
]

for src, dst in tasks:
    if not os.path.exists(src):
        print(f"Source {src} does not exist. Skipping.")
        continue
    for root, dirs, files in os.walk(src):
        for f in files:
            if f.endswith(('.tsx', '.ts')):
                rel = os.path.relpath(os.path.join(root, f), src)
                target = os.path.join(dst, os.path.splitext(rel)[0] + ('.jsx' if f.endswith('.tsx') else '.js'))
                os.makedirs(os.path.dirname(target), exist_ok=True)
                with open(os.path.join(root, f), 'r', encoding='utf-8') as file:
                    content = file.read()
                processed = clean_content(content)
                with open(target, 'w', encoding='utf-8') as file:
                    file.write(processed)

print("Restoration and conversion complete.")
