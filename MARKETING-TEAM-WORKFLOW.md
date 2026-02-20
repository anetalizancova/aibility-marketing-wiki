# Aibility Marketing Team — Workflow & Stack

> **Účel dokumentu:** Systémový popis toho, jak marketing funguje — co kdo dělá, jakými nástroji, v jakém pořadí a jak často. Slouží jako onboarding materiál, základ pro audit systému a podklad pro škálování v malém týmu.

**Poslední aktualizace:** únor 2026  
**Tým:** Aneta `[A]`, Jakub `[J]`  
**Označení:** `[A]` = Aneta, `[J]` = Jakub, `[A+J]` = oba

---

## 1. Tým & Odpovědnosti

| Oblast | Vlastník | Popis |
|---|---|---|
| Newsletter | `[A]` | Týdenní email celé Aibility audience |
| Webinář follow-up emaily | `[A]` | Follow-up po každém webináři (do 24h) |
| B2B & launch emaily | `[A]` | Kampañové emaily, sekvence |
| Social media (texty) | `[A]` | Posty na LI, IG, FB, X, Threads |
| Social media (vizuály) | `[A]` | Generování grafik (Gemini, Trybloom, Banner Ad Tool, Social Visual Editor) |
| Circle.so community | `[A]` | Posty do Edu space + obecných prostorů |
| Strategie & positioning | `[A]` | Komunikační linka, messaging angles |
| Meta Ads | `[J]` (větší `[A+J]`) | Tvorba a správa Meta kampaní (FB + IG) |
| Google Ads | `[J]` | DSA + RSA kampaně |
| LinkedIn Ads | `[A+J]` | Placené kampaně na LinkedIn |
| Analytics & Tracking | `[J]` | GTM, GA4, PostHog, pixely, consent |
| Webinář a akce — vizuály | `[J]` (větší akce `[A+J]`) | Promo grafiky pro webináře; na větší akce se zapojuje i Aneta |
| Webinář landing pages | `[A]` | Agent auto-generuje texty, Cursor upravuje obsah přes Airtable API; nasazení na web přes Framer MCP (zatím poloautomaticky — manuální deploy) |
| Videa & video reklamy | `[A]` | Zatím manuálně; plánovaná automatizace přes HeyGen API z Cursoru |
| Konverzní měření | `[J]` | Definice a nasazení konverzních eventů |

---

## 2. Tool Stack

### Email & CRM
| Tool | K čemu | Kdo |
|---|---|---|
| **Brevo** | Email marketing — tvorba, odesílání, segmentace, sekvence | `[A]` |
| **Brevo API + Python script** | Automatický upload HTML emailů jako draft, test email | `[A]` |

### Social media
| Tool | K čemu | Kdo |
|---|---|---|
| **Upload Post API** | Posting a scheduling na LI, IG, FB, X, Threads, TikTok, Pinterest — přes Cursor command `/upload-social` | `[A]` |
| **Social Visual Editor** | Generování sociálních grafik z SVG šablon (Node.js + Puppeteer) | `[A]` |

### Vizuály
| Tool | K čemu | Kdo |
|---|---|---|
| **Gemini Image Gen** (`PACT/4_Tools/gemini-image-gen/`) | Generování obrázků přes OpenRouter + Gemini 3, command `/generate-image` | `[A]` |
| **Gemini** (standalone) | Rychlé generování vizuálů bez Cursoru | `[A]` |
| **Trybloom.ai** | Tvorba vizuálů a grafik | `[A]` |
| **Figma** | Editace a finální úpravy vizuálů, finalizace ad kreativy | `[A+J]` |
| **Banner Ad Tool** (`PACT/4_Tools/banner-ad-tool/`) | Webová aplikace od Verči — 8 šablon (story + square), inline editor, AI generování obrázků, export PNG, batch tvorba kampaní přes agenta v Cursoru | `[A+J]` |
| **Video Ad Maker** (`PACT/4_Tools/video-ad-maker/`) | Animovaná reklamní videa od Verči z HTML šablon (Remotion + React), úpravy přes Cursor | `[A+J]` |
| **HeyGen API** *(planned)* | Generování video reklam s AI prezentátorem přímo z Cursoru | `[A]` |
| **Ad JSON → rebrand** | Stažení popisu existující reklamy jako JSON, přetvoření pro Aibility brand | `[A+J]` |

