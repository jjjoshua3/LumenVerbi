export type Lang = "nl" | "en" | "sw" | "sr" | "ar" | "syr" | "fa" | "ur" | "ti" | "uk" | "tr";
export type SrScript = "cyrl" | "latn";
export type SyrStyle = "estrangelo" | "serto";
export type ScriptKey = "latn" | "cyrl" | "arab" | "syrc" | "serto" | "ethi" | "nast";

export type Copy = {
  tagline: string;
  heroAlt: string;
  epigraph: string;
  epigraphRef: string;
  welcomeTitle: string;
  welcomeLead: string;
  cta: string;
  reassurance: readonly [string, string, string];
  howTitle: string;
  steps: readonly [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; body: string },
  ];
  chooseTitle: string;
  dropTitle: string;
  dropOr: string;
  dropNote: string;
  reading: string;
  fileReady: string;
  words: string;
  remove: string;
  sourcePreview: string;
  translate: string;
  translating: string;
  part: string;
  resultKicker: string;
  resultTitle: string;
  download: string;
  preparing: string;
  again: string;
  promiseTitle: string;
  promiseBody: string;
  trust: string;
  designedBy: string;
  pdfCredit: string;
  scriptLabel: string;
  cyrillic: string;
  latin: string;
  estrangelo: string;
  serto: string;
  errorType: string;
  errorSize: string;
  errorEmpty: string;
  errorRead: string;
  errorAi: string;
  errorUnavailable: string;
  errorLong: string;
  errorPdf: string;
  printFallback: string;
  langLabel: string;
  changedLang: string;
  closeMenu: string;
};

const nl: Copy = {
  tagline: "Het Woord in jouw eigen taal",
  heroAlt: "Drie kruisen in het avondlicht",
  epigraph: "In het begin was het Woord.",
  epigraphRef: "Johannes 1:1",
  welcomeTitle: "Het Woord, dichtbij in jouw taal",
  welcomeLead:
    "Upload een preek. LumenVerbi vertaalt hem bijna letterlijk naar jouw moedertaal en schrift — getrouw aan de voorganger, natuurlijk om te lezen, niets weggelaten.",
  cta: "Vertaal je preek",
  reassurance: ["Bijna letterlijk", "Niets weggelaten", "Jouw schrift"],
  howTitle: "Zo werkt het",
  steps: [
    {
      title: "Kies je taal",
      body: "De hele pagina én de PDF volgen het schrift dat jij kiest.",
    },
    {
      title: "Upload de preek",
      body: "Sleep een Word- of tekst-PDF hierheen, of klik om een bestand te kiezen.",
    },
    {
      title: "Lees en download",
      body: "De vertaling verschijnt meteen, klaar om te lezen en als nette PDF te bewaren.",
    },
  ],
  chooseTitle: "In welke taal wil je de preek lezen?",
  dropTitle: "Sleep je preek hierheen",
  dropOr: "of klik om te bladeren",
  dropNote: "Word (.docx) en tekst-PDF. Gescande pagina’s hebben geen tekstlaag en kunnen niet worden gelezen.",
  reading: "Bestand wordt gelezen…",
  fileReady: "Bestand klaar",
  words: "woorden",
  remove: "Verwijder",
  sourcePreview: "Brontekst",
  translate: "Vertaal je preek",
  translating: "De preek wordt vertaald…",
  part: "Deel {n} van {m}",
  resultKicker: "Vertaling",
  resultTitle: "Je vertaalde preek",
  download: "Download als PDF",
  preparing: "PDF wordt gemaakt…",
  again: "Nieuwe preek",
  promiseTitle: "Getrouw aan de voorganger",
  promiseBody:
    "De vertaling volgt de preek zo letterlijk mogelijk. Opbouw, toon en Bijbelverwijzingen blijven staan. Niets wordt samengevat of weggelaten, en de zinnen blijven natuurlijk leesbaar in het schrift van je taal.",
  trust: "Je bestand verlaat de browser niet. Alleen de uitgelezen tekst gaat naar de vertaling.",
  designedBy: "Ontworpen door:",
  pdfCredit: "Mede mogelijk gemaakt door Joshua",
  scriptLabel: "Schrift",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "Alleen .docx en .pdf worden ondersteund.",
  errorSize: "Dit bestand is te groot (maximaal 20 MB).",
  errorEmpty: "We vonden bijna geen tekst. Een gescande PDF heeft geen tekstlaag.",
  errorRead: "Het bestand kon niet worden gelezen.",
  errorAi: "De vertaling is niet gelukt. Probeer het opnieuw.",
  errorUnavailable: "Vertalen is op dit moment niet beschikbaar.",
  errorLong: "Deze preek is te lang voor één keer. Knip hem in delen.",
  errorPdf: "De PDF kon niet worden gemaakt. Bewaar hem via afdrukken.",
  printFallback: "Afdrukken of bewaren als PDF",
  langLabel: "Taal",
  changedLang: "Je koos een andere taal. Vertaal opnieuw voor de preek in dit schrift.",
  closeMenu: "Sluit taalkiezer",
};

const en: Copy = {
  tagline: "The Word in your own language",
  heroAlt: "Three crosses in the evening light",
  epigraph: "In the beginning was the Word.",
  epigraphRef: "John 1:1",
  welcomeTitle: "The Word, close in your own language",
  welcomeLead:
    "Upload a sermon. LumenVerbi translates it almost literally into your mother tongue and script — faithful to the preacher, natural to read, nothing left out.",
  cta: "Translate your sermon",
  reassurance: ["Almost literal", "Nothing omitted", "Your script"],
  howTitle: "How it works",
  steps: [
    {
      title: "Choose your language",
      body: "The whole page and the PDF follow the script you choose.",
    },
    {
      title: "Upload the sermon",
      body: "Drop a Word file or a text PDF here, or click to choose one.",
    },
    {
      title: "Read and download",
      body: "The translation appears at once, ready to read and save as a clean PDF.",
    },
  ],
  chooseTitle: "In which language do you want to read the sermon?",
  dropTitle: "Drop your sermon here",
  dropOr: "or click to browse",
  dropNote: "Word (.docx) and text-based PDF. Scanned pages have no text layer and cannot be read.",
  reading: "Reading the file…",
  fileReady: "File ready",
  words: "words",
  remove: "Remove",
  sourcePreview: "Source text",
  translate: "Translate your sermon",
  translating: "The sermon is being translated…",
  part: "Part {n} of {m}",
  resultKicker: "Translation",
  resultTitle: "Your translated sermon",
  download: "Download as PDF",
  preparing: "Preparing the PDF…",
  again: "New sermon",
  promiseTitle: "Faithful to the preacher",
  promiseBody:
    "The translation follows the sermon as literally as possible. Structure, tone and Scripture references stay. Nothing is summarised or left out, and the sentences remain natural in the script of your language.",
  trust: "Your file never leaves the browser. Only the extracted text is sent for translation.",
  designedBy: "Designed by:",
  pdfCredit: "Made possible by Joshua",
  scriptLabel: "Script",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "Only .docx and .pdf are supported.",
  errorSize: "This file is too large (maximum 20 MB).",
  errorEmpty: "We found almost no text. A scanned PDF has no text layer.",
  errorRead: "The file could not be read.",
  errorAi: "The translation did not succeed. Please try again.",
  errorUnavailable: "Translation is not available right now.",
  errorLong: "This sermon is too long for one pass. Split it into parts.",
  errorPdf: "The PDF could not be created. Save it with print instead.",
  printFallback: "Print or save as PDF",
  langLabel: "Language",
  changedLang: "You chose another language. Translate again to receive the sermon in this script.",
  closeMenu: "Close language menu",
};

