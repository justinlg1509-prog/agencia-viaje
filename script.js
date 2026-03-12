/**
 * Spain Around The World (SATW) - Main Script
 * Handles scroll animations and form calculations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Optional: stop observing once revealed
        // revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Scroll Progress Bar ---
  const progressBar = document.querySelector(".scroll-progress");
  window.addEventListener("scroll", () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });

  // --- Header Scroll Effect ---
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Form Calculations and Logic ---
  const adultos = document.getElementById("adultos");
  const ninos = document.getElementById("ninos");
  const total = document.getElementById("total-personas");
  const inicio = document.getElementById("fecha-inicio");
  const fin = document.getElementById("fecha-fin");

  if (adultos && ninos && total) {
    function actualizarTotal() {
      const a = parseInt(adultos.value || 0, 10);
      const n = parseInt(ninos.value || 0, 10);
      total.value = (isNaN(a) ? 0 : a) + (isNaN(n) ? 0 : n);
    }

    adultos.addEventListener("input", actualizarTotal);
    ninos.addEventListener("input", actualizarTotal);

    // Initial calculation
    actualizarTotal();
  }

  if (inicio && fin) {
    inicio.addEventListener("change", function () {
      if (inicio.value) {
        fin.min = inicio.value;
        if (fin.value && fin.value < inicio.value) {
          fin.value = inicio.value;
        }
      } else {
        fin.min = "";
      }
    });
  }

  // --- Smooth Scroll Restoration & Focus Fix ---
  try {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.addEventListener("load", function () {
      setTimeout(function () {
        if (location.hash) {
          history.replaceState(null, "", location.pathname + location.search);
        }
        window.scrollTo(0, 0);

        const activeEl = document.activeElement;
        if (
          activeEl &&
          (activeEl.tagName === "INPUT" ||
            activeEl.tagName === "TEXTAREA" ||
            activeEl.tagName === "SELECT")
        ) {
          activeEl.blur();
        }
      }, 60);
    });
  } catch (e) {
    console.warn("Scroll restoration fix failed", e);
  }
  // --- Splash Screen & Scroll Unlock ---
  const splash = document.getElementById("splash-screen");
  
  const unlockScroll = () => {
    if (splash) splash.classList.add("hidden");
    document.body.classList.remove("loading");
  };

  window.addEventListener("load", () => {
    if (splash) {
      setTimeout(unlockScroll, 2000);
    } else {
      unlockScroll();
    }
  });

  // --- Custom Cursor ---
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    const hoverElements = document.querySelectorAll(
      "a, button, .destination-card, .faq-question",
    );
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }

  // --- Multi-language (i18n) ---
  const translations = {
    es: {
      nav_home: "Inicio",
      nav_exp: "Experiencias",
      nav_blog: "Inspiración",
      nav_faq: "FAQ",
      nav_contact: "Contacto",
      hero_h1: "La Quintaesencia del Viaje por España",
      hero_p:
        "SATW diseña itinerarios artesanales que trascienden el turismo convencional. Conexión auténtica, lujo discreto y acceso exclusivo.",
      cta_plan: "Comience su Viaje",
      dest_title: "Destinos Seleccionados",
      dest_bcn_p:
        "Arquitectura modernista, calas secretas y la vanguardia culinaria de la Ciudad Condal.",
      dest_mad_p:
        "El latido aristocrático de Europa. Arte eterno y una sofisticación urbana sin igual.",
      dest_sev_p:
        "El alma andaluza revelada a través del arte mudéjar y vivencias privadas.",
      dest_bal_p:
        "Baleares: Oasis mediterráneos de aguas turquesas y retiros de máxima exclusividad.",
      dest_can_p:
        "Eterna primavera volcánica. Refugios de paz en los archipiélagos del Atlántico.",
      dest_ss_p:
        "La elegancia del Cantábrico y el epicentro de la alta gastronomía mundial.",
      serv_title: "Nuestra Expertise",
      serv_subtitle:
        "Servicios diseñados para el viajero global que busca lo extraordinario en cada rincón de la península.",
      serv_custom_h: "Itinerarios de Autor",
      serv_custom_p:
        "Piezas únicas diseñadas desde cero, combinando sus pasiones con nuestro conocimiento local profundo.",
      serv_local_h: "Anfitriones Exclusivos",
      serv_local_p:
        "Acceso a figuras clave de la cultura y la aristocracia local para una inmersión genuina.",
      serv_exec_h: "Conserjería Premium",
      serv_exec_p:
        "Gestión de reservas imposibles y acceso VIP a los eventos más solicitados de España.",
      serv_supp_h: "Soporte Ejecutivo 24/7",
      serv_supp_p:
        "Vigilancia constante de su bienestar. Una atención impecable en cada huso horario.",
      test_title: "Vivencias de Nuestros Huéspedes",
      test_1_text:
        "Una experiencia inolvidable en Barcelona. El itinerario fue perfecto y pudimos conocer lugares que jamás habríamos descubierto por nuestra cuenta.",
      test_1_author: "- María González",
      test_2_text:
        "El equipo de SATW hizo que nuestras vacaciones en las Canarias fueran mágicas. Atención impecable y detalles que marcaron la diferencia.",
      test_2_author: "- Carlos Ramírez",
      test_3_text:
        "Profesionales, atentos y conocedores. Nos ayudaron a planificar una ruta por Andalucía que superó todas nuestras expectativas.",
      test_3_author: "- Laura Martín",
      faq_title: "Consultas Frecuentes",
      faq_subtitle:
        "Detalles esenciales para una planificación sin fricciones.",
      faq_q1: "¿Qué incluyen los viajes a medida?",
      faq_a1:
        "Nuestros viajes incluyen itinerarios 100% personalizados, selección de hoteles boutique, transporte privado, guías locales exclusivos y asistencia 24/7 durante toda tu estancia.",
      faq_q2: "¿Con cuánta antelación debo reservar?",
      faq_a2:
        "Recomendamos un mínimo de 2 a 3 meses para garantizar la disponibilidad en los destinos más exclusivos, aunque podemos gestionar peticiones de última hora según disponibilidad.",
      faq_q3: "¿Ofrecéis servicios para grupos o empresas?",
      faq_a3:
        "Sí, diseñamos experiencias MICE, viajes de incentivo y retiros corporativos, así como viajes para grandes grupos familiares con logística dedicada.",
      news_h2: "El Manuscrito de SATW",
      news_p:
        "Reciba en su bandeja de entrada crónicas de viaje exclusivas e invitaciones a eventos privados.",
      news_placeholder: "Tu correo electrónico",
      news_btn: "Suscribirse",
      contact_h2: "Planifique su Próxima Aventura",
      form_name: "Nombre Completo",
      form_name_placeholder: "Su nombre experto...",
      form_email: "Email",
      form_email_placeholder: "ejemplo@correo.com",
      form_destination: "Destino de Interés",
      form_opt_default: "Selecciona un destino",
      form_opt_other: "Otro destino",
      form_adults: "Adultos",
      form_children: "Niños",
      form_total: "Total de Personas",
      form_start: "Fecha de inicio",
      form_end: "Fecha de fin",
      form_message: "Cuéntanos sobre tu viaje ideal",
      form_message_placeholder: "Deseo un viaje centrado en...",
      form_btn: "Solicitar Información",
      footer_tagline: "Llevando la esencia de España a cada rincón del mundo",
      footer_copy:
        "© 2026 SATW - Spain Around The World. Todos los derechos reservados.",
      label_gastronomy: "Gastronomía",
      label_lifestyle: "Lifestyle",
      label_culture: "Cultura",
      exp_cta_1: "Consultar Disponibilidad",
      exp_cta_2: "Reservar Experiencia",
      exp_cta_3: "Saber Más",
      blog_tag_1: "Editorial",
      blog_tag_2: "Astro-turismo",
      blog_tag_3: "Gastro",
      blog_read_1: "8 min de lectura",
      blog_read_2: "5 min de lectura",
      blog_read_3: "6 min de lectura",
      blog_link_1: "Sumergirse en la Historia",
      blog_link_2: "Ver Más",
      blog_link_3: "Explorar",
      exp_hero_h1: "Experiencias de Autor",
      exp_hero_p:
        "Momentos de colección diseñados para perdurar en el tiempo, en los escenarios más bellos de la península.",
      exp_title: "Colección Privada",
      exp_subtitle:
        "Una selección artesanal de vivencias que desafían lo ordinario.",
      blog_hero_h1: "Bitácora de Lujo",
      blog_hero_p:
        "Crónicas curadas, secretos de los locales y la verdadera esencia de la España contemporánea.",
      blog_title: "Inspiración de Autor",
      blog_subtitle:
        "Relatos exclusivos para aquellos que buscan el alma detrás de cada destino.",
      exp_card_1_h: "Catas Privadas de Cava & Terroir",
      exp_card_1_p:
        "Acceso exclusivo a bodegas históricas con sumilleres de prestigio y maridaje de autor entre viñedos milenarios.",
      exp_card_1_loc: "El Penedés, Cataluña",
      exp_card_2_h: "Charter de Yates: El Mediterráneo Secreto",
      exp_card_2_p:
        "Navegue por calas inaccesibles a bordo de embarcaciones de lujo, con servicio de chef privado y equipo de buceo profesional.",
      exp_card_2_loc: "Ibiza & Formentera",
      exp_card_3_h: "Flamenco en Palacios de la Nobleza",
      exp_card_3_p:
        "Una velada privada de arte puro en el corazón de un palacio sevillano del siglo XVIII, lejos del circuito comercial.",
      exp_card_3_loc: "Sevilla, Andalucía",
      blog_post_1_h:
        "El Madrid de los Austrias: Un Recorrido Privado entre Palacios",
      blog_post_1_p:
        "Descubra los rincones más aristocráticos de la capital española lejos de las multitudes, con acceso exclusivo a colecciones de arte privadas y jardines ocultos.",
      blog_post_2_h: "Noches bajo las estrellas en el Teide",
      blog_post_2_p:
        "Una experiencia de astroturismo exclusiva con cena de alta cocina a 2.000 metros de altura sobre el nivel del mar.",
      blog_post_3_h: "San Sebastián: La Meca de las Estrellas Michelin",
      blog_post_3_p:
        "Un viaje sensorial por la ciudad con más densidad de estrellas Michelin del mundo.",
      title_exp: "Experiencias Exclusivas | SATW - Spain Around The World",
      desc_exp:
        "Descubre nuestra colección de experiencias exclusivas en España: catas privadas, vuelos en globo, yates de lujo y más.",
      title_blog: "Inspiración | SATW - Spain Around The World",
      desc_blog:
        "Artículos exclusivos y secretos de viaje sobre los rincones más lujosos de España.",
      footer_h3: "SATW - Spain Around The World",
    },
    en: {
      nav_home: "Home",
      nav_exp: "Experiences",
      nav_blog: "Inspiration",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      hero_h1: "The Quintessence of Travel in Spain",
      hero_p:
        "SATW designs artisanal itineraries that transcend conventional tourism. Authentic connection, discreet luxury, and exclusive access.",
      cta_plan: "Begin Your Journey",
      dest_title: "Featured Destinations",
      dest_bcn_p:
        "Modernist architecture, secret coves, and the culinary avant-garde of the Count's City.",
      dest_mad_p:
        "Europe's aristocratic heartbeat. Eternal art and unparalleled urban sophistication.",
      dest_sev_p:
        "The Andalusian soul revealed through Mudejar art and private experiences.",
      dest_bal_p:
        "Balearics: Mediterranean oases of turquoise waters and retreats of maximum exclusivity.",
      dest_can_p:
        "Eternal volcanic spring. Peace havens in the Atlantic archipelagos.",
      dest_ss_p:
        "Cantabrian elegance and the epicenter of world haute gastronomy.",
      serv_title: "Our Expertise",
      serv_subtitle:
        "Services designed for the global traveler seeking the extraordinary in every corner of the peninsula.",
      serv_custom_h: "Signature Itineraries",
      serv_custom_p:
        "Unique pieces designed from scratch, blending your passions with our deep local knowledge.",
      serv_local_h: "Exclusive Hosts",
      serv_local_p:
        "Access to key figures in local culture and aristocracy for a genuine immersion.",
      serv_exec_h: "Premium Concierge",
      serv_exec_p:
        "Management of impossible reservations and VIP access to Spain's most sought-after events.",
      serv_supp_h: "24/7 Executive Support",
      serv_supp_p:
        "Constant monitoring of your well-being. Impeccable attention across every time zone.",
      test_title: "Guest Experiences",
      test_1_text:
        "An unforgettable experience in Barcelona. The itinerary was perfect and we got to know places we would never have discovered on our own.",
      test_1_author: "- María González",
      test_2_text:
        "The SATW team made our vacation in the Canary Islands magical. Impeccable attention and details that made a difference.",
      test_2_author: "- Carlos Ramírez",
      test_3_text:
        "Professional, attentive, and knowledgeable. They helped us plan a route through Andalusia that exceeded all our expectations.",
      test_3_author: "- Laura Martín",
      faq_title: "Frequent Inquiries",
      faq_subtitle: "Essential details for frictionless planning.",
      faq_q1: "What do custom trips include?",
      faq_a1:
        "Our trips include 100% personalized itineraries, selection of boutique hotels, private transport, exclusive local hosts, and 24/7 support throughout your stay.",
      faq_q2: "How far in advance should I book?",
      faq_a2:
        "We recommend a minimum of 2 to 3 months to guarantee availability in the most exclusive destinations, although we can handle last-minute requests depending on availability.",
      faq_q3: "Do you offer services for groups or companies?",
      faq_a3:
        "Yes, we design MICE experiences, incentive trips, and corporate retreats, as well as trips for large family groups with dedicated logistics.",
      news_h2: "The SATW Manuscript",
      news_p:
        "Receive exclusive travel chronicles and invitations to private events in your inbox.",
      news_placeholder: "Your email address",
      news_btn: "Subscribe",
      contact_h2: "Plan Your Next Adventure",
      form_name: "Full Name",
      form_name_placeholder: "Your expert name...",
      form_email: "Email",
      form_email_placeholder: "example@mail.com",
      form_destination: "Destination of Interest",
      form_opt_default: "Select a destination",
      form_opt_other: "Other destination",
      form_adults: "Adults",
      form_children: "Children",
      form_total: "Total People",
      form_start: "Start Date",
      form_end: "End Date",
      form_message: "Tell us about your ideal trip",
      form_message_placeholder: "I wish for a trip focused on...",
      form_btn: "Request Information",
      footer_tagline:
        "Bringing the essence of Spain to every corner of the world",
      footer_copy: "© 2026 SATW - Spain Around The World. All rights reserved.",
      label_gastronomy: "Gastronomy",
      label_lifestyle: "Lifestyle",
      label_culture: "Culture",
      exp_cta_1: "Check Availability",
      exp_cta_2: "Book Experience",
      exp_cta_3: "Learn More",
      blog_tag_1: "Editorial",
      blog_tag_2: "Astro-tourism",
      blog_tag_3: "Gastro",
      blog_read_1: "8 min read",
      blog_read_2: "5 min read",
      blog_read_3: "6 min read",
      blog_link_1: "Immerse in History",
      blog_link_2: "View More",
      blog_link_3: "Explore",
      exp_hero_h1: "Signature Experiences",
      exp_hero_p:
        "Collection moments designed to last in time, in the most beautiful settings of the peninsula.",
      exp_title: "Private Collection",
      exp_subtitle:
        "An artisanal selection of experiences that challenge the ordinary.",
      blog_hero_h1: "Luxury Chronicles",
      blog_hero_p:
        "Curated insights, local secrets, and the true essence of contemporary Spain.",
      blog_title: "Signature Inspiration",
      blog_subtitle:
        "Exclusive stories for those seeking the soul behind every destination.",
      exp_card_1_h: "Private Cava & Terroir Tastings",
      exp_card_1_p:
        "Exclusive access to historic wineries with prestigious sommeliers and signature pairings among millenary vineyards.",
      exp_card_1_loc: "Penedés, Catalonia",
      exp_card_2_h: "Yacht Charter: The Secret Mediterranean",
      exp_card_2_p:
        "Sail through inaccessible coves on luxury vessels, with private chef service and professional diving equipment.",
      exp_card_2_loc: "Ibiza & Formentera",
      exp_card_3_h: "Flamenco in Noble Palaces",
      exp_card_3_p:
        "A private evening of pure art in the heart of an 18th-century Sevillian palace, far from the commercial circuit.",
      exp_card_3_loc: "Seville, Andalusia",
      blog_post_1_h: "Habsburg Madrid: A Private Journey through Palaces",
      blog_post_1_p:
        "Discover the most aristocratic corners of the Spanish capital far from the crowds, with exclusive access to private art collections and hidden gardens.",
      blog_post_2_h: "Nights Under the Stars in Teide",
      blog_post_2_p:
        "An exclusive astro-tourism experience with haute cuisine dinner at 2,000 meters above sea level.",
      blog_post_3_h: "San Sebastian: The Mecca of Michelin Stars",
      blog_post_3_p:
        "A sensory journey through the city with the highest density of Michelin stars in the world.",
      title_exp: "Exclusive Experiences | SATW - Spain Around The World",
      desc_exp:
        "Discover our collection of exclusive experiences in Spain: private tastings, balloon flights, luxury yachts, and more.",
      title_blog: "Inspiration | SATW - Spain Around The World",
      desc_blog:
        "Exclusive articles and travel secrets about the most luxurious corners of Spain.",
      footer_h3: "SATW - Spain Around The World",
    },
    fr: {
      nav_home: "Accueil",
      nav_exp: "Expériences",
      nav_blog: "Inspiration",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      hero_h1: "La Quintessence du Voyage en Espagne",
      hero_p:
        "SATW conçoit des itinéraires artisanaux qui transcendent le tourisme conventionnel. Connexion authentique, luxe discret et accès exclusif.",
      cta_plan: "Commencez Votre Voyage",
      dest_title: "Destinations Sélectionnées",
      dest_bcn_p:
        "Architecture moderniste, criques secrètes et avant-garde culinaire de la Cité Comtale.",
      dest_mad_p:
        "Le cœur aristocratique de l'Europe. Art éternel et sophistication urbaine sans pareille.",
      dest_sev_p:
        "L'âme andalouse révélée par l'art mudéjar et des expériences privées.",
      dest_bal_p:
        "Baléares : Oasis méditerranéennes aux eaux turquoises et retraites d'exclusivité absolue.",
      dest_can_p:
        "Printemps volcanique éternel. Havres de paix dans les archipels de l'Atlantique.",
      dest_ss_p:
        "L'élégance du Cantabrique et l'épicentre de la haute gastronomie mondiale.",
      serv_title: "Notre Expertise",
      serv_subtitle:
        "Services conçus pour le voyageur mondial en quête de l'extraordinaire dans chaque recoin de la péninsule.",
      serv_custom_h: "Itinéraires sur Mesure",
      serv_custom_p:
        "Des pièces uniques conçues de toutes pièces, mêlant vos passions à notre connaissance locale approfondie.",
      serv_local_h: "Hôtes Exclusifs",
      serv_local_p:
        "Accès à des figures clés de la culture et de l'aristocratie locales pour une immersion authentique.",
      serv_exec_h: "Conciergerie Premium",
      serv_exec_p:
        "Gestion de réservations impossibles et accès VIP aux événements les plus prisés d'Espagne.",
      serv_supp_h: "Support Exécutif 24/7",
      serv_supp_p:
        "Surveillance constante de votre bien-être. Une attention impeccable dans chaque fuseau horaire.",
      test_title: "Expériences de nos Hôtes",
      test_1_text:
        "Une expérience inoubliable à Barcelone. L'itinéraire était parfait et nous avons pu découvrir des endroits que nous n'aurions jamais découverts seuls.",
      test_1_author: "- María González",
      test_2_text:
        "L'équipe de SATW a rendu nos vacances aux îles Canaries magiques. Une attention impeccable et des détails qui ont fait la différence.",
      test_2_author: "- Carlos Ramírez",
      test_3_text:
        "Professionnels, attentifs et compétents. Ils nous ont aidés à planifier un itinéraire en Andalousie qui a dépassé toutes nos attentes.",
      test_3_author: "- Laura Martín",
      faq_title: "Questions Fréquentes",
      faq_subtitle: "Détails essentiels pour une planification sans friction.",
      faq_q1: "Que comprennent les voyages sur mesure ?",
      faq_a1:
        "Nos voyages comprennent des itinéraires 100 % personnalisés, une sélection d'hôtels de charme, un transport privé, des hôtes locaux exclusifs et une assistance 24h/24 et 7j/7 tout au long de votre séjour.",
      faq_q2: "Combien de temps à l'avance dois-je réserver ?",
      faq_a2:
        "Nous recommandons un minimum de 2 à 3 mois pour garantir la disponibilité dans les destinations les plus exclusives, bien que nous puissions gérer des demandes de dernière minute selon les disponibilités.",
      faq_q3:
        "Proposez-vous des services pour les groupes ou les entreprises ?",
      faq_a3:
        "Oui, nous concevons des expériences MICE, des voyages de motivation et des retraites d'entreprise, ainsi que des voyages pour de grands groupes familiaux avec une logistique dédiée.",
      news_h2: "Le Manuscrit de SATW",
      news_p:
        "Recevez dans votre boîte de réception des chroniques de voyage exclusives et des invitations à des événements privés.",
      news_placeholder: "Votre adresse e-mail",
      news_btn: "S'abonner",
      contact_h2: "Planifiez Votre Prochaine Aventure",
      form_name: "Nom Complet",
      form_name_placeholder: "Votre nom d'expert...",
      form_email: "Email",
      form_email_placeholder: "exemple@mail.com",
      form_destination: "Destination d'intérêt",
      form_opt_default: "Sélectionnez une destination",
      form_opt_other: "Autre destination",
      form_adults: "Adultes",
      form_children: "Enfants",
      form_total: "Total de personnes",
      form_start: "Date de début",
      form_end: "Date de fin",
      form_message: "Parlez-nous de votre voyage idéal",
      form_message_placeholder: "Je souhaite un voyage centré sur...",
      form_btn: "Demander des informations",
      footer_tagline: "Porter l'essence de l'Espagne aux quatre coins du monde",
      footer_copy:
        "© 2026 SATW - Spain Around The World. Tous droits réservés.",
      label_gastronomy: "Gastronomie",
      label_lifestyle: "Lifestyle",
      label_culture: "Culture",
      exp_cta_1: "Vérifier la disponibilité",
      exp_cta_2: "Réserver l'expérience",
      exp_cta_3: "En savoir plus",
      blog_tag_1: "Éditorial",
      blog_tag_2: "Astro-tourisme",
      blog_tag_3: "Gastro",
      blog_read_1: "8 min de lecture",
      blog_read_2: "5 min de lecture",
      blog_read_3: "6 min de lecture",
      blog_link_1: "S'immerger dans l'histoire",
      blog_link_2: "Voir plus",
      blog_link_3: "Explorer",
      exp_hero_h1: "Expériences Signature",
      exp_hero_p:
        "Des moments de collection conçus pour durer dans le temps, dans les plus beaux décors de la péninsule.",
      exp_title: "Collection Privée",
      exp_subtitle:
        "Une sélection artisanale d'expériences qui défient l'ordinaire.",
      blog_hero_h1: "Chroniques de Luxe",
      blog_hero_p:
        "Aperçus curatés, secrets locaux et véritable essence de l'Espagne contemporaine.",
      blog_title: "Inspiration Signature",
      blog_subtitle:
        "Des histoires exclusives pour ceux qui cherchent l'âme derrière chaque destination.",
      exp_card_1_h: "Dégustations Privées de Cava & Terroir",
      exp_card_1_p:
        "Accès exclusif à des caves historiques avec des sommeliers prestigieux et des accords signature parmi des vignobles millénaires.",
      exp_card_1_loc: "Le Penedés, Catalogne",
      exp_card_2_h: "Charter de Yachts : La Méditerranée Secrète",
      exp_card_2_p:
        "Naviguez dans des criques inaccessibles sur des navires de luxe, avec service de chef privé et équipement de plongée professionnel.",
      exp_card_2_loc: "Ibiza & Formentera",
      exp_card_3_h: "Flamenco dans les Palais de la Noblesse",
      exp_card_3_p:
        "Une soirée privée d'art pur au cœur d'un palais sévillan du XVIIIe siècle, loin du circuit commercial.",
      exp_card_3_loc: "Séville, Andalousie",
      blog_post_1_h:
        "Le Madrid des Habsbourg : Un Voyage Privé à travers les Palais",
      blog_post_1_p:
        "Découvrez les coins les plus aristocratiques de la capitale espagnole loin de la foule, avec un accès exclusif à des collections d'art privées et des jardins cachés.",
      blog_post_2_h: "Nuits Sous les Étoiles au Teide",
      blog_post_2_p:
        "Une expérience d'astrotourisme exclusive avec dîner de haute cuisine à 2 000 mètres d'altitude.",
      blog_post_3_h: "Saint-Sébastien : La Mecque des Étoiles Michelin",
      blog_post_3_p:
        "Un voyage sensoriel à travers la ville ayant la plus forte densité d'étoiles Michelin au monde.",
      title_exp: "Expériences Exclusives | SATW - Spain Around The World",
      desc_exp:
        "Découvrez notre collection d'expériences exclusives en Espagne : dégustations privées, vols en montgolfière, yachts de luxe et plus encore.",
      title_blog: "Inspiration | SATW - Spain Around The World",
      desc_blog:
        "Articles exclusifs et secrets de voyage sur les coins les plus luxueux de l'Espagne.",
      footer_h3: "SATW - Spain Around The World",
    },
    nl: {
      nav_home: "Home",
      nav_exp: "Ervaringen",
      nav_blog: "Inspiratie",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      hero_h1: "De Kwintessens van Reizen in Spanje",
      hero_p:
        "SATW ontwerpt ambachtelijke reisroutes die conventioneel toerisme overstijgen. Authentieke verbinding, discrete luxe en exclusieve toegang.",
      cta_plan: "Begin Uw Reis",
      dest_title: "Geselecteerde Bestemmingen",
      dest_bcn_p:
        "Modernistische architectuur, geheime baaien en de culinaire avant-garde van de Stad van de Graven.",
      dest_mad_p:
        "De aristocratische hartslag van Europa. Eeuwige kunst en ongeëvenaarde stedelijke verfijning.",
      dest_sev_p:
        "De Andalusische ziel onthuld door Mudejar-kunst en privé-ervaringen.",
      dest_bal_p:
        "Balearen: Mediterrane oases van turkoois water en retraites van maximale exclusiviteit.",
      dest_can_p:
        "Eeuwige vulkanische lente. Rustoorden in de Atlantische archipels.",
      dest_ss_p:
        "Cantabrische elegantie en het epicentrum van de wereldwijde haute gastronomie.",
      serv_title: "Onze Expertise",
      serv_subtitle:
        "Diensten ontworpen voor de wereldreiziger die het buitengewone zoekt in elke hoek van het schiereiland.",
      serv_custom_h: "Signatuur Reisroutes",
      serv_custom_p:
        "Unieke stukken die vanaf nul zijn ontworpen, waarbij uw passies worden gecombineerd met onze diepe lokale kennis.",
      serv_local_h: "Exclusieve Gastheren",
      serv_local_p:
        "Toegang tot sleutelfiguren uit de lokale cultuur en aristocratie voor een oprechte onderdompeling.",
      serv_exec_h: "Premium Conciërge",
      serv_exec_p:
        "Beheer van onmogelijke reserveringen en VIP-toegang tot de meest gewilde evenementen van Spanje.",
      serv_supp_h: "24/7 Executive Ondersteuning",
      serv_supp_p:
        "Constante monitoring van uw welzijn. Onberispelijke aandacht in elke tijdzone.",
      test_title: "Ervaringen van Onze Gasten",
      test_1_text:
        "Een onvergetelijke ervaring in Barcelona. De reisroute was perfect en we hebben plekken leren kennen die we op eigen houtje nooit zouden hebben ontdekt.",
      test_1_author: "- María González",
      test_2_text:
        "Het SATW-team maakte onze vakantie op de Canarische Eilanden magisch. Onberispelijke aandacht en details die het verschil maakten.",
      test_2_author: "- Carlos Ramírez",
      test_3_text:
        "Professioneel, attent en deskundig. Ze hielpen ons bij het plannen van een route door Andalusië die al onze verwachtingen overtrof.",
      test_3_author: "- Laura Martín",
      faq_title: "Veelgestelde Vragen",
      faq_subtitle: "Essentiële details voor een vlekkeloze planning.",
      faq_q1: "Wat omvatten reizen op maat?",
      faq_a1:
        "Onze reizen omvatten 100% gepersonaliseerde reisroutes, selectie van boetiekhotels, privévervoer, exclusieve lokale gidsen en 24/7 assistentie tijdens uw gehele verblijf.",
      faq_q2: "Hoe ver van tevoren moet ik boeken?",
      faq_a2:
        "We raden aan om minimaal 2 tot 3 maanden van tevoren te boeken om beschikbaarheid in de meest exclusieve bestemmingen te garanderen, hoewel we last-minute verzoeken kunnen behandelen op basis van beschikbaarheid.",
      faq_q3: "Biedt u diensten aan voor groepen of bedrijven?",
      faq_a3:
        "Ja, we ontwerpen MICE-ervaringen, incentive reizen en corporate retraites, evenals reizen voor grote familiegroepen met toegewijde logistiek.",
      news_h2: "Het SATW Manuscript",
      news_p:
        "Ontvang exclusieve reiskronieken en uitnodigingen voor privé-evenementen in uw inbox.",
      news_placeholder: "Uw e-mailadres",
      news_btn: "Inschrijven",
      contact_h2: "Plan Uw Volgende Avontuur",
      form_name: "Volledige Naam",
      form_name_placeholder: "Uw naam...",
      form_email: "E-mail",
      form_email_placeholder: "voorbeeld@mail.com",
      form_destination: "Bestemming van Interesse",
      form_opt_default: "Selecteer een bestemming",
      form_opt_other: "Andere bestemming",
      form_adults: "Volwassenen",
      form_children: "Kinderen",
      form_total: "Totaal Aantal Personen",
      form_start: "Startdatum",
      form_end: "Einddatum",
      form_message: "Vertel ons over uw ideale reis",
      form_message_placeholder: "Ik wens een reis gericht op...",
      form_btn: "Informatie Aanvragen",
      footer_tagline:
        "De essentie van Spanje naar elke hoek van de wereld brengen",
      footer_copy:
        "© 2026 SATW - Spain Around The World. Alle rechten voorbehouden.",
      label_gastronomy: "Gastronomie",
      label_lifestyle: "Lifestyle",
      label_culture: "Cultuur",
      exp_cta_1: "Beschikbaarheid Controleren",
      exp_cta_2: "Ervaring Boeken",
      exp_cta_3: "Meer Weten",
      blog_tag_1: "Redactioneel",
      blog_tag_2: "Astrotoerisme",
      blog_tag_3: "Gastro",
      blog_read_1: "8 min leestijd",
      blog_read_2: "5 min leestijd",
      blog_read_3: "6 min leestijd",
      blog_link_1: "Duik in de Geschiedenis",
      blog_link_2: "Bekijk Meer",
      blog_link_3: "Verkennen",
      exp_hero_h1: "Signatuur Ervaringen",
      exp_hero_p:
        "Collectiemomenten ontworpen om de tijd te doorstaan, in de mooiste decors van het schiereiland.",
      exp_title: "Privécollectie",
      exp_subtitle:
        "Een ambachtelijke selectie van ervaringen die het gewone tarten.",
      blog_hero_h1: "Luxe Kronieken",
      blog_hero_p:
        "Gecureerde inzichten, lokale geheimen en de ware essentie van het hedendaagse Spanje.",
      blog_title: "Signatuur Inspiratie",
      blog_subtitle:
        "Exclusieve verhalen voor degenen die de ziel achter elke bestemming zoeken.",
      exp_card_1_h: "Privé Cava & Terroir Proeverijen",
      exp_card_1_p:
        "Exclusieve toegang tot historische wijnhuizen met prestigieuze sommeliers en signatuur pairings tussen duizendjarige wijngaarden.",
      exp_card_1_loc: "Penedés, Catalonië",
      exp_card_2_h: "Jachtcharter: De Geheime Middellandse Zee",
      exp_card_2_p:
        "Vaar door ontoegankelijke baaien aan boord van luxe vaartuigen, met privé-chef service en professionele duikuitrusting.",
      exp_card_2_loc: "Ibiza & Formentera",
      exp_card_3_h: "Flamenco in Adelspaleizen",
      exp_card_3_p:
        "Een privé-avond van pure kunst in het hart van een 18e-eeuws Sevillaans paleis, ver weg van het commerciële circuit.",
      exp_card_3_loc: "Sevilla, Andalusië",
      blog_post_1_h: "Habsburgs Madrid: Een Privé-reis door Paleizen",
      blog_post_1_p:
        "Ontdek de meest aristocratische hoekjes van de Spaanse hoofdstad ver weg van de drukte, met exclusieve toegang tot privé-kunstcollecties en verborgen tuinen.",
      blog_post_2_h: "Nachten onder de Sterren in Teide",
      blog_post_2_p:
        "Een exclusieve astrotoerisme-ervaring met een diner van de haute cuisine op 2.000 meter boven zeeniveau.",
      blog_post_3_h: "San Sebastian: Het Mekka van Michelinsterren",
      blog_post_3_p:
        "Een zintuiglijke reis door de stad met de hoogste dichtheid aan Michelinsterren ter wereld.",
      title_exp: "Exclusieve Ervaringen | SATW - Spain Around The World",
      desc_exp:
        "Ontdek onze collectie exclusieve ervaringen in Spanje: privéproeverijen, ballonvaarten, luxe jachten en meer.",
      title_blog: "Inspiratie | SATW - Spain Around The World",
      desc_blog:
        "Exclusieve artikelen en reiszijde over de meest luxueuze hoekjes van Spanje.",
      footer_h3: "SATW - Spain Around The World",
    },
  };

  const applyLanguage = (lang) => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = translations[lang] ? translations[lang][key] : null;

      if (translation) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translation;
        } else {
          // preserve inner HTML for elements with icons/structure
          if (el.querySelector("i")) {
            // If there's an icon, we need to be careful.
            // Usually it's at the end or beginning.
            // We'll replace the text node only if possible, or just overwrite if it's simpler
            const icon = el.querySelector("i").outerHTML;
            const content = el.innerHTML.toLowerCase();
            const iconTag = icon.toLowerCase();

            if (content.trim().endsWith(iconTag)) {
              el.innerHTML = translation + " " + icon;
            } else {
              el.innerHTML = icon + " " + translation;
            }
          } else {
            el.innerText = translation;
          }
        }
      }
    });

    const currentLangEl = document.querySelector(".current-lang");
    if (currentLangEl) {
      currentLangEl.innerHTML = `${lang.toUpperCase()} <i class="fa-solid fa-chevron-down"></i>`;
    }

    localStorage.setItem("satw_lang", lang);
    document.documentElement.lang = lang;

    // Update Document Title and Meta Description if keys exist
    const titleKey = document
      .querySelector("title[data-i18n]")
      ?.getAttribute("data-i18n");
    if (titleKey && translations[lang] && translations[lang][titleKey]) {
      document.title = translations[lang][titleKey];
    }

    const descMeta = document.querySelector(
      'meta[name="description"][data-i18n]',
    );
    const descKey = descMeta?.getAttribute("data-i18n");
    if (descKey && translations[lang] && translations[lang][descKey]) {
      descMeta.setAttribute("content", translations[lang][descKey]);
    }
  };

  document.querySelectorAll(".lang-dropdown a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = link.getAttribute("data-lang");
      applyLanguage(lang);
    });
  });

  // Initial language application
  const savedLang = localStorage.getItem("satw_lang") || "es";
  applyLanguage(savedLang);

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close all other items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
          const otherBtn = otherItem.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add("active");
          question.setAttribute("aria-expanded", "true");
        }
      });
    }
  });
});