### Web & Landing Pages
| Tool | K čemu | Kdo |
|---|---|---|
| **Framer MCP** | Nasazení landing pages na web z Cursoru | `[A]` |
| **Airtable + Cursor** | Správa a úprava obsahu webinářových stránek přes Airtable API napojené na Cursor | `[A]` |

### Community
| Tool | K čemu | Kdo |
|---|---|---|
| **Circle.so** | Komunita — Edu stream space + obecné prostory | `[A]` |
| **Circle API + Cursor command** | Publikování příspěvků na Circle přes `/circleedu` nebo `/circlepost` přímo z Cursoru | `[A]` |

### Paid Ads
| Tool | K čemu | Kdo |
|---|---|---|
| **Meta Ads Manager** | Správa Facebook/Instagram kampaní | `[J]` (`[A]` na větší) |
| **Google Ads** | Search (RSA) + dynamické reklamy (DSA) | `[J]` |
| **Google Sheets** | Page feed pro DSA kampaně (webináře, produkty) | `[J]` |
| **MetaAutomator MCP** | Automatizované zakládání Meta kampaní přes Cursor | `[J]` |
| **Google Whisk** | Generování vizuálů pro Meta reklamy (u Jakuba) | `[J]` |
| **Banner Ad Tool** | Brandované reklamní kreativy ze šablon (viz sekce Vizuály) | `[A+J]` |