const sr: Copy = {
  tagline: "Реч на твом језику",
  heroAlt: "Три крста у вечерњој светлости",
  epigraph: "У почетку беше Реч.",
  epigraphRef: "Јован 1:1",
  welcomeTitle: "Реч, близу — на твом језику",
  welcomeLead:
    "Отпреми проповед. LumenVerbi је преводи готово дословно на твој матерњи језик и писмо — верно проповеднику, природно за читање, ништа изостављено.",
  cta: "Преведи проповед",
  reassurance: ["Готово дословно", "Ништа изостављено", "Твоје писмо"],
  howTitle: "Како ради",
  steps: [
    {
      title: "Изабери језик",
      body: "Цела страница и PDF прате писмо које изабереш.",
    },
    {
      title: "Отпреми проповед",
      body: "Превуци Word или текстуални PDF овде, или кликни да изабереш датотеку.",
    },
    {
      title: "Читај и преузми",
      body: "Превод се одмах појављује, спреман за читање и чување као уредан PDF.",
    },
  ],
  chooseTitle: "На ком језику желиш да читаш проповед?",
  dropTitle: "Превуци проповед овде",
  dropOr: "или кликни да претражиш",
  dropNote: "Word (.docx) и PDF са текстом. Скениране странице немају слој текста и не могу се прочитати.",
  reading: "Датотека се чита…",
  fileReady: "Датотека спремна",
  words: "речи",
  remove: "Уклони",
  sourcePreview: "Изворни текст",
  translate: "Преведи проповед",
  translating: "Проповед се преводи…",
  part: "Део {n} од {m}",
  resultKicker: "Превод",
  resultTitle: "Твоја преведена проповед",
  download: "Преузми као PDF",
  preparing: "PDF се припрема…",
  again: "Нова проповед",
  promiseTitle: "Верно проповеднику",
  promiseBody:
    "Превод прати проповед што дословније. Структура, тон и библијска места остају. Ништа се не сажима и не изоставља, а реченице остају природне на писму твог језика.",
  trust: "Датотека не напушта прегледач. На превод иде само прочитани текст.",
  designedBy: "Дизајнирао:",
  pdfCredit: "Омогућио Joshua",
  scriptLabel: "Писмо",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "Подржани су само .docx и .pdf.",
  errorSize: "Датотека је превелика (највише 20 MB).",
  errorEmpty: "Готово да нема текста. Скенирани PDF нема слој текста.",
  errorRead: "Датотека није могла бити прочитана.",
  errorAi: "Превод није успео. Покушај поново.",
  errorUnavailable: "Превод тренутно није доступан.",
  errorLong: "Проповед је предугачка за један превод. Подели је.",
  errorPdf: "PDF није направљен. Сачувај га преко штампе.",
  printFallback: "Штампај или сачувај као PDF",
  langLabel: "Језик",
  changedLang: "Изабрао си други језик. Преведи поново да проповед буде на овом писму.",
  closeMenu: "Затвори избор језика",
};

const srLat: Copy = {
  tagline: "Reč na tvom jeziku",
  heroAlt: "Tri krsta u večernjoj svetlosti",
  epigraph: "U početku beše Reč.",
  epigraphRef: "Jovan 1:1",
  welcomeTitle: "Reč, blizu — na tvom jeziku",
  welcomeLead:
    "Otpremi propoved. LumenVerbi je prevodi gotovo doslovno na tvoj maternji jezik i pismo — verno propovedniku, prirodno za čitanje, ništa izostavljeno.",
  cta: "Prevedi propoved",
  reassurance: ["Gotovo doslovno", "Ništa izostavljeno", "Tvoje pismo"],
  howTitle: "Kako radi",
  steps: [
    {
      title: "Izaberi jezik",
      body: "Cela stranica i PDF prate pismo koje izabereš.",
    },
    {
      title: "Otpremi propoved",
      body: "Prevuci Word ili tekstualni PDF ovde, ili klikni da izabereš datoteku.",
    },
    {
      title: "Čitaj i preuzmi",
      body: "Prevod se odmah pojavljuje, spreman za čitanje i čuvanje kao uredan PDF.",
    },
  ],
  chooseTitle: "Na kom jeziku želiš da čitaš propoved?",
  dropTitle: "Prevuci propoved ovde",
  dropOr: "ili klikni da pretražiš",
  dropNote: "Word (.docx) i PDF sa tekstom. Skenirane stranice nemaju sloj teksta i ne mogu se pročitati.",
  reading: "Datoteka se čita…",
  fileReady: "Datoteka spremna",
  words: "reči",
  remove: "Ukloni",
  sourcePreview: "Izvorni tekst",
  translate: "Prevedi propoved",
  translating: "Propoved se prevodi…",
  part: "Deo {n} od {m}",
  resultKicker: "Prevod",
  resultTitle: "Tvoja prevedena propoved",
  download: "Preuzmi kao PDF",
  preparing: "PDF se priprema…",
  again: "Nova propoved",
  promiseTitle: "Verno propovedniku",
  promiseBody:
    "Prevod prati propoved što doslovnije. Struktura, ton i biblijska mesta ostaju. Ništa se ne sažima i ne izostavlja, a rečenice ostaju prirodne na pismu tvog jezika.",
  trust: "Datoteka ne napušta pregledač. Na prevod ide samo pročitani tekst.",
  designedBy: "Dizajnirao:",
  pdfCredit: "Omogućio Joshua",
  scriptLabel: "Pismo",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "Podržani su samo .docx i .pdf.",
  errorSize: "Datoteka je prevelika (najviše 20 MB).",
  errorEmpty: "Gotovo da nema teksta. Skenirani PDF nema sloj teksta.",
  errorRead: "Datoteka nije mogla biti pročitana.",
  errorAi: "Prevod nije uspeo. Pokušaj ponovo.",
  errorUnavailable: "Prevod trenutno nije dostupan.",
  errorLong: "Propoved je predugačka za jedan prevod. Podeli je.",
  errorPdf: "PDF nije napravljen. Sačuvaj ga preko štampe.",
  printFallback: "Štampaj ili sačuvaj kao PDF",
  langLabel: "Jezik",
  changedLang: "Izabrao si drugi jezik. Prevedi ponovo da propoved bude na ovom pismu.",
  closeMenu: "Zatvori izbor jezika",
};

