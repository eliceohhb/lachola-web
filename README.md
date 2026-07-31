# La Chola · Pastelería Artesanal

Landing page estática (single page) para **La Chola**, pastelería artesanal especializada en
**Charlottes** (torta con bizcochos de vainilla alrededor y mousse/fruta en el centro), con
pedidos 100% online vía WhatsApp.

Sitio romántico, cálido y artesanal: paleta crema + rosa vino/burdeos, tipografía script
para acentos, acuarelas difuminadas de fondo y bordes redondeados.

---

## 🚀 Cómo verlo localmente

No requiere build ni dependencias. Abrí directamente el archivo:

```bash
xdg-open index.html        # Linux
# open index.html          # macOS
# start index.html         # Windows
```

O servido con un servidor estático (recomendado para que las rutas y fuentes funcen igual que en prod):

```bash
python3 -m http.server 8000
# luego abrí http://localhost:8000
```

---

## 📁 Estructura

```
la-chola/
├── index.html              # Estructura semántica (8 secciones)
├── css/
│   └── estilos.css         # Paleta, tipografías, acuarelas, responsive
├── js/
│   └── main.js             # Carrusel, menú móvil, nav activa por scroll
├── assets/
│   └── images/             # 6 SVG placeholders (reemplazables por fotos)
├── .gitignore
└── README.md
```

---

## ✏️ Cómo personalizar (datos reales)

Antes de publicar reemplazá los datos de ejemplo. Para sustituir el WhatsApp de golpe:

```bash
sed -i 's/56912345678/569XXXXXXXX/g' index.html
```

| Concepto            | Dato de ejemplo                            | Archivo            |
|---------------------|--------------------------------------------|--------------------|
| WhatsApp pedidos    | `+56 9 1234 5678` (6 apariciones)         | `index.html`       |
| Email               | `hola@lachola.cl`                          | `index.html`       |
| Ciudad              | `Osorno, Chile`                            | `index.html`       |
| Horario             | `Lun - Sáb: 10:00 - 19:00`                 | `index.html`       |
| Instagram/Facebook  | `href="#"`                                 | `index.html`       |
| Precios             | `$22.000` (4 cards)                        | `index.html`       |
| Año copyright       | auto-actualizado por JS                    | `js/main.js`       |

### Reemplazar imágenes placeholder

Los SVG en `assets/images/` son dibujos decorativos. Para usar fotos reales:
1. Colocá las fotos (idealmente 1200×1500px, relación 4:5) en `assets/images/`
2. Renombralas con los mismos nombres (`charlotte-frutilla.svg` → `.jpg`) o editá los `src` en `index.html`
3. Las relaciones de aspecto están definidas en `css/estilos.css` (`aspect-ratio: 3/4`, `4/5`, `1/1`) y se ajustan solas

---

## 🌐 Deploy

El sitio es 100% estático: cualquier host de archivos estáticos sirve. Elegí una opción:

| Plataforma         | Build | Costo                 | Notas                              |
|--------------------|:-----:|-----------------------|------------------------------------|
| Cloudflare Pages   | No    | Gratis                | Conectar repo GitHub → deploy auto |
| Netlify Drop       | No    | Gratis                | Arrastrar carpeta, sin repo        |
| GitHub Pages       | No    | Gratis                | Rama `gh-pages`                    |
| Vercel             | No    | Gratis                | Import repo, preset "Other"        |

### Cloudflare Pages (recomendada)
1. Subí el repo a GitHub
2. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
3. Framework preset: **None** · Build command: *(vacío)* · Output: `/`
4. Save and Deploy → URL `la-chola.pages.dev`

### Netlify Drop (sin repo, 30 segundos)
- https://app.netlify.com/drop → arrastrá esta carpeta → listo

---

## 🎨 Diseño

- **Paleta** (`css/estilos.css` · `:root`): rosa vino `#B5285A`, crema `#FDF6ED`, dorado `#D4A83B`
- **Tipografías** (Google Fonts): `Great Vibes` (script acentos), `Playfair Display` (títulos), `Poppins` (cuerpo)
- **Responsive**: desktop 4 columnas → tablet 2 → mobile 1 (con menú hamburguesa)
- **Acuarelas**: blobs `blur()` en esquinas de secciones (`hero`, creaciones, banner CTA)

---

## 🧭 Secciones

`#inicio` header fijo · `#hero` grid 2.col + 4 imágenes · `#charlottes` catálogo 4 cards ·
`#historia` foto + texto · banner CTA · `#testimonios` carrusel · `#galeria` 4 imágenes · `#footer` 4 columnas

---

## 📝 Licencia

Uso interno de La Chola. Los placeholders SVG de tortas fueron generados para este proyecto.