### Analytics & Tracking
| Tool | K čemu | Kdo |
|---|---|---|
| **Google Tag Manager (GTM)** | Správa tagů, triggerů, consent managementu | `[J]` |
| **Google Analytics 4 (GA4)** | Webová analytika, konverze, audience | `[J]` |
| **PostHog** | Product analytics, user behavior tracking | `[J]` |
| **Meta Pixel + CAPI** | Tracking konverzí pro Meta kampaně | `[J]` |
| **Google Ads Conversion** | Tracking konverzí pro Google kampaně | `[J]` |
| **LinkedIn Insight Tag** | B2B audience tracking a konverze | `[J]` |
|| **Campaign Overview Dashboard** | Přehled aktivních kampaní (Meta, LinkedIn, Google) — spend, kliky, imprese, CTR. Data se načítají automaticky. *(work in progress)* [→ link](https://campaign-overview-rust.vercel.app/) | `[A+J]` |
|| **Data Dashboard** | Rozšířený analytický dashboard s přihlášením. *(work in progress)* [→ link](https://dashboard-eta-eight-17.vercel.app/) | `[A+J]` |

### AI & Automatizace
| Tool | K čemu | Kdo |
|---|---|---|
| **Cursor + Claude** | AI asistent pro tvorbu obsahu, Cursor commands, agenti | `[A+J]` |
| **Cursor skills** (`PACT/.cursor/rules/`) | Specializované AI dovednosti (copy, positioning, newsletter, email sekvence, atd.) | `[A]` |
| **Brevo Python script** | Upload HTML emailů do Brevo přes API bez ručního kopírování | `[A]` |
| **Markdown Share** (`PACT/4_Tools/markdown-share/`) | Sdílení `.md` souborů jako veřejných odkazů (pro sdílení copy s týmem nebo klienty) | `[A+J]` |

### Tracking & UTM
| Tool | K čemu | Kdo |
|---|---|---|
| **Campaign Naming Convention** | Konzistentní pojmenování kampaní `AIB_PRODUCT_SOURCE_TYPE_PHASE_LANG_SUFFIX` | `[A+J]` |
| **UTM Helper** | Generování UTM parametrů k linkům | `[A]` |

---

## 3. Workflow: Webináře

**Kadence:** cca každý týden – 2 týdny  
**Vlastník follow-upu:** `[A]`  
**Vlastník vizuálů a trackingu:** `[J]`

### 3a. Příprava webináře (před akcí)

**`[A]`**
1. Připravit promo obsah — texty na social (`LI`, `IG`, `FB`, `X`)
2. Vytvořit promo emaily do Brevo (pokud je potřeba)
3. Nastavit UTM parametry pro registrační link

**`[J]`**
1. Připravit základní promo vizuály (grafiky pro sociály + event cover)
2. Spustit/zkontrolovat Meta Ads na webinář — trigger je **Slack reminder** z automatizace `[A]`  
   (`PACT/4_Tools/automation/slack-reminders/` — připomínka 10 a 14 dní před akcí)
3. Ověřit, že event tracking (registration, attendance) funguje

### 3b. Follow-up po webináři (do 24 hodin)

**`[A]`** 

1. **Transcript** — Přidat přepis webináře jako `.md` soubor do `content/emails/Webinars/`  
   Pojmenování: `[Název webináře] - [DD.MM.YYYY] transcript.md`

2. **Vygenerovat follow-up email** — spustit Cursor command `fupwebinar`  
   Input: cesta k transcript souboru  
   Output: automaticky se vytvoří:
   - `[Název] - [datum] follow up text.md` — textový draft
   - `[Název] - [datum] follow up.html` — HTML email

3. **Doplnit chybějící linky** do `.md` a `.html` souboru:
   - YouTube link (záznam)
   - SoundCloud link (podcast verze)
   - Google Drive link (materiály)
   - Feedback form link

4. **Přidat UTM parametry** ke všem linkům v emailu  
   Konvence: `AIB_WBN_BRO_5_RET_CZE_[NazevWebinare]`  
   Použít script v `content/emails/UTM_HELPER.md`

5. **Upload do Brevo** — spustit Cursor command `brevo`  
   - Vezme HTML soubor, vytvoří kampaň jako draft
   - Pošle test email na `aneta.lizancova@aibility.cz`
   - Zkontrolovat zobrazení + linky

6. **Circle.so post** — přes Circle MCP v Cursoru  
   - Post do **Edu space** (přítomní + obecná komunita)
   - Post do **obecných prostorů** (dle relevance)
   - Obsah: shrnutí, link na záznam, materiály

7. **Schválit a odeslat** kampaň v Brevo (nebo naplánovat na druhý den ráno)

**Checklist:**
- [ ] Transcript `.md` soubor přidán
- [ ] Follow-up email vygenerován (`fupwebinar`)
- [ ] YouTube / SoundCloud / Drive linky doplněny
- [ ] UTM parametry přidány ke všem linkům
- [ ] Upload do Brevo jako draft (`brevo` command)
- [ ] Test email zkontrolován
- [ ] Circle.so post — Edu space
- [ ] Circle.so post — obecný space
- [ ] Kampaň odeslána / naplánována

### 3c. AI Morning Show — follow-up

AI Morning Show je samostatný live stream formát (odlišný od webinářů). Follow-up flow je stejný, jen s vlastními commands:

- `/AIMSfupmail` — vygeneruje follow-up email ze záznamu/přepisu (šablona v `content/emails/AI Morning Show/`)
- `/AIMScircle` — připraví Circle post jako `.md` → pak `/circlepost` k publikaci

---

## 4. Workflow: Newsletter

**Kadence:** každý týden  
**Vlastník:** `[A]`

1. **Obsah** — napsat newsletter v Markdownu nebo rovnou v HTML  
   Umístění: `content/emails/NEWSLETTER/`  
   Pojmenování: `newsletter-[mesic]-[rok]-[tema].md`

2. **HTML verze** — převést do HTML emailu  
   - Použít existující šablonu z `content/emails/NEWSLETTER/` nebo Email Builder
   - Zkontrolovat mobilní zobrazení, dark mode, emoji zabalené do `<span>` tagů

3. **Campaign name** — vygenerovat podle naming convention  
   Formát: `AIB_GEN_BRO_5_RET_CZE_Newsletter[MesicRok]`

4. **UTM parametry** — přidat ke všem linkům v newsletteru  
   `?utm_source=brevo&utm_medium=email&utm_campaign=[campaign-name-lowercase]`

5. **Upload do Brevo** — Cursor command `brevo`  
   - Automaticky vytvoří draft kampaň v Brevo
   - Odešle test email

6. **Zkontrolovat** v Brevo:
   - Subject line a preview text
   - Odesílatel (Tým Aibility / konkrétní osoba)
   - Zobrazení v desktop + mobil
   - Všechny CTA linky fungují

7. **Odeslat / naplánovat** — standardně v úterý nebo ve středu ráno (8–9h)

### 4b. AI Edu NL

Samostatný týdenní newsletter pro účastníky **AI Edu Streamu** (jiný seznam než hlavní Aibility newsletter). Tvorba přes `/AIEduNL` command — zadáš tip týdne, události a CTA, command nejdřív vygeneruje text ke schválení, pak HTML. Šablony v `content/emails/AI Edu NL/`.

**Checklist:**
- [ ] Obsah napsán v MD nebo HTML
- [ ] HTML šablona hotová, emoji opravené
- [ ] Campaign name vygenerován
- [ ] UTM parametry na všech linkách
- [ ] Upload do Brevo (`brevo` command)
- [ ] Test email zkontrolován
- [ ] Kampaň naplánována / odeslána

---

## 5. Workflow: Social Media

**Kadence:** 2–3x týdně  
**Vlastník:** `[A]`  
**Platformy:** LinkedIn, Instagram, Facebook, X (Twitter), Threads

### 5a. Tvorba textu

1. **Vytvořit `.md` soubor** v `content/socials/texty/`  
   Šablona: `content/socials/texty/_TEMPLATE-social-post.md`  
   Struktura souboru:
   ```
   STATUS: draft
   DATUM: YYYY-MM-DD
   KAMPAŇ: [campaign name]

2. **Napsat texty** pro každou platformu — různý tón, délka a styl  
   - LinkedIn: thought leadership, storytelling, delší formát
   - Instagram: vizuálně orientovaný, hashtagy, emoji
   - X: max 280 znaků, punchy, hook hned na začátku
   - Threads: konverzační, casual

3. Nastavit `STATUS: ready` jakmile je text hotový

### 5b. Tvorba vizuálů

Vizuál se tvoří podle potřeby a charakteru postu. Možnosti:

| Nástroj | Kdy použít |
|---|---|
| **Gemini** (`/generate-image` nebo standalone) | Rychlé generování fotek / ilustrací |
| **Trybloom.ai** | Grafiky, brandové vizuály |
| **Banner Ad Tool** | Brandované grafiky ze šablon (story + square), export PNG |
| **Social Visual Editor** | SVG šablony pro AI Edu Stream a podobné série |
| **Figma** | Finální editace, úpravy existujících grafik |
| **Ad JSON → rebrand** | Stáhnout JSON existující reklamy → přetvořit pro Aibility brand |

### 5c. Posting

1. **Spustit `/upload-social`** command v Cursoru  
   Syntax: `/upload-social [PLATFORMY] [ČAS]`  
   Příklady:
   ```
   /upload-social LI X THR
   /upload-social IG FB zítra 10:00
   ```
   Platformy: `IG` `FB` `LI` `X` `THR` `TT` `YT` `PIN`

2. **Zadat text** postu a **médium** (URL obrázku nebo "bez vizuálu")

3. **Spustit `@socialpost-auto`** pokud máš připravený `.md` soubor s více platformami  
   - Přečte soubor, naparsuje sekce (LI, IG, FB, X, THR)
   - Postuje přes Upload Post API bez Bufferu

4. Příspěvek se odešle hned nebo naplánuje podle zadaného času

**Checklist:**
- [ ] `.md` soubor vytvořen ze šablony
- [ ] Texty napsány pro každou platformu
- [ ] `STATUS: ready` nastaveno
- [ ] Vizuál vygenerován (pokud potřeba)
- [ ] `/upload-social` nebo `/socialpost-auto` — preview schváleno
- [ ] Post odeslán / naplánován

---

## 6. Workflow: Email Kampaně (B2B, Launch, Sekvence)

**Vlastník:** `[A]`  
**Kdy:** launch nového produktu, B2B akvizice, automatické sekvence

1. **Obsah** — napsat email nebo sekvenci v Markdownu  
   Šablona: `content/emails/Aibility B2B Email Template.html`

2. **HTML** — převést do HTML pomocí šablony nebo Email Builder (`/editor`)  
   Zkontrolovat: Outlook kompatibilitu (VML tlačítka), mobilní zobrazení, dark mode

3. **Campaign name** — pojmenovat podle convention  
   B2B příklad: `AIB_GEN_BRO_5_CON_CZE_B2B-Osloveni`  
   Launch příklad: `AIB_AIM_BRO_5_DEC_CZE_LaunchMar26`

4. **UTM parametry** na všechny linky

5. **Upload do Brevo** — `brevo` Cursor command  
   Pro sekvence: nastavit jako automation workflow v Brevo (ne jednorázová kampaň)

6. **Segmentace** — vybrat správný seznam nebo segment v Brevo  
   - Celá audience: main Aibility list
   - B2B: segment firemní kontakty
   - Webinář follow-up: segment registrovaní na konkrétní webinář

7. **Test email** → schválení → odeslání

---

## 7. Workflow: Meta Ads

**Vlastník:** `[J]` (na větší kampaně `[A+J]`)  
**Kdy:** průběžně pro webináře, produkty, retargeting

### Krok 1 — Ověřit konverze

Před spuštěním kampaně vždy ověřit, že konverze fungují:
- Pokud **konverze existují a jsou spolehlivé** → jít na krok 2
- Pokud **konverze chybí nebo nejsou spolehlivé** → nejdřív nasadit tracking (viz sekce 9)

### Krok 2 — Generovat copy přes Aibility commands

Vzít cílovou **URL** a nechat subagenta vygenerovat:
- `meta-ads-image-headlines.md` → headlines pro vizuály (krátké, do nadpisu)
- `meta-ads-copy-pack.md` → kompletní copy pack (primary text, headline, description)

Copywriter vždy pracuje s kontextem **Aibility product-bible** a správným tónem hlasu.

### Krok 3 — Produkce vizuálů

Vybrat nástroj podle potřeby:

| Nástroj | Kdy |
|---|---|
| **Banner Ad Tool** (`PACT/4_Tools/banner-ad-tool/`) | Brandované kreativy ze šablon, batch tvorba kampaní přes agenta |
| **Google Whisk** | Generování fotek / vizuálního podkladu |
| **Gemini Image Gen** | AI generování podkladového obrázku |
| **Figma** | Finální spojení headline + vizuál, úpravy kreativy |
| **Ad JSON → rebrand** | Stáhnout JSON existující reklamy → přetvořit pro Aibility brand |
| **Video Ad Maker** | Animované video reklamy (Remotion) — varianty `redacted-headline`, `phone-chat` |

Po dokončení:
- Exportovat ve formátech: `1x1` (feed), `9x16` (stories/reels)
- Uložit do složky kampaně — pojmenování `[tema]_[format]_[varianta].jpg/mp4`
- Do stejné složky přidat copy pack z kroku 2

### Krok 3b — Sdílení copy s týmem (volitelné)

Pokud je potřeba sdílet copy k odsouhlasení:
- Použít `/mdshare` command → vygeneruje veřejný link na `.md` soubor s copy
- Link sdílet přes Slack nebo email

### Krok 4 — Založit kampaň přes MetaAutomator

Použít **MCP MetaAutomator** se skillem `meta-campaign-orchestrator` a agentem `aibility-meta-campaigns`:
- Automatizované a konzistentní vytvoření kampaně v Metě
- Na základě připravených podkladů ze složky kampaně

### Krok 5 — Finální kontrola před spuštěním

- [ ] Konverze správně napojené
- [ ] Kreativy přiřazené (správné formáty)
- [ ] Texty a headlines zkontrolované
- [ ] Budget a schedule nastavené
- [ ] Kampaň schválena ke spuštění

---

## 8. Workflow: LinkedIn Ads

**Vlastník:** `[A]`  
**Status:** spouštím manuálně, zatím není automatizované

Kampaně zakládám a spravuju ručně v LinkedIn Campaign Manageru. Tracking přes LinkedIn Insight Tag (nasazený Jakubem přes GTM).

---

## 9. Workflow: Google Ads

**Vlastník:** `[J]`  
**Typy:** DSA (dynamické — pro webináře a produkty) + RSA (keyword-based)

### Rozhodnutí: DSA vs. RSA

- **DSA** → hodně položek, které se průběžně mění (webináře, nabídky, katalog)
- **RSA** → přesné keyword targeting, kontrolovaný messaging a struktura

---

### Větev A: DSA workflow

1. Vzít vstupní URL a vytvořit skript do **Google Sheetu**  
   Skript automaticky stahuje aktuální seznam položek (webináře, produkty)

2. Na separátním listu v Sheetu se generuje **page feed** z dat  
   Page feed = aktuální položky připravené pro Google Ads

3. Page feed **uploadnout do Google Ads**

4. Nastavit DSA kampaň nad aktuálním feedem

5. **Provozní kontrola:**
   - Feed se pravidelně aktualizuje
   - Kampaň cílí na aktuální položky ze feedu

**Checklist DSA:**
- [ ] Vstupní URL zvolena
- [ ] Google Sheet skript funkční
- [ ] Page feed generovaný na separátním listu
- [ ] Feed uploadnutý do Google Ads
- [ ] DSA kampaň napojená na feed

---

### Větev B: RSA workflow

1. Určit konkrétní **landing page** pro kampaň

2. **Keyword research** podle landing page  
   Použít keyword research skill z Aibility marketing skills

3. Připravit **assety pro RSA:**
   - Headlines: max `30` znaků
   - Descriptions: max `90` znaků

4. **Průběžná péče:**
   - Procházet search terms report
   - Vylučovat nevhodné dotazy přes negativní klíčová slova

**Checklist RSA:**
- [ ] Landing page určena
- [ ] Keyword research hotový
- [ ] Headlines do 30 znaků
- [ ] Descriptions do 90 znaků
- [ ] Nastavena negativní klíčová slova (a průběžně aktualizovaná)

---

## 10. Workflow: Analytics & Tracking

**Vlastník:** `[J]`  
**Kdy:** při spouštění nové funkce, nové konverzní akce nebo nové platformy

### Krok 1 — Identifikovat měřitelnou akci

Vybrat konkrétní akci na webu, která dává byznysový smysl jako konverzní event:
- Jednoznačná a opakovatelná
- Technicky realizovatelná bez hacků
- Příklady: `assessment_started`, `assessment_completed`, `assessment_shared`, `webinar_registered`, `purchase`

### Krok 2 — Implementace v GTM

1. Vytvořit **trigger** pro danou akci
2. Vytvořit **tag** pro odeslání eventu
3. Namapovat parametry eventu
4. Nastavit **consent management**:
   - Tag nespouštět před souhlasem uživatele
   - Ověřit spuštění po udělení souhlasu

### Krok 3 — Test v GTM (povinný gate)

Před rolloutem do platforem otestovat v **GTM preview/debug** režimu:
- Trigger se aktivuje přesně na očekávané akci
- Tag se odpálí pouze při správném consent stavu
- Payload obsahuje očekávané hodnoty
- Event nevzniká duplicitně

Pokud něco nesedí → vrátit se na krok 2.

### Krok 4 — Rollout do platforem

Každá platforma má vlastní způsob zpracování a validace — řeší se **odděleně**:
- **GA4** — event name + parametry
- **PostHog** — event name + properties
- **Meta Pixel** — standard/custom event + mapping
- **Google Ads Conversion** — konverzní akce
- **LinkedIn Pixel** — conversion event

### Krok 5 — Verifikace v platformách

Po nasazení ověřit v každé platformě individuálně:
1. Otevřít diagnostiku / test view
2. Vyvolat event na webu
3. Potvrdit, že se event propsal se správnými hodnotami
4. Event v platformě **zaregistrovat/potvrdit** → dostupný pro kampaně

### Krok 6 — Připravenost pro kampaně

Po nasazení počítat s delay fází (propagace eventu v platformě). Teprve po ověření dostupnosti používat event jako konverzní cíl v kampani.

**Checklist:**
- [ ] Měřitelná akce s byznysovým smyslem zvolena
- [ ] GTM trigger + tag vytvořeny
- [ ] Consent management nastaven
- [ ] Tag testován v GTM preview
- [ ] Event rolloutnutý do GA4
- [ ] Event rolloutnutý do PostHog
- [ ] Event rolloutnutý do Meta Pixel
- [ ] Event rolloutnutý do Google Ads Conversion
- [ ] Event rolloutnutý do LinkedIn Pixel
- [ ] Event potvrzený v každé platformě
- [ ] Dostupnost pro kampaně ověřena

---

## 11. Automation Stack

Přehled toho, co je automatizované a jak:

### Cursor Commands `[A]` — přehled všech

| Command | Co dělá | Oblast |
|---|---|---|
| `/fupwebinar` | Z transcript `.md` vygeneruje kompletní follow-up email (`.md` + `.html`) | Webináře |
| `/fupwebinartext` | Jen textový draft follow-up emailu z transcriptu | Webináře |
| `/fupwebinarhtml` | Jen HTML email z existujícího textového souboru | Webináře |
| `/AIMSfupmail` | Follow-up email pro AI Morning Show | AI Morning Show |
| `/AIMScircle` | Circle post k AI Morning Show z follow-up emailu (uloží jako `.md`) | AI Morning Show |
| `/AIEduNL` | Newsletter pro nový týden AI Edu Streamu (nejdřív text ke schválení, pak HTML) | AI Edu Stream |
| `/brevo` | Uploadne HTML email do Brevo jako draft, odešle test email | Email |
| `/circleedu` | Postuje `.md` soubor do Circle Edu space | Circle |
| `/circlepost` | Postuje `.md` soubor na Circle (jakýkoli space) | Circle |
| `/upload-social [PLATFORMY] [ČAS]` | Postuje na social media přes Upload Post API (IG, FB, LI, X, THR, TT, YT, PIN, BS) | Social |
| `/socialpost-auto` | Automatický upload z `.md` souboru s rozpisem pro jednotlivé platformy | Social |
| `/generate-image "prompt"` | Generuje obrázek přes Gemini 3 (OpenRouter API) | Vizuály |
| `/mdshare` | Sdílí `.md` soubor jako veřejný link (pro sdílení copy s týmem) | Sdílení |
| `/urlimage` | Uploadne obrázek na GitHub a vrátí veřejnou URL (pro použití v emailech) | Email / vizuály |

### Cursor Commands `[J]` (z Jakubova repozitáře)

| Command | Oblast |
|---|---|
| `meta-ads-image-headlines` | Headlines pro Meta vizuály |
| `meta-ads-copy-pack` | Kompletní copy pack pro Meta kampaně |

### API Integrace (přímé akce z Cursoru)

| Integrace | Co dělá | Kdo |
|---|---|---|
| **Circle API** | Publikování příspěvků na Circle.so (přes `/circleedu`, `/circlepost`) | `[A]` |
| **Upload Post API** | Posting na social media přes `/upload-social` | `[A]` |
| **MetaAutomator MCP** | Automatizované zakládání Meta kampaní | `[J]` |
| **Brevo API (Python script)** | Upload HTML emailů do Brevo | `[A]` |

### Slack Reminders — Webinář Ad Trigger

Umístění: `PACT/4_Tools/automation/slack-reminders/`

Automatizace pro spouštění webinářových ad kampaní:
- Vercel Cron scrape `aibility.cz/webinare/nejblizsi-akce` každé 3 dny v 8:00
- Pokud je webinář N dní pryč (default: 10 a 14 dní) → pošle Slack připomínku
- Redis flag zabraňuje duplicitním připomínkám
- Na základě Slack zprávy `[A+J]` spustí příslušné ad kampaně

### RSS Monitor — AI News

Umístění: `PACT/4_Tools/rss-monitor/`

Python tool, který monitoruje RSS feedy s AI novinkami, hodnotí jejich důležitost a kategorizuje je — výstup slouží jako podklad pro tvorbu social postů (single post nebo carousel) o AI novinkách.

---

### Auto-Social Poster *(work in progress)*

Umístění: `PACT/4_Tools/automation/auto-social-poster/`

Next.js app na Vercelu. Každé pondělí v 6:00 automaticky scrape aibility.cz, vygeneruje posty pro **X a Threads** podle brand voice (s deduplication a slop detection) a naplánuje je přes Upload Post API.

### Scripty & Nástroje

| Skript / Tool | Co dělá | Umístění |
|---|---|---|
| `generate-visual.js` | Generuje PNG grafiky pro social (Puppeteer + SVG šablony) | `content/socials/social-visual-editor/` |
| `upload-email-to-brevo.py` | Upload HTML emailu do Brevo API | `PACT/4_Tools/` |
| `publish-to-circle.py` | Publikování na Circle přes API | `PACT/4_Tools/` |
| `upload-to-github.py` / `upload-image-to-github.sh` | Upload souboru/obrázku na GitHub pro veřejnou URL | `PACT/4_Tools/` |
| `generate.py` (Gemini) | Generování obrázků přes OpenRouter API | `PACT/4_Tools/gemini-image-gen/` |
| `app/server.js` (Banner Ad Tool) | Lokální server pro tvorbu reklamních kreativy | `PACT/4_Tools/banner-ad-tool/` |
| Google Sheets skript | Stahuje webináře/produkty → page feed pro DSA kampaně | Google Sheets |

---

## 12. Příležitosti ke Zlepšení & Škálování

Tato sekce slouží pro identifikaci bottlenecků a nápadů na zlepšení systému. Aktualizovat průběžně.

### Nápady ke zvážení

<!-- TODO: doplnit nápady z týmového brainstormingu -->

- [ ] **End-to-end webinář pipeline** — transcript → follow-up email → Circle post → social posts → vše z jednoho Cursor command
- [ ] **Newsletter template** s dynamickými sekcemi — méně HTML ruční práce
- [ ] **Unified content calendar** — newsletter + social + webináře na jednom místě, ideálně propojeno s Cursorem
- [x] **Reporting dashboards** — Campaign Overview a Data Dashboard existují a trackujeme automaticky, stále work in progress (Meta, LinkedIn, Google, GA4)
- [ ] **A/B testování subject lines** — Brevo to podporuje, zatím nevyužito systematicky
- [ ] **Retargeting sekvence** — web visitors → email → Meta retargeting (propojení Brevo + Meta audience)
- [ ] **Větší automatizace tvorby kampaní** — od briefu přes copy až po nahrání do ad manageru s minimem ručních kroků

### Kde jsme silní (co dělat víc)

- Cursor commands výrazně zrychlují repetitivní práci (`/fupwebinar`, `/brevo`, `/upload-social`, `/circleedu`)
- Content atomization: jeden webinář → email + Circle post + social posty
- UTM naming convention je konzistentní — data jsou čistá
- Vlastní tooling (Banner Ad Tool a Video Ad Maker od Verči, Social Visual Editor) — žádná závislost na externích SaaS s broken API
- Slack reminders automatizují trigger pro spuštění webinářových ad kampaní

---

## Appendix: Naming Convention

### Campaign Names

Formát: `AIB_[PRODUCT]_[SOURCE]_[TYPE]_[PHASE]_[LANGUAGE]_[SUFFIX]`

| Složka | Hodnoty |
|---|---|
| PROJECT | `AIB` |
| PRODUCT | `AIM` (Aimee), `EDU` (EDU Stream), `WBN` (Webináře), `GEN` (General), `SP` (Superpowered Pro) |
| SOURCE | `BRO` (Brevo), `FCB` (Facebook), `ADS` (Google Ads), `LIN` (LinkedIn), `TWI` (Twitter), `TIK` (TikTok) |
| TYPE | `1` (Search), `2` (Display), `3` (Video), `4` (PR), `5` (Email), `6` (Social) |
| PHASE | `AWA` (Awareness), `CON` (Consideration), `DEC` (Decision), `RET` (Retention) |
| LANGUAGE | `CZE`, `ENG` |
| SUFFIX | volný text, CamelCase, bez mezer |

**Příklady:**
- Webinář follow-up email: `AIB_WBN_BRO_5_RET_CZE_KlicAdopceAI`
- Newsletter leden 2026: `AIB_GEN_BRO_5_RET_CZE_NewsletterLeden26`
- Meta ad na SP™: `AIB_SP_FCB_2_AWA_CZE_LaunchMar26`
- Google Search na Aimee: `AIB_AIM_ADS_1_CON_CZE_`

### Soubory & Složky

| Obsah | Složka | Pojmenování |
|---|---|---|
| Webinář follow-up | `content/emails/Webinars/` | `[Název] - [DD.MM.YYYY] follow up [číslo].html` |
| Newsletter | `content/emails/NEWSLETTER/` | `newsletter-[mesic]-[rok]-[tema].html` |
| Social posty | `content/socials/texty/` | `[YYYY-MM-DD]-[tema].md` |
| Social grafiky | `content/socials/vizuály/` | `[tema]_[format]_[varianta].png` |
| Webinář transcript | `content/emails/Webinars/` | `[Název] - [DD.MM.YYYY] transcript.md` |