const ar: Copy = {
  tagline: "الكلمة بلغتك",
  heroAlt: "ثلاثة صلبان في ضوء المساء",
  epigraph: "فِي الْبَدْءِ كَانَ الْكَلِمَةُ.",
  epigraphRef: "يوحنا ١: ١",
  welcomeTitle: "الكلمة قريبة بلغتك",
  welcomeLead:
    "ارفع عظة. يترجمها LumenVerbi ترجمة شبه حرفية إلى لغتك الأم وخطّك — أمينة لرسالة الواعظ، طبيعية في القراءة، بلا حذف.",
  cta: "ترجم عظتك",
  reassurance: ["شبه حرفية", "بلا حذف", "خطّك أنت"],
  howTitle: "كيف يعمل",
  steps: [
    {
      title: "اختر لغتك",
      body: "الصفحة كلها وملف PDF يتبعان الخط الذي تختاره.",
    },
    {
      title: "ارفع العظة",
      body: "اسحب ملف Word أو PDF نصيًا إلى هنا، أو انقر للاختيار.",
    },
    {
      title: "اقرأ ونزّل",
      body: "تظهر الترجمة فورًا، جاهزة للقراءة وللحفظ في PDF أنيق.",
    },
  ],
  chooseTitle: "بأي لغة تريد أن تقرأ العظة؟",
  dropTitle: "اسحب عظتك إلى هنا",
  dropOr: "أو انقر للتصفح",
  dropNote: "Word ‏(.docx) وPDF فيه نص. الصفحات الممسوحة ضوئيًا بلا طبقة نص لا تُقرأ.",
  reading: "جارٍ قراءة الملف…",
  fileReady: "الملف جاهز",
  words: "كلمة",
  remove: "إزالة",
  sourcePreview: "النص الأصلي",
  translate: "ترجم عظتك",
  translating: "تجري ترجمة العظة…",
  part: "الجزء {n} من {m}",
  resultKicker: "الترجمة",
  resultTitle: "عظتك المترجمة",
  download: "نزّل كملف PDF",
  preparing: "يجري إعداد PDF…",
  again: "عظة جديدة",
  promiseTitle: "أمين للواعظ",
  promiseBody:
    "تتبع الترجمة العظة بأكبر قدر من الحرفية. يبقى البناء والنبرة والإحالات الكتابية. لا تلخيص ولا حذف، والجمل تبقى طبيعية بخط لغتك.",
  trust: "ملفك لا يغادر المتصفح. النص المستخرج وحده يذهب إلى الترجمة.",
  designedBy: "صمم بواسطة:",
  pdfCredit: "تم بفضل Joshua",
  scriptLabel: "الخط",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "يُقبل فقط ‎.docx و ‎.pdf.",
  errorSize: "الملف كبير جدًا (الحد 20 ميغابايت).",
  errorEmpty: "لم نعثر على نص تقريبًا. ملف PDF الممسوح بلا طبقة نص.",
  errorRead: "تعذّرت قراءة الملف.",
  errorAi: "لم تنجح الترجمة. حاول مرة أخرى.",
  errorUnavailable: "الترجمة غير متاحة الآن.",
  errorLong: "العظة أطول من أن تُترجم دفعة واحدة. قسّمها.",
  errorPdf: "تعذّر إنشاء PDF. احفظه عبر الطباعة.",
  printFallback: "اطبع أو احفظ كملف PDF",
  langLabel: "اللغة",
  changedLang: "اخترت لغة أخرى. ترجم من جديد لتحصل على العظة بهذا الخط.",
  closeMenu: "إغلاق اختيار اللغة",
};

