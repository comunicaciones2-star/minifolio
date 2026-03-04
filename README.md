# Minifolio

Sitio portfolio estático publicado con GitHub Pages.

## Flujo simple para actualizar

En PowerShell, desde la carpeta del proyecto:

```powershell
Set-Location "c:\Users\Jhon Fragozo\Documents\FREELANCE 2026\04 Jhon Fragozo\Portafolio Freelance\buyer-file\minifolio"
```

## Inicio rápido (local)

Desde PowerShell, en la raíz del proyecto:

```powershell
./inicio-rapido.ps1
```

Opcional (otro puerto):

```powershell
./inicio-rapido.ps1 -Puerto 8080
```

También puedes usar doble clic con:

```bat
inicio-rapido.bat
```

O indicar puerto desde terminal:

```bat
inicio-rapido.bat 8080
```

- El script abre el navegador automáticamente.
- Usa Node (`npx http-server`) si está disponible.
- Si no hay Node, intenta con PHP.
- Si el puerto está ocupado, elige automáticamente el siguiente puerto libre.

1) Edita tus archivos (`index.html`, `about.html`, etc.)

2) Agrega cambios:

```powershell
git add .
```

3) Crea commit:

```powershell
git commit -m "feat: actualiza hero y servicios"
```

4) Sube al repositorio:

```powershell
git push
```

## Verificación rápida

```powershell
git status
```

- Si ves `nothing to commit, working tree clean`, quedó todo subido.
- GitHub Pages se actualiza en 1-3 minutos normalmente.

## Mensajes de commit sugeridos

- `feat: ...` para nuevas secciones o contenido
- `fix: ...` para correcciones
- `style: ...` para cambios visuales
- `docs: ...` para documentación

## URL del proyecto

- Repo: https://github.com/comunicaciones2-star/minifolio
- Sitio: https://comunicaciones2-star.github.io/minifolio/
