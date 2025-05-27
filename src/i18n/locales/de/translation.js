const translation = {
  nav: {
    home: 'Startseite',
    about: 'Über mich',
    services: 'Dienstleistungen',
    techStack: 'Tech Stack',
    projects: 'Projekte',
    blog: 'Blog',
    contact: 'Kontakt',
    more: 'Mehr',
    toggleMenu: 'Menü umschalten',
    dropdown: {
      faq: 'FAQ',
      privacy: 'Datenschutzrichtlinie'
    }
  },
  hero: {
    title: 'Brücke zwischen Technologie und Innovation',
    subtitle: 'Full-Stack Entwickler & Sicherheitsspezialist',
    cta: 'Projekte ansehen'
  },
  techStack: {
    meta: {
      title: "Tech Stack - Half Half Man",
      description: "Entdecken Sie die Technologien und Tools, die wir für die Entwicklung hochleistungsfähiger Anwendungen verwenden.",
      categoryDescription: "Entdecken Sie Tools und Technologien im Zusammenhang mit {{category}}."
    },
    title: "Stack-Engineering",
    subtitle: "Zielgerichtete Tools. Präzise Umsetzung. Zukunftssichere Systeme.",
    seeFullStack: "Vollständigen Stack ansehen",
    backToTechStack: "Zurück zum Tech Stack",
    categoryNotFound: "Kategorie nicht gefunden.",
    categories: {
      code: {
        title: "Code-Entwicklung",
        description: "Präzise entwickelter Code. Durchdachte Architektur. Für Wachstum gebaut."
      },
      nocode: {
        title: "No-Code/Low-Code-Lösungen",
        description: "Leistung mit Zweck. Jedes Tool sorgfältig gewählt – jedes Ergebnis beabsichtigt."
      },
      security: {
        title: "Cybersicherheitspraktiken",
        description: "Sicherheit ist keine Schicht – sie ist in jede Codezeile eingebaut."
      },
      optimization: {
        title: "Optimierung & Wartung",
        description: "Leistung wird erwartet – nicht erbeten. Jedes System ist von Anfang an darauf ausgelegt."
      }
    },
    tools: {
      python: {
        name: "Python",
        description: "Eine leistungsstarke und vielseitige Programmiersprache."
      },
      django: {
        name: "Django",
        description: "Ein hochrangiges Python-Webframework für schnelle Entwicklung."
      },
      restApi: {
        name: "REST API",
        description: "Ein Architekturstil für den Aufbau skalierbarer Webdienste."
      },
      nodejs: {
        name: "Node.js",
        description: "Eine JavaScript-Laufzeitumgebung auf Basis der Chrome V8-Engine."
      },
      express: {
        name: "Express",
        description: "Ein minimalistisches und flexibles Node.js-Webanwendungsframework."
      },
      postgresql: {
        name: "PostgreSQL",
        description: "Ein leistungsstarkes, quelloffenes objektrelationales Datenbanksystem."
      },
      react: {
        name: "React",
        description: "Eine JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen."
      },
      nextjs: {
        name: "Next.js",
        description: "Ein React-Framework mit hybridem statischem und serverseitigem Rendering."
      },
      tailwind: {
        name: "Tailwind CSS",
        description: "Ein nutzenorientiertes CSS-Framework für schnelle UI-Entwicklung."
      },
      burpSuite: {
        name: "Burp Suite",
        description: "Ein leistungsstarkes Toolkit für Sicherheitstests von Webanwendungen."
      },
      metasploit: {
        name: "Metasploit",
        description: "Ein Framework für Penetrationstests zur Ausnutzung von Sicherheitslücken."
      },
      nmap: {
        name: "Nmap",
        description: "Ein Netzwerkscanner für Netzwerkerkundung und Sicherheitsaudits."
      },
      docker: {
        name: "Docker",
        description: "Eine Plattform zur Entwicklung, Auslieferung und Ausführung von Anwendungen in Containern."
      },
      kubernetes: {
        name: "Kubernetes",
        description: "Ein Open-Source-System zur Automatisierung der Bereitstellung und Verwaltung containerisierter Anwendungen."
      },
      git: {
        name: "Git",
        description: "Ein verteiltes Versionskontrollsystem zur Nachverfolgung von Codeänderungen."
      }
    },
    backendSystems: {
      name: "Backend-Systeme",
      description: "Saubere Logik, schnelle Performance – das Rückgrat sicherer, skalierbarer Anwendungen.\nTech: Python, Node.js, Express."
    },
    frontendEngineering: {
      name: "Frontend-Entwicklung",
      description: "Interaktive und intuitive UI-Entwicklung mit skalierbarer Komponentenarchitektur.\nTech: JavaScript, React, Tailwind, Vite"
    },
    apiIntegration: {
      name: "API & Integration",
      description: "Zuverlässige Kommunikation zwischen Systemen durch saubere, RESTful Endpunkte. \nTech: REST API, Axios, Postman"
    },
    databasesPersistence: {
      name: "Datenbanken & Persistenz",
      description: "Strukturierte Daten, optimierte Abfragen und zuverlässige Speicherung für wachsende Systeme. \nTech: PostgreSQL, MySQL, SQLite, Django ORM"
    },
    deploymentArchitecture: {
      name: "Deployment & Architektur",
      description: "Von lokalen Builds zu cloud-bereiten Systemen – bereitstellen, überwachen, skalieren.\nTech: Heroku, Netlify, Vercel, GitHub Actions"
    },
    architectureSystemsThinking: {
      name: "Architektur & Systemdenken",
      description: "Von der Grundstruktur bis zu sauberem Code – Lösungen werden skalierbar, wartbar und mit Langlebigkeit im Sinn entwickelt."
    },
    webflowMastery: {
      name: "Webflow-Beherrschung",
      description: "Pixelgenaue Oberflächen, responsives Design und flüssige Animationen – alles visuell gebaut, bereit für die Produktion im großen Maßstab."
    },
    xanoBackend: {
      name: "Xano Backend",
      description: "Ein leistungsstarkes No-Code-Backend, das sich nahtlos mit Webflow verbindet. Sichere APIs, Benutzer-Authentifizierung und Datenbanklogik – ohne serverseitigen Code zu schreiben."
    },
    wizedIntegrations: {
      name: "Wized-Integrationen",
      description: "Verbinden Sie Webflow mit dynamischen Daten über Wized. Erstellen Sie echte Apps mit bedingter Logik, Nutzerflüssen und Live-Interaktivität – alles ohne traditionelles Frontend-Framework."
    },
    penetrationTesting: {
      name: "Penetrationstests",
      description: "Angriffe simulieren, bevor sie passieren – Schwachstellen identifizieren, die Scanner übersehen, durch manuelle und automatisierte Tests aus Erfahrung."
    },
    securityConsulting: {
      name: "Sicherheitsberatung",
      description: "Sicherheit ist kein Produkt – es ist ein Prozess. Von der Risikoanalyse bis zur Compliance erhalten Sie Unterstützung für fundierte, resiliente Entscheidungen."
    },
    secureCodingAudits: {
      name: "Sicheres Coding & Audits",
      description: "Jede Codezeile wird unter dem Aspekt der Sicherheit geprüft. Statische Analyse, Best Practices und Audits beseitigen Schwachstellen, bevor sie zu Bedrohungen werden."
    },
    performanceOptimization: {
      name: "Performance-Optimierung",
      description: "Vom Frontend-Rendering bis zu Serverantwortzeiten – jede Millisekunde wird für reibungslose, unterbrechungsfreie Erlebnisse optimiert."
    },
    uptimeStability: {
      name: "Verfügbarkeit & Stabilität",
      description: "Wir überwachen, patchen und warten Systeme, damit Ihre Plattform Tag für Tag online und widerstandsfähig bleibt."
    },
    technicalLongevity: {
      name: "Technische Langlebigkeit",
      description: "Mit proaktiver Wartung und skalierbarer Architektur entwickelt sich Ihre Lösung mit Ihrem Unternehmen weiter – ohne Ausfälle."
    }
  },
  slider: {
    ideas: {
      title: 'Du brauchst eine moderne und sichere Web-Lösung?',
      subtitle: 'Ich bin Full-Stack-Entwickler mit Know-how in Code und Cybersicherheit',
      button: 'Kontaktiere mich'
    },
    blog: {
      title: 'Gedanken und Einblicke aus der Tech-Welt',
      subtitle: 'Sicherheit, Code-Patterns, Freelance-Strategien und mehr',
      button: 'Mehr erfahren'
    },
    projects: {
      title: 'So werden Ideen zu Code',
      subtitle: 'Schau dir Apps mit echter Umsetzung an',
      button: 'Projekte ansehen'
    },
    stack: {
      title: 'Meine Werkzeuge',
      subtitle: 'Vom Backend bis zum Frontend – ich nutze, was wirklich funktioniert',
      button: 'Zum Tech Stack'
    },
    services: {
      title: 'Digitale Services nach Maß',
      subtitle: 'Von sicherem Code bis zur durchdachten UI – ich baue Lösungen, die Bestand haben',
      button: 'Services entdecken'
    },
    about: {
      title: 'Wer ist Half Half Man?',
      subtitle: 'Entwickler. Schwimmer. Ein Macher, der lebt, was er codet.',
      button: 'Mehr über mich'
    }
  },
  testimonials: {
    title: 'Echte Erfahrungen. Konkrete Lösungen. Verlässliche Ergebnisse.',
    items: {
      elena: {
        name: 'Elena Papadopoulou',
        company: 'CEO @ Helix Digital',
        feedback: 'Die Zusammenarbeit mit Half Half Man war eine bahnbrechende Erfahrung für unser Unternehmen. Ihre Aufmerksamkeit für Details und der sicherheitsorientierte Ansatz gaben uns volles Vertrauen in unsere Webanwendung.'
      },
      thomas: {
        name: 'Thomas Schneider',
        company: 'CTO @ NovaTech Systems',
        feedback: 'Die Kombination aus technischer Expertise und kreativer Problemlösung machte Half Half Man besonders. Sie lieferten genau das, was wir brauchten, genau dann, wenn wir es brauchten.'
      },
      maria: {
        name: 'Maria Georgiou',
        company: 'Operations Lead @ Bluewave',
        feedback: 'Außergewöhnlicher Service und herausragende Ergebnisse. Half Half Man hat nicht nur unsere Erwartungen erfüllt, sondern sie in jeder Hinsicht übertroffen.'
      },
      giota: {
        name: 'dr.Giota Gatsi',
        company: 'Lehrerin @ Schule für Neugriechische Sprache an der Aristoteles-Universität Thessaloniki ; SEP @ Hellenische Offene Universität',
        feedback: `Ich hatte das Vergnügen, mit Half Half Man an der Gestaltung und Entwicklung der offiziellen Website für unsere Konferenz zusammenzuarbeiten – und das Ergebnis hat wirklich alle Erwartungen übertroffen.
Er hat das Projekt mit außergewöhnlicher Professionalität, Kreativität und einem tiefen Verständnis für die spezifischen Anforderungen einer akademischen Veranstaltung angegangen. Die Website hat den Geist und den Umfang der Konferenz perfekt eingefangen und den Teilnehmern ein reibungsloses, intuitives und ansprechendes Benutzererlebnis geboten.
Von der Veröffentlichung des Programms bis zur Verwaltung von Abstract-Einreichungen und Anmeldungen war die Plattform robust, sicher und bemerkenswert benutzerfreundlich.
Ich schätze seine Hingabe, Reaktionsfähigkeit und technische Kompetenz sehr und empfehle Half Half Man von ganzem Herzen jeder Institution oder Organisation, die eine erstklassige digitale Präsenz sucht.`
      },
      rastko: {
        name: 'Rastko Vićić',
        company: 'Freelance Framer Developer & Digital Marketing Specialist',
        feedback: `Ich habe aus erster Hand die Tiefe der Expertise hinter Half Half Man erlebt – von Full-Stack-Entwicklung und Systemdesign bis hin zu seinem akribischen Fokus auf Leistung und Sicherheit. Seine Fähigkeit, komplexe Anforderungen in einfache, skalierbare Lösungen zu übersetzen, ist selten. Er ist nicht nur ein Entwickler – er ist ein Ingenieur mit dem Auge eines Designers und der Denkweise eines Strategen.`
      }
    }
  },
  about: {
    title: 'Über Half Half Man',
    subtitle: 'Half Half Man ist nicht nur ein Name – es ist eine Haltung.',
    blocks: {
      code: {
        title: 'Zweck im Code',
        description: 'Jede Zeile, die ich schreibe, verfolgt einen klaren Zweck. Ich entwickle Lösungen, die nicht nur funktionieren, sondern etwas bewirken.'
      },
      athlete: {
        title: 'Disziplin eines Athleten',
        description: 'Was ich durch den Leistungssport gelernt habe – Ausdauer, Präzision und ständiges Verbessern – bringe ich direkt in meine Arbeit als Entwickler ein.'
      },
      design: {
        title: 'Design mit Funktion',
        description: 'Ich gestalte Oberflächen, die nicht nur gut aussehen, sondern sich auch klar und intuitiv bedienen lassen.'
      },
      security: {
        title: 'Sicherheit von Anfang an',
        description: 'Cybersicherheit ist kein Zusatz, sondern fester Bestandteil jedes Projekts, das ich umsetze.'
      },
      communication: {
        title: 'Klare Kommunikation',
        description: 'Ich lege Wert auf Offenheit, Verständlichkeit und regelmäßigen Austausch während des gesamten Prozesses.'
      },
      brand: {
        title: 'Meine Philosophie',
        description: 'Half Half Man steht für das Gleichgewicht zwischen technischer Präzision und kreativer Umsetzung.'
      }
    },
    meta: {
      title: 'Über mich – Half Half Man',
      description: 'Mein Ansatz für Entwicklung, Sicherheit und Innovation – klar, fokussiert und nachhaltig.'
    }
  },
  services: {
    title: 'Dienstleistungen',
    subtitle: 'Zielgerichtete Lösungen für moderne Herausforderungen',
    webDev: {
      title: 'Webentwicklung',
      description: 'Ich entwickle individuelle Webanwendungen mit modernen Technologien und bewährten Methoden.'
    },
    security: {
      title: 'Cybersicherheit',
      description: 'Ich biete durchdachte Sicherheitslösungen und führe Penetrationstests durch, um Systeme abzusichern.'
    },
    tools: {
      title: 'Tools & Automatisierung',
      description: 'Ich entwickle maßgeschneiderte Werkzeuge, die Arbeitsabläufe vereinfachen und die Effizienz steigern.'
    },
    maintenance: {
      title: 'Wartung',
      description: 'Ich betreue deine Anwendung langfristig – mit Updates, Support und Monitoring.'
    },
    performance: {
      title: 'Performance-Optimierung',
      description: 'Ich analysiere und verbessere die Ladezeiten und Nutzererfahrung deiner Anwendung gezielt.'
    },
    consulting: {
      title: 'Technische Beratung',
      description: 'Ich unterstütze dich bei Technologieentscheidungen und Architekturfragen – pragmatisch und lösungsorientiert.'
    },
    services: [
      "Ich biete individuelle digitale Services, die auf deine Anforderungen zugeschnitten sind.",
      "Jede Lösung basiert auf fundierter Erfahrung und technischer Klarheit.",
      "Mein Fokus liegt auf Sicherheit, Skalierbarkeit und langfristiger Wartbarkeit.",
      "Wenn du jemanden suchst, der nicht nur umsetzt, sondern mitdenkt – bin ich für dich da."
    ]
  },
  projects: {
    title: 'Digitale Lösungen im Einsatz',
    subtitle: 'Projekte, die Vision, Präzision und technisches Tiefenverständnis zeigen.', 
    viewAll: 'Alle Projekte anzeigen',
    viewProject: 'Projekt öffnen',
    viewDetails: 'Details zeigen',
    featured: 'Hervorgehobenes Projekt',
    projectNotFound: 'Projekt nicht gefunden.',
    backToProjects: '← Zurück zu meinen Projekten',
    categories: {
      all: 'Alle',
      web: 'Webentwicklung',
      security: 'Sicherheit',
      mobile: 'Mobile Apps'
    },
    meta: {
      title: 'Projekte – Half Half Man',
      description: 'Hier zeige ich dir, woran ich gearbeitet habe – echte Softwarelösungen mit Fokus auf Funktion und Sicherheit.'
    },
    detail: {
      technologiesUsed: 'Technologien, die ich verwendet habe',
      keyFeatures: 'Was dieses Projekt besonders macht',
      challenges: 'Was dabei schwierig war',
      solutions: 'Wie ich es gelöst habe',
      projectGallery: 'Projektgalerie',
      viewImage: 'Bild öffnen',
      closeImage: 'Bild schließen',
      previousImage: 'Vorheriges Bild',
      nextImage: 'Nächstes Bild',
      visitGithub: 'Code auf GitHub',
      visitDemo: 'Live-Demo'
    },
    items: {
      ecommerce: {
        title: 'Sichere E-Commerce-Plattform',
        description: 'Ein vollständiger Web-Shop mit Login, Admin, Zahlungen und mehr.',
        summary: 'Eine moderne E-Commerce-App, erstellt mit Django, React und PostgreSQL.',
        thumbnail: {
          alt: 'E-Commerce-Startseiten-Miniaturansicht'
        },
        features: [
          'Benutzerauthentifizierung und Profilverwaltung',
          'Produktverwaltung mit Kategorien und Tags',
          'Warenkorb- und Bestellsystem mit Checkout-Prozess',
          'Admin-Dashboard mit Analysen',
          'Responsive UI und Dark-Mode-Unterstützung'
        ],
        challenges: [
          'Synchronisierung der Warenkorb-Logik zwischen Frontend und Backend',
          'Handhabung komplexer Benutzerberechtigungen',
          'Entwurf eines flexiblen Datenbankschemas'
        ],
        solutions: [
          'Redux für State-Management und Django REST für API verwendet',
          'RBAC-Muster mit Django-Gruppen angewendet',
          'Normalisiertes DB-Design mit wiederverwendbaren Modellen'
        ]
      },
      portfolio: {
        title: 'Mein Portfolio',
        summary: 'Diese Seite ist mein digitales Zuhause – gebaut mit React, Tailwind und Sanity. Schnell, sicher, klar strukturiert.',
        description: 'Ich habe mein Portfolio als Full-Stack-Projekt umgesetzt: mit Internationalisierung, Animationen und einem persönlichen virtuellen Assistenten. Alles, was dich durch meine Arbeit führt – minimalistisch, direkt, funktional.',
        features: [
          'Responsives UI mit durchdachtem UX',
          'i18n – ich spreche deine Sprache',
          'Framer Motion für flüssige Übergänge',
          'Virtueller Assistent (Theo) integriert',
          'SEO-ready und schnell geladen',
          'Kontaktformular (Formspree)',
          'Terminbuchung direkt über Calendly'
        ],
        challenges: [
          'Seitenübergänge performant und sauber machen',
          'Sprachversionen wartbar halten',
          'Services Dritter elegant integrieren',
          'Performance auf allen Geräten optimieren'
        ],
        solutions: [
          'Framer Motion für Animationen eingesetzt',
          'i18next zur Übersetzungsverwaltung',
          'Optimierte Assets und Code Splitting',
          'Alle externen Services modular eingebunden'
        ]
      },
      welearngreek: {
        title: 'Griechisch verstehen, spielerisch',
        summary: 'Ich entwickle eine Web-App, die griechische Grammatik verständlich macht – durch intuitive Tools und echtes Lernen.',
        description: 'Diese App ist für alle, die Griechisch nicht büffeln, sondern erleben wollen. Ich habe Tools gebaut wie einen Nomen-Dekliniator, Verbkonjugator, Vokabeltrainer und ein Modul, das griechischstämmige Wörter in anderen Sprachen erklärt. Die Plattform wächst noch – aber das Ziel ist klar: nachhaltiges, freies Lernen für Schüler und Lehrer.',
        features: [
          'Nomen-Dekliniator – alle Fälle automatisch generiert',
          'Verb-Konjugator – übersichtlich nach Zeit und Person',
          'Vokabeltool – speichert neue Wörter mit Aussprache und Übersetzung',
          'Transparente Wörter – zeigt dir, wo Griechisch überall steckt',
          'Interaktiv und praxisnah – für echtes Verstehen statt passives Lesen'
        ],
        challenges: [
          'Komplexe Sprachregeln intuitiv umsetzen',
          'Lernplattform ohne Frontalunterrichtsgefühl',
          'Mehrsprachigkeit vorbereiten (zukünftige Skalierung)',
          'Eigene Engine schützen und korrekt lizenzieren'
        ],
        solutions: [
          'Modulares Django-Backend mit separaten API-Services',
          'React für dynamisches Frontend und reaktive Grammatikdarstellung',
          'PostgreSQL für Vokabelverwaltung und Regelwerke',
          'Sichere Datenspeicherung mit sauberem Zugriff',
          'Regex und Datenmodelle für Morphologie',
          'UX bewusst minimal – Fokus aufs Wesentliche'
        ]
      } ,
      secureaccess: {
        title: 'OAuth entschlüsseln',
        summary: 'Ich habe den OAuth-Flow so gebaut, dass ihn jeder versteht – clean, sicher, ohne Third-Party.',
        description: 'Dieses Projekt zeigt den vollständigen Ablauf von OAuth 2.0 – vom Token bis zur Weiterleitung. Ich habe RBAC integriert und dafür gesorgt, dass alles DSGVO-konform und verständlich ist. Ideal als Blueprint für eigene Authentifizierungssysteme.',
        features: [
          'Sichere Auth mit Google OAuth 2.0',
          'Client/Secret als Umgebungsvariablen gespeichert',
          'Trennung zwischen Dev- und Prod-Modus',
          'Minimalistischer Login-Success-Bildschirm',
          'Vollständig getesteter Production-Endpunkt',
          'Alle Redirects korrekt eingerichtet',
          'CSRF, SSL-Redirects und ALLOWED_HOSTS korrekt implementiert'
        ],
        challenges: [
          'Fehler durch falsche Redirects oder gelöschte Client-IDs',
          'Railway speichert Variablen manchmal fehlerhaft',
          'Unklare Fehlermeldungen im Produktivbetrieb',
          '„AuthCanceled“ von social-auth schwer zu debuggen'
        ],
        solutions: [
          'Alle Tokens exakt zwischen GCP, .env und Railway abgeglichen',
          'Redirects in GCP sauber hinterlegt',
          'JSON-Parsing mit korrektem Format sichergestellt',
          'Manual Check im Railway Raw Editor',
          'Erzwinge immer neuen Deploy nach Änderungen',
          'Verzicht auf Tailwind – klassisches HTML/CSS zur vollen Kontrolle',
          'Railway-Logs systematisch zur Fehlerdiagnose genutzt'
        ]
      },
      bughunters: {
        title: 'Ich simuliere den Angriff',
        summary: 'Ich habe eine sichere Umgebung geschaffen, um echte Hacking-Szenarien nachzubilden – lehrreich, ethisch, kontrolliert.',
        description: 'In dieser App zeige ich, wie Penetrationstests in der Praxis aussehen – mit simulierten Scans, Header-Analysen, Brute-Force-Abläufen und mehr. Alles ist dokumentierbar, exportierbar und klar als Lernwerkzeug gekennzeichnet.',
        features: [
          'Nmap-Port-Scan-Simulation mit echten CLI-Ausgaben',
          'Header-Inspector für Response-Analyse',
          'Brute-Force-Demo auf fiktivem Zielsystem',
          'Export aller Tests als .txt-Datei',
          'Ethik-Disclaimer und Verweise auf Best Practices'
        ],
        challenges: [
          'Railway/Nixpacks erkennt Django nicht automatisch',
          'ORM verlangt Schemas, obwohl keine persistente DB',
          'App darf nicht als echtes Hacking-Tool missverstanden werden'
        ],
        solutions: [
          'Custom Deployment mit Procfile, requirements.txt und runtime.txt',
          'Migrationen mit Mock-Schema gelöst',
          'Ethik-Hinweise sichtbar integriert – Tool dient dem Lernen, nicht dem Exploit'
        ]
      },
      webflow: {
        title: 'Von Webflow zu echtem Code',
        summary: 'Ich habe ein visuelles Layout in sauberen Code verwandelt – mit Hilfe von KI, klaren Strukturen und semantischem HTML.',
        description: 'Dieses Projekt war ein No-Code-Entwurf, den ich in Produktionscode umgewandelt habe. Mit GPT (Cursor IDE) habe ich die Struktur bereinigt, Styles refaktoriert und die Seite auf Netlify deployt. Schnell, sauber, nachvollziehbar.',
        features: [
          'Refaktorierung via GPT in Cursor IDE',
          'Semantisches HTML5 statt div-Nesting',
          'CSS optimiert für Lesbarkeit und Struktur',
          'Texte für Conversion überarbeitet',
          'Lokale Vorschau via Python',
          'Code versioniert via GitHub',
          'Deployment über Netlify mit CI-Workflow'
        ],
        challenges: [
          'Webflow exportiert unsauberen Code',
          'Assets lokal nicht immer korrekt zugeordnet',
          'Kein HTML-Reimport zurück in Webflow möglich'
        ],
        solutions: [
          'HTML mit GPT refaktoriert (section, main, article usw.)',
          'CSS bereinigt und gruppiert',
          'Headings und Texte neu geschrieben für UX und Klarheit',
          'Python genutzt für korrekte Asset-Zuordnung',
          'Versionskontrolle und Deployment automatisiert via GitHub & Netlify'
        ]
      }
    },
    projects: [
      'Hier findest du eine Auswahl meiner Projekte – alles von mir konzipiert, entwickelt und umgesetzt.',
      'Ich verbinde technisches Können mit klarem Design und praktischer Funktion.',
      'Jedes Projekt hat seine eigene Geschichte – und ich teile sie hier mit dir.'
    ]
  },
  blog: {
    title: 'Einblicke & Reflexionen',
    readMore: 'Mehr lesen',
    backToBlog: '← Zurück zum Blog',
    publishedOn: 'Veröffentlicht am',
    by: 'von',
    comments: {
      title: 'Kommentare',
      leave: 'Schreib einen Kommentar',
      name: 'Dein Name',
      message: 'Deine Nachricht',
      submit: 'Absenden',
      success: 'Dein Kommentar wurde erfolgreich gesendet.',
      error: 'Beim Senden ist ein Fehler aufgetreten.'
    },
    share: {
      title: 'Teile diesen Beitrag',
      twitter: 'Auf X (Twitter) teilen',
      facebook: 'Auf Facebook teilen',
      linkedin: 'Auf LinkedIn teilen',
      copyLink: 'Link kopieren',
      copied: 'Link kopiert!'
    },
    meta: {
      title: 'Blog – Half Half Man',
      description: 'Technik-Updates, zeitlose Ideen und durchdachte Perspektiven – vom Code bis zum Kontext.'
    },
    blog: [
      'Jede Zeile, die ich schreibe, hat ein Ziel.',
      'Im Blog teile ich meine Gedanken, Erfahrungen und Lehren aus meinem Alltag als Entwickler und Gestalter.',
      'Wenn du wissen willst, wie ich denke – hier ist der richtige Ort, um zu beginnen.',
      'Tauche ein in meine Sicht auf Technologie, Kreativität und persönliches Wachstum.'
    ]
  }, 
  
  contact: {
    meta: {
      title: 'Kontakt – Half Half Man',
      description: 'Schreib mir oder buche direkt ein Gespräch.'
    },
    title: 'Buche einen Anruf oder schick mir eine Nachricht – ich melde mich schnellstmöglich zurück.',
    calendly: {
      title: '30 Minuten – dein Termin mit mir'
    },
    form: {
      title: 'Schick mir eine Nachricht',
      name: {
        label: 'Dein Name',
        placeholder: 'Wie heißt du?'
      },
      email: {
        label: 'Deine E-Mail',
        placeholder: 'du@beispiel.de'
      },
      subject: {
        label: 'Betreff',
        placeholder: 'Worum geht\'s?'
      },
      message: {
        label: 'Nachricht',
        placeholder: 'Was möchtest du sagen?'
      },
      submit: 'Absenden',
      sending: 'Wird gesendet...',
      success: 'Deine Nachricht wurde erfolgreich gesendet!',
      error: 'Etwas ist schiefgelaufen. Versuch\'s bitte nochmal.'
    },
    contact: [
      'Ich freue mich auf dein Feedback. Schreib mir oder buche direkt ein Gespräch – ich melde mich persönlich bei dir.'
    ]
  }, 

  faq: {
    meta: {
      title: "FAQ - Half Half Man",
      description: "Finden Sie Antworten auf häufig gestellte Fragen zu unseren Dienstleistungen."
    },
    title: "Häufig gestellte Fragen",
    items: [
      {
        id: "services",
        question: "Welche Dienstleistungen bieten Sie an?",
        answer: "Wir bieten Full-Stack-Webentwicklung, Cybersicherheitsberatung und technische Wartungsdienste. Unsere Expertise umfasst React, Node.js, Python und Sicherheitstests."
      },
      {
        id: "process",
        question: "Wie sieht Ihr Entwicklungsprozess aus?",
        answer: "Wir folgen einer agilen Methodik mit regelmäßiger Kundenkommunikation. Jedes Projekt beginnt mit einer gründlichen Anforderungsanalyse, gefolgt von iterativer Entwicklung mit kontinuierlichem Feedback und Tests."
      },
      {
        id: "security",
        question: "Wie stellen Sie die Sicherheit in Projekten sicher?",
        answer: "Sicherheit ist von Anfang an integriert. Wir implementieren Best Practices wie OWASP-Richtlinien, regelmäßige Sicherheitsaudits und Penetrationstests, um Ihre Anwendung vor gängigen Schwachstellen zu schützen."
      },
      {
        id: "timeline",
        question: "Wie lange dauert ein typisches Projekt?",
        answer: "Projektzeitpläne variieren je nach Komplexität und Anforderungen. Eine typische Webanwendung benötigt 2-3 Monate von der Konzeption bis zum Launch, mit anschließender laufender Unterstützung und Wartung."
      },
      {
        id: "contact",
        question: "Wie kann ich Sie kontaktieren?",
        answer: "Sie können uns über das Kontaktformular auf unserer Website erreichen oder ein 30-minütiges Beratungsgespräch vereinbaren. Wir antworten in der Regel innerhalb von 24 Stunden an Werktagen."
      },
      {
        id: "maintenance",
        question: "Bieten Sie laufende Wartung an?",
        answer: "Ja, wir bieten umfassende Wartungspakete an, einschließlich regelmäßiger Updates, Sicherheitspatches, Leistungsüberwachung und technischem Support, um Ihre Anwendung reibungslos am Laufen zu halten."
      }
    ]
  },
  privacy: {
    meta: {
      title: "Datenschutzrichtlinie - Half Half Man",
      description: "Erfahren Sie, wie wir Ihre persönlichen Daten mit Sorgfalt und Verantwortung behandeln."
    },
    title: "Datenschutzrichtlinie",
    lastUpdated: "Zuletzt aktualisiert: {{date}}",
    sections: [
      {
        id: "data-collection",
        title: "1. Datenerhebung",
        content: "Wir erheben nur die minimal notwendigen personenbezogenen Daten für die Erbringung unserer Dienstleistungen. Dies umfasst Kontaktdaten, wenn Sie sich an uns wenden, technische Daten für die Website-Funktionalität und alle Informationen, die Sie freiwillig über unsere Formulare bereitstellen."
      },
      {
        id: "data-usage",
        title: "2. Datennutzung",
        content: "Ihre Daten werden ausschließlich für Kommunikationszwecke, Dienstleistungserbringung und Verbesserung Ihrer Erfahrung verwendet. Wir verkaufen oder teilen Ihre persönlichen Daten niemals mit Dritten ohne Ihre ausdrückliche Zustimmung."
      },
      {
        id: "data-protection",
        title: "3. Datenschutz",
        content: "Wir implementieren branchenübliche Sicherheitsmaßnahmen zum Schutz Ihrer Daten. Dies umfasst Verschlüsselung, sichere Server und regelmäßige Sicherheitsaudits zur Verhinderung unbefugter Zugriffe."
      },
      {
        id: "cookies",
        title: "4. Cookies & Tracking",
        content: "Unsere Website verwendet essentielle Cookies zur Gewährleistung der Grundfunktionalität. Analyse-Tools helfen uns zu verstehen, wie Besucher unsere Website nutzen, wobei wir stets Ihre Datenschutzeinstellungen respektieren."
      },
      {
        id: "your-rights",
        title: "5. Ihre Rechte",
        content: "Sie haben das Recht, auf Ihre persönlichen Daten zuzugreifen, sie zu ändern oder zu löschen. Kontaktieren Sie uns jederzeit, um diese Rechte auszuüben oder Fragen zum Datenschutz zu stellen."
      },
      {
        id: "updates",
        title: "6. Richtlinienaktualisierungen",
        content: "Diese Datenschutzrichtlinie kann regelmäßig aktualisiert werden, um Änderungen in unseren Praktiken oder rechtlichen Anforderungen widerzuspiegeln. Wir informieren Sie über wesentliche Änderungen."
      }
    ],
    footer: {
      overview: "Diese Richtlinie spiegelt unser Engagement für den Schutz Ihrer Privatsphäre und Transparenz bei der Datenverarbeitung wider.",
      contact: "Bei Fragen oder Bedenken zum Datenschutz kontaktieren Sie uns bitte über unser sicheres Kontaktformular."
    }
  },
  footer: {
    slogan: "Synthese von Code und Wasser",
    navigationTitle: "Navigation",
    connectTitle: "Verbinden",
    copyright: "Alle Rechte vorbehalten.",
    links: {
      home: "Startseite",
      techstack: "Tech Stack",
      projects: "Projekte",
      blog: "Blog",
      contact: "Kontakt",
      faq: "FAQ",
      privacypolicy: "Datenschutzrichtlinie"
    }
  },
  chatbot: {
    title: 'Theo',
    welcome: "Hallo! Mein Name ist Theo. Ich bin dein virtueller Assistent auf dieser Website. Wenn du Fragen zu Projekten, Dienstleistungen oder zur Arbeitsweise von Half Half Man hast – ich bin hier, um zu helfen. Kein Stress. Kein Lärm. Nur die Antworten, die du brauchst.",
    about: [
      "Half Half Man ist eine Philosophie des Gleichgewichts – zwischen Technologie und Menschlichkeit, Logik und Kreativität.",
      "Unsere Mission ist es, digitale Lösungen zu schaffen, die nicht nur einwandfrei funktionieren, sondern auch inspirieren und Menschen verbinden.",
      "Wir glauben, dass wahre Innovation entsteht, wenn Zweck auf Leidenschaft trifft, und jedes Projekt eine Gelegenheit ist, einen bedeutungsvollen Beitrag zu leisten.",
      "Vision bedeutet nicht nur, die Zukunft zu sehen, sondern sie zu gestalten – eine durchdachte Codezeile nach der anderen."
    ],
    services: 'Unsere Dienstleistungen werden mit Präzision und Zielstrebigkeit entwickelt. Von Webentwicklung bis Cybersicherheit – jede Lösung dient einer größeren Vision und höchster technischer Exzellenz.',
    projects: 'Unsere Projekte zeigen, wie technisches Know-how echten Mehrwert schafft. Jede Umsetzung vereint funktionale Exzellenz und durchdachte Zielorientierung.',
    options: {
      about: 'Erzähl mir mehr über Half Half Man',
      services: 'Welche Dienstleistungen bietet Half Half Man an?',
      blog: 'Kann ich einige Gedanken und Einblicke von Half Half Man lesen?',
      projects: 'Kannst du mir Beispiele für die Arbeit von Half Half Man zeigen?',
      contact: 'Ich möchte Kontakt aufnehmen – wie kann ich Half Half Man erreichen?',
      continue: 'Weiter',
      restart: 'Neu starten'
    },
    flow: {
      about: {
        0: 'Half Half Man ist eine Philosophie des Gleichgewichts – zwischen Technologie und Menschlichkeit, Logik und Kreativität.',
        1: 'Unsere Mission ist es, digitale Lösungen zu schaffen, die nicht nur einwandfrei funktionieren, sondern auch inspirieren und Menschen verbinden.',
        2: 'Wir glauben, dass wahre Innovation entsteht, wenn Zweck auf Leidenschaft trifft, und jedes Projekt eine Gelegenheit ist, einen bedeutungsvollen Beitrag zu leisten.',
        3: 'Vision bedeutet nicht nur, die Zukunft zu sehen, sondern sie zu gestalten – eine durchdachte Codezeile nach der anderen.'
      },
      services: {
        0: 'Half Half Man bietet eine Reihe von Dienstleistungen, die Ihre digitale Reise stärken.',
        1: 'Von individueller Webentwicklung bis zu robuster Cybersicherheit – jede Lösung ist auf Ihre Bedürfnisse zugeschnitten.',
        2: 'Unser Ansatz verbindet technische Exzellenz mit einem tiefen Verständnis Ihrer Geschäftsziele.',
        3: 'Entdecken Sie, wie unsere Services Ihnen nachhaltige Ergebnisse bringen können.'
      },
      blog: {
        0: 'Jede geschriebene Zeile hat ihre Bedeutung.',
        1: 'Im Blog teilt Half Half Man Gedanken, Lektionen und Geschichten aus dem Alltag des Entwickelns und Schaffens.',
        2: 'Wenn Sie verstehen möchten, wie Half Half Man denkt, ist dies der ideale Ausgangspunkt.',
        3: 'Tauchen Sie ein und entdecken Sie Perspektiven zu Technologie, Kreativität und Wachstum.'
      },
      projects: {
        0: 'Entdecken Sie eine kuratierte Auswahl an Projekten, die technisches Können und kreative Problemlösung zeigen.',
        1: 'Jedes Projekt wird mit Sorgfalt, Fachwissen und Fokus auf reale Wirkung umgesetzt.',
        2: 'Sehen Sie, wie aus Ideen durch durchdachtes Design und robuste Entwicklung Realität wird.'
      },
      contact: {
        0: 'Half Half Man freut sich auf ein Gespräch. Wenn Sie Kontakt aufnehmen möchten, können Sie eine Nachricht senden oder einen Anruf mit Half Half Man vereinbaren!'
      }
    }
  }
};

export default { translation };