const syr: Copy = {
  tagline: "ܡܠܬܐ ܒܠܫܢܟ",
  heroAlt: "ܬܠܬܐ ܙܩܝܦܐ ܒܢܘܗܪܐ ܕܪܡܫܐ",
  epigraph: "ܒܪܫܝܬ ܐܝܬܘܗܝ ܗܘܐ ܡܠܬܐ.",
  epigraphRef: "ܝܘܚܢܢ ܐ:ܐ",
  welcomeTitle: "ܡܠܬܐ ܩܪܝܒܬܐ ܒܠܫܢܟ",
  welcomeLead:
    "ܣܝܡ ܡܐܡܪܐ. ܠܘܡܢܘܪܒܝ ܡܬܪܓܡ ܠܗ ܫܪܝܪܐܝܬ ܠܠܫܢܟ ܘܠܟܬܒܟ — ܢܛܝܪ ܠܡܠܬܐ ܕܟܗܢܐ܇ ܩܪܝܐ ܒܦܫܝܩܘܬܐ܇ ܘܠܐ ܡܕܡ ܚܣܝܪ.",
  cta: "ܬܪܓܡ ܡܐܡܪܟ",
  reassurance: ["ܡܠܐ ܒܡܠܐ", "ܠܐ ܡܕܡ ܚܣܝܪ", "ܟܬܒܟ"],
  howTitle: "ܐܝܟܢܐ ܦܐܠܚ",
  steps: [
    {
      title: "ܓܒܝ ܠܫܢܟ",
      body: "ܟܠܗ ܦܐܬܐ ܘܦܕܦ ܢܩܦܝܢ ܠܟܬܒܐ ܕܓܒܝܬ.",
    },
    {
      title: "ܐܣܩ ܡܐܡܪܐ",
      body: "ܓܪܪ ܦܐܬܐ ܕܘܪܕ ܐܘ ܦܕܦ ܕܟܬܒܐ ܠܟܐ܇ ܐܘ ܩܦܘܚ ܠܡܓܒܐ.",
    },
    {
      title: "ܩܪܝ ܘܐܚܬ",
      body: "ܬܪܓܡܐ ܡܬܚܙܐ ܡܚܕܐ܇ ܡܛܝܒܐ ܠܡܩܪܝܢܘ ܘܠܡܐܚܬܘ ܐܝܟ ܦܕܦ ܫܦܝܪܐ.",
    },
  ],
  chooseTitle: "ܒܐܝܢܐ ܠܫܢܐ ܨܒܐ ܐܢܬ ܠܡܩܪܐ ܡܐܡܪܐ?",
  dropTitle: "ܓܪܪ ܡܐܡܪܟ ܠܟܐ",
  dropOr: "ܐܘ ܩܦܘܚ ܠܡܓܒܐ",
  dropNote: "ܘܪܕ (.docx) ܘܦܕܦ ܕܟܬܒܐ. ܨܘܪܬܐ ܣܩܝܢܬܐ ܠܝܬ ܒܗ ܫܟܒܐ ܕܟܬܒܐ.",
  reading: "ܦܐܬܐ ܡܬܩܪܐ…",
  fileReady: "ܦܐܬܐ ܡܛܝܒܐ",
  words: "ܡܠܐ",
  remove: "ܫܩܘܠ",
  sourcePreview: "ܟܬܒܐ ܩܕܡܝܐ",
  translate: "ܬܪܓܡ ܡܐܡܪܟ",
  translating: "ܡܐܡܪܐ ܡܬܬܪܓܡ…",
  part: "ܡܢܬܐ {n} ܡܢ {m}",
  resultKicker: "ܬܘܪܓܡܐ",
  resultTitle: "ܡܐܡܪܟ ܡܬܘܪܓܡܐ",
  download: "ܐܚܬ ܐܝܟ PDF",
  preparing: "ܦܕܦ ܡܬܛܝܒ…",
  again: "ܡܐܡܪܐ ܚܕܬܐ",
  promiseTitle: "ܫܪܝܪ ܠܡܠܬܐ ܕܟܗܢܐ",
  promiseBody:
    "ܬܘܪܓܡܐ ܢܩܦ ܠܡܐܡܪܐ ܡܠܐ ܒܡܠܐ. ܛܟܣܐ܇ ܩܠܐ ܘܦܘܣܩܐ ܕܟܬܒܐ ܩܕܝܫܐ ܦܐܫܝܢ. ܠܐ ܡܬܟܢܫ ܘܠܐ ܡܫܬܒܩ ܡܕܡ܇ ܘܦܬܓܡܐ ܦܫܝܛܐ ܒܟܬܒܐ ܕܠܫܢܟ.",
  trust: "ܦܐܬܟ ܠܐ ܫܒܩ ܠܡܦܐܬܢܟ. ܒܠܚܘܕ ܟܬܒܐ ܕܐܬܩܪܝ ܐܙܠ ܠܬܘܪܓܡܐ.",
  designedBy: "ܐܬܬܨܝܪ ܒܝܕ:",
  pdfCredit: "ܐܬܥܒܕ ܒܝܕ Joshua",
  scriptLabel: "ܟܬܒܐ",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "ܒܠܚܘܕ .docx ܘ .pdf.",
  errorSize: "ܦܐܬܐ ܪܒܐ ܝܬܝܪ (ܥܕܡܐ ܠ 20 MB).",
  errorEmpty: "ܟܬܒܐ ܠܐ ܐܫܬܟܚ. ܦܕܦ ܣܩܝܢܐ ܠܝܬ ܒܗ ܫܟܒܐ ܕܟܬܒܐ.",
  errorRead: "ܦܐܬܐ ܠܐ ܐܬܩܪܝ.",
  errorAi: "ܬܘܪܓܡܐ ܠܐ ܐܬܥܒܕ. ܢܣܐ ܬܘܒ.",
  errorUnavailable: "ܬܘܪܓܡܐ ܠܐ ܐܝܬ ܗܫܐ.",
  errorLong: "ܡܐܡܪܐ ܐܪܝܟ ܝܬܝܪ. ܦܠܘܓܝܗܝ.",
  errorPdf: "ܦܕܦ ܠܐ ܐܬܥܒܕ. ܛܒܘܥ ܐܝܟ PDF.",
  printFallback: "ܛܒܘܥ ܐܘ ܚܘܝ ܐܝܟ PDF",
  langLabel: "ܠܫܢܐ",
  changedLang: "ܓܒܝܬ ܠܫܢܐ ܐܚܪܢܐ. ܬܪܓܡ ܬܘܒ ܕܬܩܒܠ ܡܐܡܪܐ ܒܗܢܐ ܟܬܒܐ.",
  closeMenu: "ܣܟܘܪ ܓܒܝܬ ܠܫܢܐ",
};

const fa: Copy = {
  tagline: "کلام به زبان خودت",
  heroAlt: "سه صلیب در نور غروب",
  epigraph: "در آغاز کلمه بود.",
  epigraphRef: "یوحنا ۱:۱",
  welcomeTitle: "کلام، نزدیک در زبان خودت",
  welcomeLead:
    "یک موعظه بارگذاری کن. LumenVerbi آن را تقریباً واژه‌به‌واژه به زبان مادری و خط تو ترجمه می‌کند — وفادار به واعظ، طبیعی برای خواندن، بدون حذف.",
  cta: "موعظه‌ات را ترجمه کن",
  reassurance: ["تقریباً واژه‌به‌واژه", "چیزی حذف نمی‌شود", "خط خودت"],
  howTitle: "چگونه کار می‌کند",
  steps: [
    {
      title: "زبانت را انتخاب کن",
      body: "تمام صفحه و PDF از خطی که انتخاب می‌کنی پیروی می‌کنند.",
    },
    {
      title: "موعظه را بارگذاری کن",
      body: "فایل Word یا PDF متنی را اینجا رها کن، یا برای انتخاب کلیک کن.",
    },
    {
      title: "بخوان و دانلود کن",
      body: "ترجمه بی‌درنگ ظاهر می‌شود، آمادهٔ خواندن و ذخیره به‌صورت PDF تمیز.",
    },
  ],
  chooseTitle: "موعظه را به کدام زبان می‌خواهی بخوانی؟",
  dropTitle: "موعظه‌ات را اینجا رها کن",
  dropOr: "یا برای مرور کلیک کن",
  dropNote: "Word (.docx) و PDF متنی. صفحه‌های اسکن‌شده لایهٔ متن ندارند و خوانده نمی‌شوند.",
  reading: "در حال خواندن پرونده…",
  fileReady: "پرونده آماده است",
  words: "واژه",
  remove: "حذف",
  sourcePreview: "متن اصلی",
  translate: "موعظه‌ات را ترجمه کن",
  translating: "موعظه در حال ترجمه است…",
  part: "بخش {n} از {m}",
  resultKicker: "ترجمه",
  resultTitle: "موعظهٔ ترجمه‌شدهٔ تو",
  download: "دانلود به صورت PDF",
  preparing: "PDF در حال آماده‌سازی است…",
  again: "موعظهٔ تازه",
  promiseTitle: "وفادار به واعظ",
  promiseBody:
    "ترجمه تا حد ممکن واژه‌به‌واژه از موعظه پیروی می‌کند. ساختار، لحن و ارجاع‌های کتاب‌مقدس می‌مانند. چیزی خلاصه یا حذف نمی‌شود و جمله‌ها در خط زبان تو طبیعی می‌مانند.",
  trust: "پرونده از مرورگر خارج نمی‌شود. فقط متن استخراج‌شده برای ترجمه فرستاده می‌شود.",
  designedBy: "طراحی شده توسط:",
  pdfCredit: "امکان‌پذیر شده توسط Joshua",
  scriptLabel: "خط",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "فقط ‎.docx و ‎.pdf پذیرفته می‌شود.",
  errorSize: "این پرونده خیلی بزرگ است (حداکثر ۲۰ مگابایت).",
  errorEmpty: "تقریباً متنی پیدا نشد. PDF اسکن‌شده لایهٔ متن ندارد.",
  errorRead: "پرونده خوانده نشد.",
  errorAi: "ترجمه انجام نشد. دوباره تلاش کن.",
  errorUnavailable: "ترجمه فعلاً در دسترس نیست.",
  errorLong: "این موعظه برای یک‌بار ترجمه خیلی بلند است. آن را بخش‌بخش کن.",
  errorPdf: "PDF ساخته نشد. از چاپ برای ذخیره استفاده کن.",
  printFallback: "چاپ یا ذخیره به صورت PDF",
  langLabel: "زبان",
  changedLang: "زبان دیگری انتخاب کردی. برای موعظه در این خط دوباره ترجمه کن.",
  closeMenu: "بستن انتخاب زبان",
};

