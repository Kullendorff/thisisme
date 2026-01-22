# Johan Kullendorff - Portfolio

Minimalistisk, professionell "hire me"-sida med interaktiv LLM-funktionalitet.

## ✨ Features

- **LLM-ikoner**: Klicka för att kopiera en förskriven rekryterarprompt och öppna din valda AI-tjänst
- **Editorial design**: Dark theme med IBM Plex Mono och electric cyan accenter
- **Responsiv**: Mobile-first design som fungerar på alla enheter
- **Ren vanilla stack**: HTML, CSS, JS - inga dependencies
- **Production-ready**: Kan hostas statiskt överallt

## 🚀 Deploy till GitHub Pages

### 1. Push till GitHub
```bash
git add .
git commit -m "Initial portfolio site"
git push -u origin main
```

### 2. Aktivera GitHub Pages
1. Gå till repository settings på GitHub
2. Navigera till "Pages" i sidomenyn
3. Under "Source", välj `main` branch och `/root` folder
4. Klicka "Save"
5. Din sida blir tillgänglig på: `https://kullendorff.github.io/thisisme/`

## 🎨 Design Choices

**Aesthetic**: Editorial minimalism med tech-edge
- Inspirerat av tech journalism och modernistisk tidskriftsdesign
- Monospace display font för autenticitet
- Electric cyan accent för LLM-interaktivitet
- Subtila hover-effekter och animationer

**Differentiation**:
- LLM-ikoner som centerpiece med glow effects
- Inte generic AI-slop - varje val är intentionellt
- Känns som att en människa byggt den

## 📂 Struktur

```
/
├── index.html      # Main HTML structure
├── styles.css      # All styling with CSS custom properties
├── script.js       # LLM interaction logic
└── README.md       # This file
```

## 🔧 Anpassa

### Uppdatera innehåll
Redigera `index.html` för att ändra text, länkar, eller erfarenhet.

### Ändra färger
Redigera CSS-variabler i `styles.css`:
```css
:root {
    --color-accent: #00f0ff;  /* Electric cyan */
    --color-bg: #0a0a0a;      /* Almost black */
    /* ... */
}
```

### Justera prompt
Redigera `llmPrompt` i `script.js` för att ändra vad rekryterare får.

## 🌐 Alternative Hosting

**Netlify**:
1. Dra-och-släpp mappen på netlify.com
2. Klar!

**Vercel**:
```bash
npm i -g vercel
vercel
```

**Cloudflare Pages**:
1. Koppla GitHub repo
2. Deploy automatiskt vid varje push

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Alla moderna mobila browsers

## 📄 License

Fri att använda och modifiera!
