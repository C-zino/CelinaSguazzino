const STORAGE_KEY = "portfolio-language";
const DEFAULT_LANGUAGE = "da";
const SUPPORTED_LANGUAGES = new Set(["da", "en"]);

const translations = {
  da: {
    nav: {
      about: "om",
      projects: "projekter",
      contact: "kontakt",
    },
    hero: {
      headlineLineOne: "Celina",
      headlineLineTwo: "Sguazzino",
      introduction:
        "Multimediedesigner med fokus på digitalt design, branding, fotografi, webudvikling og visuel storytelling.",
      location:
        "Baseret i Kongens Lyngby, Danmark · åben for samarbejder og freelanceprojekter.",
    },
    about: {
      heading: "om mig",
      intro: "Jeg er Celina, <br /> en multimediedesigner baseret i Kongens Lyngby, Danmark.",
      paragraphOne:
        "Jeg arbejder med digitalt design, UX/UI, branding, grafisk design, fotografi og webudvikling. Jeg nyder at føre idéer ud i livet gennem visuel storytelling, kreativ tænkning og teknologi. Uanset om jeg designer en visuel identitet, bygger en digital oplevelse, skaber billedmateriale eller skriver kode, søger jeg altid balancen mellem kreativitet, funktionalitet og et stærkt visuelt udtryk.",
      paragraphTwo:
        "Jeg er nysgerrig, detaljeorienteret og altid klar på at lære, eksperimentere og tage nye kreative udfordringer. Mens jeg fortsætter med at udvikle mine kompetencer, ser jeg frem til at samarbejde med mennesker og brands, der værdsætter gennemtænkt og engagerende design.",
    },
    projects: {
      heading: "udvalgte projekter",
      viewProject: "Se projekt",
    },
    contact: {
      heading: "kontakt",
      getInTouch: "Tag kontakt",
      location: "Lokation",
      denmark: "Kongens Lyngby, Danmark",
      localTime: "lokal tid",
    },
    footer: {
      getInTouch: "Tag kontakt",
      made: "Lavet i Kongens Lyngby, Danmark",
      location: "Kongens Lyngby, Danmark",
    },
    project: {
      label: "Projekt",
      backToProjects: "Tilbage til projekter",
      sectionMetaAds: "Meta Ads",
      sectionWebDesign: "Webdesign",
      sectionAiImagery: "AI-billeder",
      sectionPackaging: "Emballage (koncept)",
      sectionPackagingMenu: "Emballage",
      aboutProject: "Om projektet",
    },
  },
  en: {
    nav: {
      about: "about",
      projects: "projects",
      contact: "contact",
    },
    hero: {
      headlineLineOne: "Celina",
      headlineLineTwo: "Sguazzino",
      introduction:
        "Multimedia designer working across digital design, branding, photography, web development & visual storytelling.",
      location:
        "Based in Kongens Lyngby, Denmark · open for collaborations and freelance projects.",
    },
    about: {
      heading: "about me",
      intro: "I’m Celina, <br /> a multimedia designer based in Kongens Lyngby, Denmark.",
      paragraphOne:
        "I work across digital design, UX/UI, branding, graphic design, photography, and web development. I enjoy bringing ideas to life through a mix of visual storytelling, creative thinking, and technology. Whether I’m designing a visual identity, building a digital experience, creating imagery, or writing code, I’m always looking for the balance between creativity, functionality, and a strong visual expression.",
      paragraphTwo:
        "I’m curious, detail-oriented, and always eager to learn, experiment, and take on new creative challenges. As I continue developing my skills, I’m looking forward to collaborating with people and brands that value thoughtful and engaging design.",
    },
    projects: {
      heading: "selected projects",
      viewProject: "View project",
    },
    contact: {
      heading: "contact",
      getInTouch: "Get in touch",
      location: "Location",
      denmark: "Kongens Lyngby, Denmark",
      localTime: "local time",
    },
    footer: {
      getInTouch: "Get in touch",
      made: "Made in Kongens Lyngby, Denmark",
      location: "Kongens Lyngby, Denmark",
    },
    project: {
      label: "Project",
      backToProjects: "Back to projects",
      sectionMetaAds: "Meta Ads",
      sectionWebDesign: "Web Design",
      sectionAiImagery: "AI Imagery",
      sectionPackaging: "Packaging (conceptual)",
      sectionPackagingMenu: "Packaging",
      aboutProject: "About the project",
    },
  },
};