const ti: Copy = {
  tagline: "ቃል ብቋንቋኻ",
  heroAlt: "ሰለስተ መስቀል ኣብ ብርሃን ምሸት",
  epigraph: "ብመጀመርታ ቃል ነበረ።",
  epigraphRef: "ዮሃንስ 1፥1",
  welcomeTitle: "ቃል፡ ብቋንቋኻ ቀረባ",
  welcomeLead:
    "ስብከት ኣድልዩ። LumenVerbi ነቲ ስብከት ዳርጋ ቃል ብቃል ናብ መበቆላዊ ቋንቋኻን ፊደልን ይተርግሞ — ንመልእኽቲ ናይቲ ሰባኪ ዝተኣመነ፣ ንምንባብ ዝለመደ፣ ከይተረፈ።",
  cta: "ስብከትካ ተርጉም",
  reassurance: ["ዳርጋ ቃል ብቃል", "ዝኾነ ኣይተረፈን", "ናይ ኣታ ፊደል"],
  howTitle: "ከመይ ይሰርሕ",
  steps: [
    {
      title: "ቋንቋኻ ምረጽ",
      body: "እታ ገጽን እቲ PDFን ነቲ ፊደል ዝመረጽካዮ ይስዕቡ።",
    },
    {
      title: "ስብከት ኣድልዩ",
      body: "Word ወይ ጽሑፍ PDF ናብዚ ጎተት፣ ወይ ንምምራጽ ጠውቕ።",
    },
    {
      title: "ኣንብብን ኣውርድን",
      body: "ትርጉም ብቐጥታ ይረአ፣ ንምንባብን ከም ጽሩይ PDF ንምዕቃብን ድሉው።",
    },
  ],
  chooseTitle: "ነቲ ስብከት ብኣየናይ ቋንቋ ክትነብቦ ትደሊ؟",
  dropTitle: "ስብከትካ ናብዚ ጎተት",
  dropOr: "ወይ ንምድላይ ጠውቕ",
  dropNote: "Word (.docx) ከምኡ’ውን ጽሑፍ ዘለዎ PDF። ዝተቐረጸ ገጻት ጽሑፍ የብሎምን ኣይንበቡን።",
  reading: "ፋይል ይንበብ ኣሎ…",
  fileReady: "ፋይል ድሉው እዩ",
  words: "ቃላት",
  remove: "ኣልግስ",
  sourcePreview: "መበቆላዊ ጽሑፍ",
  translate: "ስብከትካ ተርጉም",
  translating: "ስብከት ይትርጎም ኣሎ…",
  part: "ክፋል {n} ካብ {m}",
  resultKicker: "ትርጉም",
  resultTitle: "ዝተተርጎመ ስብከትካ",
  download: "ከም PDF ኣውርድ",
  preparing: "PDF ይዳሎ ኣሎ…",
  again: "ሓድሽ ስብከት",
  promiseTitle: "ንሰባኪ ዝተኣመነ",
  promiseBody:
    "እቲ ትርጉም ነቲ ስብከት ብዝኣኸለ መጠን ቃል ብቃል ይስዕብ። ቅርጺ፣ ድምጺ ከምኡ’ውን መጽሓፍ ቅዱስ መወከሲታት ይተርፉ። ዝኾነ ኣይጽማቕን ኣይተርፍን፣ ሓረጋት ድማ ብፊደል ቋንቋኻ ተፈጥሮኣዊ ይኾና።",
  trust: "ፋይልካ ካብቲ መዳሰሲ ኣይወጽእን። ናብ ትርጉም ዝኸይድ ጽሑፍ ጥራይ እዩ።",
  designedBy: "ዝተነድፈ ብ:",
  pdfCredit: "ብ Joshua ዝተዳለወ",
  scriptLabel: "ፊደል",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: ".docx ከምኡ’ውን .pdf ጥራይ እዩ ዝድገፍ።",
  errorSize: "እዚ ፋይል ዝዓበየ እዩ (እንተበዝሐ 20 MB)።",
  errorEmpty: "ጽሑፍ ኣይተረኽበን። ዝተቐረጸ PDF ጽሑፍ የብሉን።",
  errorRead: "ፋይል ክንበብ ኣይከኣለን።",
  errorAi: "ትርጉም ኣይተዓወተን። ደጊምካ ፈትን።",
  errorUnavailable: "ትርጉም ሕጂ ኣይርከብን።",
  errorLong: "እዚ ስብከት ንሓደ ግዜ ክንዝያዱ ነዊሕ እዩ። ኣካፍልዎ።",
  errorPdf: "PDF ክዳሎ ኣይከኣለን። ብምሕታም ኣቐምጦ።",
  printFallback: "ሕተም ወይ ከም PDF ኣቐምጥ",
  langLabel: "ቋንቋ",
  changedLang: "ካልእ ቋንቋ መሪጽካ። ነቲ ስብከት በዚ ፊደል ንምርካብ ደጊምካ ተርጉም።",
  closeMenu: "ምርጫ ቋንቋ ዕጸው",
};

