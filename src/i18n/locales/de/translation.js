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
    title: "Unser Tech Stack",
    subtitle: "Technologien hinter unserem Entwicklungsprozess",
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
      title: 'Benötigen Sie eine moderne und sichere Web-Lösung?',
      subtitle: 'Engagieren Sie einen Full-Stack-Entwickler, der sowohl Code als auch Cybersicherheit versteht',
      button: 'Mich engagieren'
    },
    blog: {
      title: 'Entdecken Sie die neuesten Erkenntnisse aus der Technologiewelt',
      subtitle: 'Sicherheit, Codierungsmuster, Freelance-Strategie & mehr',
      button: 'Mehr lesen'
    },
    projects: {
      title: 'Sehen Sie, wie Ideen zu Code werden',
      subtitle: 'Durchsuchen Sie Beispiel-Apps mit realer Implementierung',
      button: 'Projekte ansehen'
    },
    stack: {
      title: 'Werkzeuge des Handwerks',
      subtitle: 'Vom Backend zum Frontend - ich verwende die besten Tools für den Job',
      button: 'Tech Stack ansehen'
    },
    services: {
      title: 'Maßgeschneiderte digitale Dienstleistungen',
      subtitle: 'Von sicherem Code bis hin zu beeindruckender UI - ich baue Lösungen, die Bestand haben',
      button: 'Dienstleistungen entdecken'
    },
    about: {
      title: 'Wer ist Half Half Man?',
      subtitle: 'Ein Entwickler. Ein Schwimmer. Schöpfer, der lebt, was er codiert',
      button: 'Meine Geschichte lesen'
    }
  },
  testimonials: {
    title: 'Was unsere Kunden sagen',
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
      }
    }
  },
  about: {
    title: 'Über Half Half Man',
    subtitle: 'Half Half Man ist nicht nur eine Marke — es ist eine Denkweise.',
    blocks: {
      code: {
        title: 'Zweck im Programmieren',
        description: 'Jede geschriebene Codezeile hat einen Zweck. Wir glauben an die Schaffung von Lösungen, die nicht nur funktionieren, sondern auch einen bedeutenden Einfluss haben.'
      },
      athlete: {
        title: 'Athletische Disziplin',
        description: 'Die durch den Sport erlernte Disziplin überträgt sich direkt auf die Programmierpraxis. Präzision, Hingabe und kontinuierliche Verbesserung sind unsere Kernwerte.'
      },
      design: {
        title: 'Design-Funktionalität',
        description: 'Wir erstellen Designs, die sowohl ästhetisch ansprechend als auch hochfunktional sind und so die bestmögliche Benutzererfahrung gewährleisten.'
      },
      security: {
        title: 'Fokus auf Cybersicherheit',
        description: 'Sicherheit ist kein nachträglicher Gedanke, sondern ein grundlegender Aspekt jedes Projekts, das wir durchführen.'
      },
      communication: {
        title: 'Klare Kommunikation',
        description: 'Wir glauben an transparente und effektive Kommunikation während des gesamten Entwicklungsprozesses.'
      },
      brand: {
        title: 'Markenphilosophie',
        description: 'Half Half Man repräsentiert das Gleichgewicht zwischen technischer Expertise und kreativer Innovation.'
      }
    },
    meta: {
      title: 'Über uns - Half Half Man',
      description: 'Erfahren Sie mehr über den Ansatz von Half Half Man in Bezug auf Entwicklung, Sicherheit und Innovation.'
    }
  },
  services: {
    title: 'Dienstleistungen',
    subtitle: 'Umfassende Lösungen für moderne Herausforderungen',
    webDev: {
      title: 'Webentwicklung',
      description: 'Maßgeschneiderte Webanwendungen mit modernen Technologien und Best Practices.'
    },
    security: {
      title: 'Cybersicherheit',
      description: 'Robuste Sicherheitslösungen und Penetrationstest-Dienstleistungen.'
    },
    tools: {
      title: 'Tools & Automatisierung',
      description: 'Maßgeschneiderte Tools zur Optimierung von Arbeitsabläufen und Steigerung der Produktivität.'
    },
    maintenance: {
      title: 'Wartung',
      description: 'Laufende Unterstützung und Updates zur Gewährleistung von Leistung und Stabilität.'
    },
    performance: {
      title: 'Leistungsoptimierung',
      description: 'Beschleunigen Sie Ihre Apps und verbessern Sie die Benutzererfahrung durch Audits und Korrekturen.'
    },
    consulting: {
      title: 'Technische Beratung',
      description: 'Expertenberatung bei Entscheidungen zu Technologie-Stack und Architektur.'
    },
    services: [
      "Half Half Man bietet eine Reihe von Dienstleistungen, die Ihre digitale Reise stärken sollen.",
      "Von individueller Webentwicklung bis hin zu robuster Cybersicherheit – jede Lösung ist auf Ihre individuellen Bedürfnisse zugeschnitten.",
      "Unser Ansatz verbindet technische Exzellenz mit einem tiefen Verständnis Ihrer Geschäftsziele.",
      "Entdecken Sie, wie unsere Services Ihnen nachhaltige Ergebnisse bringen können."
    ]
  },
  projects: {
    title: 'Projekte',
    subtitle: 'Ausgewählte Arbeiten',
    viewAll: 'Alle Projekte ansehen',
    viewProject: 'Projekt ansehen',
    viewDetails: 'Details ansehen',
    featured: 'Ausgewähltes Projekt',
    projectNotFound: 'Projekt nicht gefunden.',
    backToProjects: '← Zurück zu Projekten',
    categories: {
      all: 'Alle',
      web: 'Webentwicklung',
      security: 'Sicherheit',
      mobile: 'Mobil'
    },
    meta: {
      title: 'Projekte - Half Half Man',
      description: 'Entdecken Sie ausgewählte Softwareprojekte und Fallstudien.'
    },
    detail: {
      technologiesUsed: 'Verwendete Technologien',
      keyFeatures: 'Hauptmerkmale',
      challenges: 'Herausforderungen',
      solutions: 'Lösungen',
      projectGallery: 'Projektgalerie',
      viewImage: 'Bild ansehen',
      closeImage: 'Bild schließen',
      previousImage: 'Vorheriges Bild',
      nextImage: 'Nächstes Bild',
      visitGithub: 'Auf GitHub ansehen',
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
        title: "Im Portfolio von Half Half Man",
        summary: "Eine sichere Full-Stack-Portfolio-Website, gebaut mit React, Tailwind und Sanity – optimiert für Klarheit, Geschwindigkeit und Kundenbindung.",
        description: "Eine umfassende Portfolio-Website, gebaut mit React und Tailwind CSS, mit flüssigen Animationen, Internationalisierung und einem virtuellen Assistenten.",
        features: [
          "Responsives Design mit modernem UI/UX",
          "Internationalisierungsunterstützung (i18n)",
          "Interaktive Animationen mit Framer Motion",
          "Virtueller Assistent integriert",
          "SEO-Optimierung",
          "Kontaktformular mit Formspree",
          "Calendly-Integration für Terminvereinbarungen"
        ],
        challenges: [
          "Implementierung flüssiger Seitenübergänge",
          "Verwaltung mehrerer Sprachübersetzungen",
          "Performance-Optimierung für verschiedene Geräte",
          "Integration mehrerer Drittanbieter-Services"
        ],
        solutions: [
          "Framer Motion für flüssige Animationen verwendet",
          "i18next für Übersetzungsmanagement implementiert",
          "Bilder und Code-Splitting optimiert",
          "Modulares Service-Integrationssystem erstellt"
        ]
      },
      welearngreek: {
        title: "Grammatik, Ingenieurkunst",
        summary: "Eine personalisierte Web-App zum Erlernen der griechischen Grammatik mit intuitiven Tools und informellem Lernen.",
        description: "Ein informelles Lernwerkzeug, das Schüler und Sprachbegeisterte beim natürlichen Erwerb der griechischen Grammatik unterstützt. Die Plattform umfasst Tools wie einen Nomen-Dekliniator, einen Verb-Konjugator, eine smarte Vokabelaufzeichnung und einen einzigartigen etymologischen Analysator für griechischstämmige Wörter in Fremdsprachen. Aktuell in aktiver Entwicklung. Ziel ist eine voll nutzbare App zur Unterstützung von Schülern und Lehrern im Griechisch- und ggf. weiteren Sprachunterricht.",
        features: [
          "Nomen-Dekliniator – generiert fallbasierte Nomenformen auf Griechisch.",
          "Verb-Konjugator – zeigt Konjugationen nach Zeit und Person.",
          "Individuelles Vokabel-Tool – speichert neue griechische Wörter wie ausgesprochen, mit Übersetzung in die Muttersprache",
          "Transparente Wörter-Engine – zeigt und erklärt griechischstämmige Wörter in verschiedenen Sprachen.",
          "Praxisorientiert – entwickelt, um echtes Lernen und Behalten durch Nutzerinteraktion zu fördern, nicht nur passives Lesen."
        ],
        challenges: [
          "Entwicklung eines pädagogisch fundierten, aber informellen und benutzerfreundlichen Tools.",
          "Umsetzung komplexer Sprachregeln (Deklinationen, Zeiten) über eine dynamische UI.",
          "Sicherstellung der Mehrsprachigkeit (zukünftig auf andere Sprachen skalierbar).",
          "Integration des Moduls Transparente Wörter (Schutz geistigen Eigentums)."
        ],
        solutions: [
          "Modularer Django-Backend, der jedes Tool als eigenen API-Service behandelt.",
          "React-Frontend für reaktive Interaktion und dynamische Grammatikdarstellung.",
          "PostgreSQL zur Verwaltung von Nutzerwortschatz und Regelwerken.",
          "Sichere Datenspeicherung und -abfrage implementiert",
          "Fortgeschrittene Regex und Datenmodelle für Verb-/Nomenmorphologie.",
          "Klares UX-Design für einfache Interaktion trotz grammatikalischer Komplexität."
        ]
      },
      secureaccess: {
        title: "OAuth-Flow entschlüsseln",
        summary: "Eine minimalistische Demo, die den OAuth 2.0-Authentifizierungsprozess vereinfacht.",
        description: "Eine umfassende Frontend-Simulation moderner Authentifizierungsabläufe mit dem OAuth 2.0-Protokoll. Das Projekt zeigt, wie sicherer Zugriff durch Token-Austausch, Weiterleitung und Benutzerautorisierung gewährt wird – ohne Drittanbieter. Es führt rollenbasierte Zugriffskontrolle (RBAC) ein und zeigt, wie Berechtigungslogik in einer Anwendung strukturiert und durchgesetzt wird. Klar und anpassbar gestaltet, dient dieses Showcase als Blaupause für sichere und skalierbare Login-Systeme, die Datenschutz und Systemintegrität priorisieren.",
        features: [
          "Sichere Google OAuth 2.0-Authentifizierung",
          "Client/Secret als Umgebungsvariablen gespeichert",
          "Getrennte Entwicklungs- und Produktionseinstellungen",
          "Sauberer, minimalistischer Login-Erfolg-Bildschirm",
          "Vollständig bereitgestellter und funktionaler Produktion-Endpunkt",
          "Vollständig autorisierte und getestete Redirect-URIs",
          "Verwendet SECURE_SSL_REDIRECT, ALLOWED_HOSTS und korrekten CSRF-Schutz"
        ],
        challenges: [
          "OAuth 401/400-Fehler durch: gelöschte oder nicht übereinstimmende ID, falsche oder fehlende Redirect-URIs, falsch formatierte .env, Umgebungsvariablen zwischen .env und Railway nicht synchronisiert",
          "Railway fügt automatisch Anführungszeichen in Variablen ein",
          "Fehlermeldungen zeigen im Produktivbetrieb nicht den vollen Kontext",
          "Vage AuthCanceled-Fehler von social-auth"
        ],
        solutions: [
          "GOOGLE_OAUTH2_CLIENT_ID und Secret sorgfältig zwischen GCP und .env abgeglichen",
          "Alle Redirect-URIs in der Google Cloud Console korrigiert",
          "json.loads() mit korrekt formatiertem JSON-String (nur doppelte Anführungszeichen) verwendet",
          "Umgebungsvariablen in Railway manuell im Raw Editor geprüft",
          "Nach Änderungen immer neuen Deploy ausgelöst statt auf implizite Updates zu vertrauen",
          "Tailwind für Klarheit und Kontrolle außen vor gelassen (klassisches HTML/CSS-Templating)",
          "Alle Antwortpfade über Railway-Logs für das finale Debugging geprüft"
        ]
      },
      bughunters: {
        title: "Die Jagd simulieren",
        summary: "Eine kontrollierte Umgebung, die reale Sicherheitsszenarien nachbildet – entwickelt, um Penetrationstests, Responsible Disclosure und ethisches Bug-Hunting zu demonstrieren.",
        description: "Eine kontrollierte Umgebung, die reale Sicherheitsszenarien nachbildet – entwickelt, um Penetrationstests, Responsible Disclosure und ethisches Bug-Hunting zu demonstrieren.",
        features: [
          "Simuliertes Nmap-Port-Scanning – emuliert Nmap-CLI-Ausgaben, um die Grundlagen der Netzwerkerkundung sicher zu demonstrieren.",
          "HTTP-Header-Inspektor – holt und zeigt Response-Header realer Websites, um Serververhalten und -konfiguration zu analysieren.",
          "Brute-Force-Simulation – demonstriert einen Wörterbuchangriff auf ein fiktives Ziel mit simulierten Anmeldeantworten – rein zu Lernzwecken.",
          "Exportierbare Berichte – alle Simulationen können als .txt-Dateien für Dokumentation oder Lernzwecke exportiert werden.",
          "Ethischer Hinweis enthalten – klare Hinweise im gesamten Tool betonen den Lerncharakter, mit Links zu Best Practices und ethischen Hacking-Richtlinien."
        ],
        challenges: [
          "Deployment-Plattform (Nixpacks) hat Django nicht automatisch erkannt, daher manuelle Bereitstellung mit eigenem Procfile, requirements.txt und runtime.txt.",
          "Django ORM erforderte Mock-Datenbankkonfigurationen, obwohl die App nicht persistent ist.",
          "Besondere Vorsicht, damit das Projekt nicht als echtes Angriffstool missverstanden oder missbraucht werden kann."
        ],
        solutions: [
          "Eigene Build-Pipeline für Railway-Deployment inkl. minimaler Django-Anforderungen hinzugefügt.",
          "Migrationen mit Mock-Schemas erfüllt, um Djangos Erwartungen zu erfüllen, ohne echte Daten zu speichern.",
          "Ethische Hinweise und Best-Practice-Links implementiert – das Toolkit ist eine kontrollierte Simulation, keine Exploit-Plattform."
        ]
      },
      webflow: {
        title: "Von Webflow zu Workflow",
        summary: "Ein No-Code-Projekt auf Webflow-Basis, komplett mit KI refaktoriert, um sauberen, semantischen Code zu erzeugen, versioniert auf GitHub und bereitgestellt via Netlify.",
        description: "Ein visuelles Konzept, gebaut in Webflow, dann zu produktionsreifem Code verfeinert. Mit KI-Refaktorierung via Cursor IDE wurde das exportierte Layout in eine saubere, skalierbare und zugängliche Codebasis verwandelt – verbindet No-Code-Speed mit Full-Code-Qualität.",
        features: [
          "KI-gestützte Code-Refaktorierung – wandelt Webflows exportiertes HTML/CSS in sauberen, semantischen, produktionsreifen Code um (GPT in Cursor IDE)",
          "Semantische HTML5-Struktur – ersetzt generisches div-basiertes Layout durch semantische Tags (section, main, article etc.) für Barrierefreiheit und SEO.",
          "Bereinigtes und optimiertes CSS – Stylesheets für bessere Lesbarkeit, Wartbarkeit und Konsistenz in Design-Tokens und Abständen refaktoriert.",
          "Conversion-optimierter Text – Hero-Abschnitte, CTAs und Microcopy neu formuliert für mehr Klarheit, Tonalität und Nutzerbindung",
          "Lokale Vorschau mit Python – lokale Vorschau mit Python",
          "Versionskontrolle via GitHub – alle Codeänderungen mit Commit-Historie, Branches und kollaborationsbereiter Einrichtung nachverfolgt.",
          "Schnelles Deployment via Netlify – finaler Build gehostet auf Netlify mit sofortigem Deployment von GitHub, CI-Workflows unterstützt."
        ],
        challenges: [
          "Webflow exportiert Code mit nicht-semantischem <div>-Nesting und Klassenballast.",
          "Statische Assets (Bilder, Fonts) sind bei lokaler Vorschau manchmal falsch zugeordnet",
          "Kein direkter HTML-Import zurück in Webflow möglich, daher kein Round-Tripping"
        ],
        solutions: [
          "HTML-Struktur mit GPT refaktoriert, um semantische Tags (section, main, article) zu verwenden",
          "CSS bereinigt und gruppiert für bessere Wartbarkeit und Lesbarkeit",
          "Headings und CTAs für überzeugendere, UX-getriebene Ansprache neu formuliert.",
          "Python genutzt, um statische Dateien lokal korrekt zuzuordnen",
          "Alle Änderungen via GitHub versioniert und nahtlos mit Netlify bereitgestellt"
        ]
      }
    },
    projects: [
      "Entdecken Sie eine kuratierte Auswahl an Projekten, die technisches Können und kreative Problemlösung zeigen.",
      "Jedes Projekt wird mit Sorgfalt, Fachwissen und Fokus auf reale Wirkung umgesetzt.",
      "Sehen Sie, wie aus Ideen durch durchdachtes Design und robuste Entwicklung Realität wird."
    ]
  },
  blog: {
    title: 'Blog',
    readMore: 'Weiterlesen',
    backToBlog: 'Zurück zum Blog',
    publishedOn: 'Veröffentlicht am',
    by: 'von',
    comments: {
      title: 'Kommentare',
      leave: 'Kommentar hinterlassen',
      name: 'Name',
      message: 'Nachricht',
      submit: 'Absenden',
      success: 'Kommentar erfolgreich gesendet',
      error: 'Fehler beim Senden des Kommentars'
    },
    share: {
      title: 'Diesen Beitrag teilen',
      twitter: 'Auf X (Twitter) teilen',
      facebook: 'Auf Facebook teilen',
      linkedin: 'Auf LinkedIn teilen',
      copyLink: 'Link kopieren',
      copied: 'Link kopiert!'
    },
    meta: {
      title: 'Blog - Half Half Man',
      description: 'Einblicke in Webentwicklung, Sicherheit und Technologie.'
    },
    blog: [
      "Jede geschriebene Zeile hat ihre Bedeutung.",
      "Im Blog teilt Half Half Man Gedanken, Lektionen und Geschichten aus dem Alltag des Entwickelns und Schaffens.",
      "Wenn Sie verstehen möchten, wie Half Half Man denkt, ist dies der ideale Ausgangspunkt.",
      "Tauchen Sie ein und entdecken Sie Perspektiven zu Technologie, Kreativität und Wachstum."
    ],
  },
  contact: {
    meta: {
      title: "Kontakt - Half Half Man",
      description: "Kontaktieren Sie uns oder vereinbaren Sie einen Anruf."
    },
    title: "Lassen Sie uns sprechen",
    calendly: {
      title: "30-Minuten-Gespräch vereinbaren"
    },
    form: {
      title: "Nachricht senden",
      name: {
        label: "Ihr Name",
        placeholder: "Geben Sie Ihren vollständigen Namen ein"
      },
      email: {
        label: "E-Mail-Adresse",
        placeholder: "sie@beispiel.de"
      },
      subject: {
        label: "Betreff",
        placeholder: "Thema oder Frage"
      },
      message: {
        label: "Nachricht",
        placeholder: "Schreiben Sie hier Ihre Nachricht..."
      },
      submit: "Nachricht senden",
      sending: "Wird gesendet...",
      success: "Nachricht erfolgreich gesendet!",
      error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
    },
    contact: [
      "Half Half Man freut sich auf ein Gespräch. Wenn Sie Kontakt aufnehmen möchten, können Sie eine Nachricht senden oder einen Anruf mit Half Half Man vereinbaren!"
    ]
  },
  common: {
    loading: 'Wird geladen...',
    error: 'Ein Fehler ist aufgetreten',
    notFound: 'Seite nicht gefunden',
    backHome: 'Zurück zur Startseite',
    viewLive: 'Live ansehen',
    viewCode: 'Code ansehen',
    next: 'Weiter',
    prev: 'Zurück',
    close: 'Schließen',
    scrollToExplore: 'Scrollen Sie zum Erkunden',
    logoAlt: 'Half Half Man Logo'
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