function getNestedValue(object, path) {
  return path.split(".").reduce((current, part) => current?.[part], object);
}

function resolveLanguage(input) {
  return SUPPORTED_LANGUAGES.has(input) ? input : DEFAULT_LANGUAGE;
}

function applyI18nText(language) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (!key) return;

    const value = getNestedValue(translations[language], key);
    if (typeof value !== "string") return;

    if (element.hasAttribute("data-i18n-html")) {
      element.innerHTML = value;
      return;
    }

    element.textContent = value;
  });

  document.querySelectorAll("[data-lang-field]").forEach((element) => {
    const value = element.getAttribute(`data-${language}`);
    if (value === null) return;
    element.textContent = value;
  });

  document.querySelectorAll("[data-lang-attr]").forEach((element) => {
    const targetAttribute = element.getAttribute("data-lang-attr");
    const value = element.getAttribute(`data-${language}`);

    if (!targetAttribute || value === null) return;
    element.setAttribute(targetAttribute, value);
  });
}

function updateLanguageToggle(language) {
  document.querySelectorAll("[data-language-option]").forEach((element) => {
    const option = element.getAttribute("data-language-option");
    const active = option === language;

    element.classList.toggle("font-semibold", active);
    element.classList.toggle("text-foreground", active);
    element.classList.toggle("text-muted-foreground", !active);
    element.classList.toggle("hover:text-primary", !active);
  });
}

function applyLanguage(language) {
  const nextLanguage = resolveLanguage(language);
  document.documentElement.lang = nextLanguage;
  document.documentElement.dataset.language = nextLanguage;
  localStorage.setItem(STORAGE_KEY, nextLanguage);

  applyI18nText(nextLanguage);
  updateLanguageToggle(nextLanguage);

  window.dispatchEvent(
    new CustomEvent("languagechange", {
      detail: { language: nextLanguage },
    }),
  );
}

function initLanguageToggle() {
  document.querySelectorAll("[data-language-option]").forEach((element) => {
    element.addEventListener("click", () => {
      const nextLanguage = element.getAttribute("data-language-option");
      applyLanguage(nextLanguage);
    });
  });
}

window.portfolioI18n = {
  getLanguage: () => resolveLanguage(document.documentElement.dataset.language),
  setLanguage: applyLanguage,
  getText: (key) => {
    const language = resolveLanguage(document.documentElement.dataset.language);
    return getNestedValue(translations[language], key);
  },
  formatLocalTime: (date) => {
    const language = resolveLanguage(document.documentElement.dataset.language);
    const locale = language === "da" ? "da-DK" : "en-US";
    const time = date.toLocaleTimeString(locale, {
      timeZone: "Europe/Copenhagen",
      hour: "numeric",
      minute: "2-digit",
      hour12: language !== "da",
    });
    const label = getNestedValue(translations[language], "contact.localTime");
    return `${time} ${label}`;
  },
};

const initialLanguage = DEFAULT_LANGUAGE;
document.documentElement.lang = initialLanguage;
document.documentElement.dataset.language = initialLanguage;
localStorage.setItem(STORAGE_KEY, initialLanguage);

const initializePageLanguage = () => {
  applyI18nText(initialLanguage);
  updateLanguageToggle(initialLanguage);
  initLanguageToggle();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePageLanguage);
} else {
  initializePageLanguage();
}