const uk: Copy = {
  tagline: "Слово твоєю мовою",
  heroAlt: "Три хрести у вечірньому світлі",
  epigraph: "Споконвіку було Слово.",
  epigraphRef: "Івана 1:1",
  welcomeTitle: "Слово близько — твоєю мовою",
  welcomeLead:
    "Завантаж проповідь. LumenVerbi перекладає її майже дослівно твоєю рідною мовою та письмом — вірно проповіднику, природно для читання, нічого не пропущено.",
  cta: "Переклади свою проповідь",
  reassurance: ["Майже дослівно", "Нічого не пропущено", "Твоє письмо"],
  howTitle: "Як це працює",
  steps: [
    {
      title: "Обери мову",
      body: "Уся сторінка і PDF ідуть за письмом, яке ти обрав.",
    },
    {
      title: "Завантаж проповідь",
      body: "Перетягни сюди Word або текстовий PDF, або натисни, щоб вибрати файл.",
    },
    {
      title: "Читай і завантажуй",
      body: "Переклад з’являється одразу — його можна читати й зберегти як акуратний PDF.",
    },
  ],
  chooseTitle: "Якою мовою ти хочеш читати проповідь?",
  dropTitle: "Перетягни проповідь сюди",
  dropOr: "або натисни, щоб обрати",
  dropNote: "Word (.docx) і PDF із текстом. Скановані сторінки не мають текстового шару і не читаються.",
  reading: "Файл читається…",
  fileReady: "Файл готовий",
  words: "слів",
  remove: "Прибрати",
  sourcePreview: "Вихідний текст",
  translate: "Переклади свою проповідь",
  translating: "Проповідь перекладається…",
  part: "Частина {n} з {m}",
  resultKicker: "Переклад",
  resultTitle: "Твоя перекладена проповідь",
  download: "Завантажити як PDF",
  preparing: "PDF готується…",
  again: "Нова проповідь",
  promiseTitle: "Вірно проповіднику",
  promiseBody:
    "Переклад іде за проповіддю якомога дослівніше. Структура, тон і біблійні посилання лишаються. Нічого не скорочується і не пропускається, а речення природні письмом твоєї мови.",
  trust: "Файл не залишає браузер. На переклад іде лише зчитаний текст.",
  designedBy: "Розроблено:",
  pdfCredit: "Створено за підтримки Joshua",
  scriptLabel: "Письмо",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "Підтримуються лише .docx і .pdf.",
  errorSize: "Файл завеликий (щонайбільше 20 МБ).",
  errorEmpty: "Тексту майже немає. Сканований PDF не має текстового шару.",
  errorRead: "Файл не вдалося прочитати.",
  errorAi: "Переклад не вдався. Спробуй ще раз.",
  errorUnavailable: "Переклад зараз недоступний.",
  errorLong: "Ця проповідь задовга для одного перекладу. Розділи її.",
  errorPdf: "PDF не вдалося створити. Збережи його через друк.",
  printFallback: "Друкувати або зберегти як PDF",
  langLabel: "Мова",
  changedLang: "Ти обрав іншу мову. Переклади знову, щоб отримати проповідь цим письмом.",
  closeMenu: "Закрити вибір мови",
};

const tr: Copy = {
  tagline: "Söz kendi dilinde",
  heroAlt: "Akşam ışığında üç haç",
  epigraph: "Başlangıçta Söz vardı.",
  epigraphRef: "Yuhanna 1:1",
  welcomeTitle: "Söz, kendi dilinde yakın",
  welcomeLead:
    "Bir vaaz yükle. LumenVerbi onu neredeyse sözcüğü sözcüğüne ana diline ve yazına çevirir — vaize sadık, okuması doğal, hiçbir şey atlanmaz.",
  cta: "Vaazını çevir",
  reassurance: ["Neredeyse sözcüğü sözcüğüne", "Hiçbir şey atlanmaz", "Senin yazın"],
  howTitle: "Nasıl çalışır",
  steps: [
    {
      title: "Dilini seç",
      body: "Sayfanın tamamı ve PDF, seçtiğin yazıyı izler.",
    },
    {
      title: "Vaazı yükle",
      body: "Bir Word dosyasını veya metin PDF’ini buraya bırak ya da seçmek için tıkla.",
    },
    {
      title: "Oku ve indir",
      body: "Çeviri hemen görünür; okunmaya ve temiz bir PDF olarak saklanmaya hazırdır.",
    },
  ],
  chooseTitle: "Vaazı hangi dilde okumak istiyorsun?",
  dropTitle: "Vaazını buraya bırak",
  dropOr: "veya göz atmak için tıkla",
  dropNote: "Word (.docx) ve metin tabanlı PDF. Taranmış sayfalarda metin katmanı yoktur, okunamazlar.",
  reading: "Dosya okunuyor…",
  fileReady: "Dosya hazır",
  words: "sözcük",
  remove: "Kaldır",
  sourcePreview: "Kaynak metin",
  translate: "Vaazını çevir",
  translating: "Vaaz çevriliyor…",
  part: "Bölüm {n} / {m}",
  resultKicker: "Çeviri",
  resultTitle: "Çevrilmiş vaazın",
  download: "PDF olarak indir",
  preparing: "PDF hazırlanıyor…",
  again: "Yeni vaaz",
  promiseTitle: "Vaize sadık",
  promiseBody:
    "Çeviri vaazı olabildiğince birebir izler. Düzen, üslup ve Kutsal Kitap atıfları durur. Hiçbir şey özetlenmez ya da atılmaz; cümleler dilinin yazısında doğal kalır.",
  trust: "Dosyan tarayıcıdan çıkmaz. Çeviriye yalnızca okunan metin gider.",
  designedBy: "Tasarım:",
  pdfCredit: "Joshua sayesinde mümkün oldu",
  scriptLabel: "Yazı",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "Yalnızca .docx ve .pdf desteklenir.",
  errorSize: "Bu dosya çok büyük (en fazla 20 MB).",
  errorEmpty: "Neredeyse hiç metin yok. Taranmış bir PDF’in metin katmanı yoktur.",
  errorRead: "Dosya okunamadı.",
  errorAi: "Çeviri olmadı. Yeniden dene.",
  errorUnavailable: "Çeviri şu anda kullanılamıyor.",
  errorLong: "Bu vaaz tek seferde çevrilemeyecek kadar uzun. Parçalara böl.",
  errorPdf: "PDF oluşturulamadı. Yazdırarak kaydet.",
  printFallback: "Yazdır veya PDF olarak kaydet",
  langLabel: "Dil",
  changedLang: "Başka bir dil seçtin. Vaazı bu yazıda almak için yeniden çevir.",
  closeMenu: "Dil menüsünü kapat",
};

