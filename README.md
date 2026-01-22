# Johan Kullendorff - Portfolio

Minimalistisk, professionell "hire me"-sida med interaktiv LLM-funktionalitet.

## ✨ Features

- **LLM-ikoner med modal preview**: Klicka för att se prompten innan den skickas till AI-tjänsten
- **Auto-fill för Perplexity**: Prompt fylls i automatiskt (andra tjänster: clipboard-kopiering)
- **5 designvarianter**: Välj mellan Brutalist, Luxury, Neo-Brutalism, Glassmorphism, Retro-Futuristic
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

## 🤖 Auto-Fill Functionality

**How it works:**

När någon klickar på en LLM-ikon:
1. **Modal visas** med preview av prompten
2. **Prompten kopieras** automatiskt till clipboard
3. **Välj handling**:
   - "Copy Only" - stäng modal, prompten är redan kopierad
   - "Open [AI]" - öppna AI-tjänsten i ny flik

**Auto-fill support:**
- ✅ **Perplexity**: Full auto-fill via URL-parameter - prompten fylls i automatiskt
- 📋 **Övriga tjänster** (ChatGPT, Claude, Gemini, Mistral): Clipboard-kopiering (de stödjer inte URL-parametrar av säkerhetsskäl)

**Teknisk detalj:**
- Använder `prompt-modal.js` för modal och smart routing
- Perplexity får `?q=` parameter med encoded prompt
- Andra tjänster öppnas direkt, prompt finns i clipboard
- Fallback för äldre browsers som inte stödjer Clipboard API

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
