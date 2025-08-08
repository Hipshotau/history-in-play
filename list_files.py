import os

# Extensions/folders to ignore
IGNORED_EXTENSIONS = {'.js', '.js.map', '.d.ts', '.d.ts.map'}
IGNORED_DIRS = {'node_modules', '.next', '.git', '.turbo', '.vercel'}

def should_ignore(file_name, folder_path):
    ext = os.path.splitext(file_name)[1]
    if ext in IGNORED_EXTENSIONS:
        return True
    for ignore in IGNORED_DIRS:
        if ignore in folder_path.split(os.sep):
            return True
    return False

def list_files(startpath):
    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        level = root.replace(startpath, '').count(os.sep)
        indent = '    ' * level
        print(f'{indent}📁 {os.path.basename(root)}/')
        subindent = '    ' * (level + 1)
        for f in files:
            if not should_ignore(f, root):
                print(f'{subindent}📄 {f}')

if __name__ == '__main__':
    list_files('.')