const ur: Copy = {
  tagline: "آپ کی اپنی زبان میں کلام",
  heroAlt: "شام کی روشنی میں تین صلیب",
  epigraph: "ابتدا میں کلام تھا۔",
  epigraphRef: "یوحنا ۱:۱",
  welcomeTitle: "کلام، آپ کی زبان میں قریب",
  welcomeLead:
    "ایک واعظ اپ لوڈ کریں۔ LumenVerbi اسے تقریباً لفظ بہ لفظ آپ کی مادری زبان اور رسم الخط میں ترجمہ کرتا ہے — واعظ کے وفادار، پڑھنے میں قدرتی، کچھ چھوڑے بغیر۔",
  cta: "اپنا واعظ ترجمہ کریں",
  reassurance: ["تقریباً لفظ بہ لفظ", "کچھ نہیں چھوٹا", "آپ کا رسم الخط"],
  howTitle: "یہ کیسے کام کرتا ہے",
  steps: [
    {
      title: "اپنی زبان چنیں",
      body: "سارا صفحہ اور PDF اسی رسم الخط کی پیروی کرتے ہیں جو آپ چنتے ہیں۔",
    },
    {
      title: "واعظ اپ لوڈ کریں",
      body: "Word یا متن والی PDF یہاں چھوڑیں، یا فائل چننے کے لیے کلک کریں۔",
    },
    {
      title: "پڑھیں اور ڈاؤن لوڈ کریں",
      body: "ترجمہ فوراً ظاہر ہوتا ہے، پڑھنے اور صاف PDF کے طور پر محفوظ کرنے کے لیے تیار۔",
    },
  ],
  chooseTitle: "آپ واعظ کس زبان میں پڑھنا چاہتے ہیں؟",
  dropTitle: "اپنا واعظ یہاں چھوڑیں",
  dropOr: "یا براؤز کرنے کے لیے کلک کریں",
  dropNote:
    "Word (.docx) اور متن والی PDF۔ اسکین شدہ صفحات میں متن کی تہہ نہیں ہوتی اور وہ نہیں پڑھے جا سکتے۔",
  reading: "فائل پڑھی جا رہی ہے…",
  fileReady: "فائل تیار",
  words: "الفاظ",
  remove: "ہٹائیں",
  sourcePreview: "اصل متن",
  translate: "اپنا واعظ ترجمہ کریں",
  translating: "واعظ ترجمہ ہو رہا ہے…",
  part: "حصہ {n} از {m}",
  resultKicker: "ترجمہ",
  resultTitle: "آپ کا ترجمہ شدہ واعظ",
  download: "PDF کے طور پر ڈاؤن لوڈ",
  preparing: "PDF تیار ہو رہی ہے…",
  again: "نیا واعظ",
  promiseTitle: "واعظ کے وفادار",
  promiseBody:
    "ترجمہ واعظ کی حتی الامکان لفظی پیروی کرتا ہے۔ ساخت، لہجہ اور کتاب مقدس کے حوالے قائم رہتے ہیں۔ کچھ خلاصہ یا چھوڑا نہیں جاتا، اور جملے آپ کی زبان کے رسم الخط میں قدرتی رہتے ہیں۔",
  trust: "آپ کی فائل براؤزر سے باہر نہیں جاتی۔ صرف نکالا گیا متن ترجمہ کے لیے جاتا ہے۔",
  designedBy: "ڈیزائن:",
  pdfCredit: "Joshua کی بدولت ممکن ہوا",
  scriptLabel: "رسم الخط",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "صرف .docx اور .pdf تعاون یافتہ ہیں۔",
  errorSize: "یہ فائل بہت بڑی ہے (زیادہ سے زیادہ 20 MB)۔",
  errorEmpty: "تقریباً کوئی متن نہیں ملا۔ اسکین شدہ PDF میں متن کی تہہ نہیں ہوتی۔",
  errorRead: "فائل نہیں پڑھی جا سکی۔",
  errorAi: "ترجمہ نہیں ہو سکا۔ دوبارہ کوشش کریں۔",
  errorUnavailable: "ترجمہ اس وقت دستیاب نہیں۔",
  errorLong: "یہ واعظ ایک بار میں ترجمہ کے لیے بہت لمبا ہے۔ اسے حصوں میں بانٹیں۔",
  errorPdf: "PDF نہیں بن سکی۔ پرنٹ سے محفوظ کریں۔",
  printFallback: "پرنٹ کریں یا PDF کے طور پر محفوظ کریں",
  langLabel: "زبان",
  changedLang: "آپ نے دوسری زبان چنی۔ اس رسم الخط میں واعظ کے لیے دوبارہ ترجمہ کریں۔",
  closeMenu: "زبان کا مینو بند کریں",
};

const sw: Copy = {
  tagline: "Neno katika lugha yako",
  heroAlt: "Misalaba mitatu katika mwanga wa jioni",
  epigraph: "Hapo mwanzo kulikuwako Neno.",
  epigraphRef: "Yohana 1:1",
  welcomeTitle: "Neno, karibu katika lugha yako",
  welcomeLead:
    "Pakia hubiri. LumenVerbi hulitafsiri karibu neno kwa neno katika lugha yako ya asili na maandishi yake — mwaminifu kwa mhubiri, rahisi kusoma, bila kuacha chochote.",
  cta: "Tafsiri hubiri lako",
  reassurance: ["Karibu neno kwa neno", "Hakuna kilichoachwa", "Maandishi yako"],
  howTitle: "Inavyofanya kazi",
  steps: [
    {
      title: "Chagua lugha yako",
      body: "Ukurasa wote na PDF hufuata maandishi unayochagua.",
    },
    {
      title: "Pakia hubiri",
      body: "Buruta faili ya Word au PDF yenye maandishi hapa, au bofya kuchagua.",
    },
    {
      title: "Soma na pakua",
      body: "Tafsiri inaonekana mara moja, tayari kusomwa na kuhifadhiwa kama PDF safi.",
    },
  ],
  chooseTitle: "Unataka kusoma hubiri kwa lugha gani?",
  dropTitle: "Buruta hubiri lako hapa",
  dropOr: "au bofya kuvinjari",
  dropNote:
    "Word (.docx) na PDF yenye maandishi. Kurasa zilizochanganuliwa hazina safu ya maandishi na haziwezi kusomwa.",
  reading: "Faili inasomwa…",
  fileReady: "Faili iko tayari",
  words: "maneno",
  remove: "Ondoa",
  sourcePreview: "Maandishi asilia",
  translate: "Tafsiri hubiri lako",
  translating: "Hubiri linatafsiriwa…",
  part: "Sehemu {n} kati ya {m}",
  resultKicker: "Tafsiri",
  resultTitle: "Hubiri lako lililotafsiriwa",
  download: "Pakua kama PDF",
  preparing: "PDF inaandaliwa…",
  again: "Hubiri jipya",
  promiseTitle: "Mwaminifu kwa mhubiri",
  promiseBody:
    "Tafsiri hufuata hubiri kwa uaminifu kadiri inavyowezekana. Muundo, sauti na marejeo ya Maandiko yanabaki. Hakuna kinachofupishwa wala kuachwa, na sentensi hubaki za asili katika maandishi ya lugha yako.",
  trust: "Faili yako haiondoki kwenye kivinjari. Ni maandishi yaliyotolewa pekee yanayotumwa kwa tafsiri.",
  designedBy: "Imebuniwa na:",
  pdfCredit: "Imewezekana kwa Joshua",
  scriptLabel: "Maandishi",
  cyrillic: "Ћирилица",
  latin: "Latinica",
  estrangelo: "ܐܣܛܪܢܓܠܐ",
  serto: "ܣܪܛܐ",
  errorType: "Ni .docx na .pdf pekee zinazokubaliwa.",
  errorSize: "Faili hii ni kubwa mno (kiwango cha juu MB 20).",
  errorEmpty: "Hatukupata karibu maandishi yoyote. PDF iliyochanganuliwa haina safu ya maandishi.",
  errorRead: "Faili haikuweza kusomwa.",
  errorAi: "Tafsiri haikufaulu. Jaribu tena.",
  errorUnavailable: "Tafsiri haipatikani kwa sasa.",
  errorLong: "Hubiri hili ni refu mno kwa mara moja. Ligawanye vipande.",
  errorPdf: "PDF haikuweza kutengenezwa. Ihifadhi kwa kuchapisha.",
  printFallback: "Chapisha au hifadhi kama PDF",
  langLabel: "Lugha",
  changedLang: "Umechagua lugha nyingine. Tafsiri tena ili upate hubiri katika maandishi haya.",
  closeMenu: "Funga menyu ya lugha",
};

const byLang: Record<Lang, Copy> = {
  nl,
  en,
  sw,
  sr,
  ar,
  syr,
  fa,
  ur,
  ti,
  uk,
  tr,
};

export const LANGUAGES: readonly { id: Lang; endonym: string; latin: string }[] = [
  { id: "nl", endonym: "Nederlands", latin: "Dutch" },
  { id: "en", endonym: "English", latin: "English" },
  { id: "sw", endonym: "Kiswahili", latin: "Swahili" },
  { id: "sr", endonym: "Српски", latin: "Serbian" },
  { id: "ar", endonym: "العربية", latin: "Arabic" },
  { id: "syr", endonym: "ܣܘܪܝܝܐ", latin: "Syriac" },
  { id: "fa", endonym: "فارسی", latin: "Farsi" },
  { id: "ur", endonym: "اردو", latin: "Pakistaans (Urdu)" },
  { id: "ti", endonym: "ትግርኛ", latin: "Tigrinya" },
  { id: "uk", endonym: "Українська", latin: "Ukrainian" },
  { id: "tr", endonym: "Türkçe", latin: "Turkish" },
];

export function getCopy(lang: Lang, srScript: SrScript): Copy {
  if (lang === "sr" && srScript === "latn") return srLat;
  return byLang[lang];
}

export function endonym(lang: Lang, srScript: SrScript): string {
  if (lang === "sr" && srScript === "latn") return "Srpski";
  return LANGUAGES.find((item) => item.id === lang)?.endonym ?? "Nederlands";
}

export function direction(lang: Lang): "rtl" | "ltr" {
  return lang === "ar" || lang === "syr" || lang === "fa" || lang === "ur" ? "rtl" : "ltr";
}

export function scriptKey(lang: Lang, srScript: SrScript, syrStyle: SyrStyle): ScriptKey {
  if (lang === "sr") return srScript === "latn" ? "latn" : "cyrl";
  if (lang === "uk") return "cyrl";
  if (lang === "ar" || lang === "fa") return "arab";
  if (lang === "ur") return "nast";
  if (lang === "syr") return syrStyle === "serto" ? "serto" : "syrc";
  if (lang === "ti") return "ethi";
  return "latn";
}

export function htmlLang(lang: Lang, srScript: SrScript): string {
  if (lang === "sr") return srScript === "latn" ? "sr-Latn" : "sr-Cyrl";
  return lang;
}

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}

const TARGET_NAME: Record<Lang, string> = {
  nl: "Nederlands",
  en: "Engels",
  sw: "Swahili (Kiswahili)",
  sr: "Servisch",
  ar: "Arabisch",
  syr: "Syrisch (Aramees)",
  fa: "Perzisch (Farsi)",
  ur: "Urdu (Pakistaans)",
  ti: "Tigrinya",
  uk: "Oekraïens",
  tr: "Turks",
};

export function translationBrief(
  lang: Lang,
  srScript: SrScript,
): { targetName: string; scriptNote: string } {
  const targetName = TARGET_NAME[lang];
  let scriptNote = "Schrijf in het Latijnse schrift.";
  if (lang === "nl") scriptNote = "Schrijf in natuurlijk Nederlands, Latijns schrift.";
  if (lang === "en") {
    scriptNote =
      "De uitvoer is uitsluitend natuurlijk Engels in het Latijnse schrift. Geen Nederlands in het antwoord.";
  }
  if (lang === "tr") {
    scriptNote =
      "De uitvoer is uitsluitend natuurlijk Turks in het Latijnse schrift. Geen Nederlands in het antwoord.";
  }
  if (lang === "sr" && srScript === "cyrl") {
    scriptNote =
      "De uitvoer is uitsluitend Servisch in het cyrillische schrift (ћирилица). Geen Latijns schrift en geen Nederlands.";
  }
  if (lang === "sr" && srScript === "latn") {
    scriptNote =
      "De uitvoer is uitsluitend Servisch in het Latijnse schrift (latinica / srpski). Geen cyrillisch en geen Nederlands.";
  }
  if (lang === "uk") {
    scriptNote =
      "De uitvoer is uitsluitend Oekraïens in het cyrillische schrift. Geen Russisch en geen Nederlands.";
  }
  if (lang === "ar") {
    scriptNote =
      "De uitvoer is uitsluitend Modern Standaardarabisch in het Arabische schrift, van rechts naar links. Geen transliteratie en geen Nederlands.";
  }
  if (lang === "fa") {
    scriptNote =
      "De uitvoer is uitsluitend Perzisch (Farsi) in het Perzische schrift, met Perzische orthografie (پ چ ژ گ). Geen Arabische vertaling, geen transliteratie en geen Nederlands.";
  }
  if (lang === "ur") {
    scriptNote =
      "De uitvoer is uitsluitend Urdu, de nationale taal van Pakistan, in het Nastaliq-schrift, van rechts naar links. Gebruik Urdu-orthografie (پ چ ژ گ ڑ ٹ ڈ ں ے). Geen Hindi, geen Arabisch, geen transliteratie en geen Nederlands.";
  }
  if (lang === "sw") {
    scriptNote =
      "De uitvoer is uitsluitend standaard-Swahili (Kiswahili sanifu) in het Latijnse schrift. Geen Engels en geen Nederlands in het antwoord.";
  }
  if (lang === "syr") {
    scriptNote =
      "De uitvoer is uitsluitend klassiek Syrisch (ܠܫܢܐ ܣܘܪܝܝܐ) in het Syrische Unicode-schrift. Geen Arabisch schrift, geen transliteratie en geen Nederlands.";
  }
  if (lang === "ti") {
    scriptNote =
      "De uitvoer is uitsluitend Tigrinya (ትግርኛ) in het Ge'ez-schrift. Geen Amhaars tenzij het origineel dat vraagt, geen Latijnse transliteratie en geen Nederlands.";
  }
  return { targetName, scriptNote };
}
