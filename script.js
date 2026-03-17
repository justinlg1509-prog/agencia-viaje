document.addEventListener("DOMContentLoaded", () => {
  // Reservation Form Handling
  const reservationForm = document.getElementById("reservationForm");
  const successMessage = document.getElementById("successMessage");

  // Handle URL parameters for pre-filling (e.g., from index.html teaser)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("date")) {
    const resDate = document.getElementById("res_date");
    if (resDate) resDate.value = urlParams.get("date");
  }
  if (urlParams.has("people")) {
    const resPeople = document.getElementById("res_people");
    if (resPeople) resPeople.value = urlParams.get("people");
  }

  // --- DATABASE CONFIGURATION ---
  // Change this to true to use Firebase (Global). Keep false to use LocalStorage (This computer only).
  const USE_FIREBASE = false;

  // Firebase Configuration (Paste your config here if USE_FIREBASE is true)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID",
  };

  // Initialize Firebase if enabled
  let db = null;
  if (USE_FIREBASE && typeof firebase !== "undefined") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }

  if (reservationForm) {
    reservationForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = reservationForm.querySelector("button");
      const originalText = btn.innerHTML;

      // Premium Loading State
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
      btn.style.opacity = "0.7";
      btn.disabled = true;

      // Collect form data
      const formData = {
        date: document.getElementById("res_date").value,
        time: document.getElementById("res_time").value,
        people: document.getElementById("res_people").value,
        name: document.getElementById("res_name").value,
        phone: document.getElementById("res_phone").value,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      if (USE_FIREBASE && db) {
        try {
          await db.collection("reservations").add(formData);
          onSuccess(btn, originalText);
        } catch (error) {
          console.error("Error saving to Firebase:", error);
          alert("Error al conectar con la base de datos. Intente de nuevo.");
          btn.innerHTML = originalText;
          btn.style.opacity = "1";
          btn.disabled = false;
        }
      } else {
        // Simulate network delay for premium feel
        setTimeout(() => {
          saveToLocalStorage(formData);
          onSuccess(btn, originalText);
        }, 1000);
      }
    });
  }

  function onSuccess(btn, originalText) {
    if (btn) {
      btn.innerHTML = originalText;
      btn.style.opacity = "1";
      btn.disabled = false;
    }
    reservationForm.reset();
    successMessage.style.display = "block";
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => (successMessage.style.display = "none"), 5000);
    console.log("Reserva procesada con éxito.");
  }

  function saveToLocalStorage(data) {
    data.id = Date.now(); // Add ID for local management
    let reservations = JSON.parse(
      localStorage.getItem("taberna_reservations") || "[]",
    );
    reservations.push(data);
    localStorage.setItem("taberna_reservations", JSON.stringify(reservations));
  }

  // Smoooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // --- LANGUAGE SWITCHER ---
  const translations = {
    es: {
      lang_text: "EN",
      // Nav & Common
      nav_home: "Inicio",
      nav_history: "Historia",
      nav_menu: "Carta",
      nav_contact: "Contacto",
      nav_reserve: "Reservar Mesa",
      btn_reserve_now: "Reservar Ahora",
      all_rights: "Todos los derechos reservados.",
      legal: "Aviso Legal",
      privacy: "Privacidad",
      cookies: "Cookies",
      footer_logo: "LA TABERNA DEL RETIRO",
      footer_hours_title: "Horario de Apertura",
      // Index Page
      hero_subtitle: "Tradición Madrileña",
      hero_title: "El sabor de Madrid en el <span>corazón</span> del Retiro",
      hero_description:
        "Platos con alma, recetas heredadas y el mejor ambiente frente al parque más emblemático de la capital.",
      btn_view_menu: "Ver Carta Completa",
      btn_reserve: "Reservar Mesa",
      history_date: "Desde 1994",
      history_title: "Nuestra Historia: Raíces en Cada Bocado",
      history_quote:
        '"En La Taberna del Retiro, la cocina no es solo comida, es el lenguaje con el que mi abuelo nos decía cuánto nos quería."',
      history_p1:
        "Lo que comenzó como una pequeña casa de comidas fundada por la familia García, se ha convertido en un referente de la gastronomía madrileña. Mantenemos viva la esencia de las antiguas tabernas, donde el producto de mercado y el tiempo lento en el fogón son los protagonistas.",
      history_p2:
        "Cada Cocido Madrileño que servimos sigue la receta exacta que se escribió hace tres décadas, respetando los tres vuelcos tradicionales y el amor por lo nuestro.",
      history_more: "Conoce más sobre nosotros →",
      dishes_subtitle: "Sugerencias del Chef",
      dishes_title: "Platos que definen Madrid",
      dishes_description:
        "Selección de nuestras especialidades más queridas, preparadas a diario con ingredientes frescos del mercado.",
      dish1_title: "Cocido Madrileño Completo",
      dish1_desc:
        "Servido en tres vuelcos tradicionales: sopas de fideos, garbanzos con verduras y carnes selectas.",
      reviews: "reseñas",
      specialty: "Especialidad",
      dish2_title: 'Gambas al Ajillo "Abuela Rosa"',
      dish2_desc:
        "Gambas blancas frescas, ajos morados de Las Pedroñeras y aceite de oliva virgen extra de Madrid.",
      favorite: "Favorito",
      dish3_title: "Callos a la Madrileña",
      dish3_desc:
        "Nuestra receta centenaria: melosos, con su toque de pimentón de la Vera y chorizo de matanza.",
      tradition: "Tradición",
      teaser_title: "¿Desea disfrutar de una mesa frente al Retiro?",
      teaser_desc:
        "Garantice su lugar en nuestra taberna y prepárese para una experiencia gastronómica inolvidable.",
      hours_summary: "Lunes a Viernes 13:00 - 23:00",
      footer_desc:
        "Preservando el legado de la gastronomía madrileña en el rincón más bello de la ciudad. Calidad, tradición y esmero.",
      mon_thu: "Lunes - Jueves",
      fri_sat: "Viernes - Sábado",
      sun: "Domingo",
      footer_location_title: "Dónde Estamos",
      street: "Calle de Alcalá, 123",
      city: "28009 Madrid, España",
      footer_map_title: "Mapa",
      // Carta Page
      menu_hero_title: "Nuestra Carta",
      menu_hero_desc:
        "Sabor tradicional madrileño con el mejor producto de temporada.",
      cat_starters: "Entrantes y Tapas",
      tag_signature: "Firma",
      item1_name:
        'Tortilla de Patata de la Abuela <span class="tag-badge">Firma</span>',
      item1_desc:
        "Nuestra receta legendaria con huevos camperos, patata agria y cebolla caramelizada a fuego lento.",
      item2_name: "Croquetas de Jamón Ibérico",
      item2_desc:
        "Bechamel cremosa infusionada con hueso de jamón y tropezones de bellota (6 uds).",
      item3_name: "Bravas Crujientes Retiro",
      item3_desc:
        "Corte en dados, doble cocción y nuestra salsa brava secreta ligeramente picante.",
      item4_name: "Ensaladilla Rusa con Ventresca",
      item4_desc:
        "Patata nueva, mayonesa suave y ventresca de atún de primera calidad.",
      cat_meats: "Carnes y Guisos",
      item5_name: 'Callos a la Madrileña <span class="tag-badge">Firma</span>',
      item5_desc:
        "Receta centenaria con mucho mimo, chorizo asturiano, morcilla y su toque de guindilla.",
      item6_name: "Chuletón de Vaca Vieja",
      item6_desc:
        "45 días de maduración dry-aged, servido con pimientos del cristal y patatas fritas.",
      item7_name: "Rabo de Toro Estofado",
      item7_desc:
        "Cocinando lentamente en vino tinto de Madrid hasta que la carne se deshace.",
      cat_fish: "Pescados del Día",
      item8_name: "Bacalao al Pil-Pil",
      item8_desc: "Lomos de bacalao Skrei con emulsión de AOVE y ajos dorados.",
      item9_name: "Merluza de Pincho a la Bilbaína",
      item9_desc:
        "Directa de la lonja, preparada con refrito de ajos, guindilla y vinagre de sidra.",
      cat_desserts: "Postres Caseros",
      item10_name: "Torrija Caramelizada",
      item10_desc:
        "Empapada en leche y nata, terminada con costra de azúcar quemada y helado de vainilla.",
      item11_name: "Tarta de Queso Fluida",
      item11_desc:
        "Elaborada con una mezcla de quesos madrileños, horneada diariamente.",
      menu_teaser_title: "¿Le preparamos una mesa?",
      menu_teaser_desc:
        "Disfrute de la mejor gastronomía tradicional frente al Parque del Retiro. Recomendamos reservar con antelación.",
      footer_rights_prices:
        "Todos los derechos reservados. Precios con IVA incluido.",
      // Reservas Page
      res_hero_title: "Contacto y Reservas",
      res_hero_desc:
        "Vive una experiencia gastronómica inolvidable frente al pulmón de Madrid.",
      res_form_title: "Reserva tu Mesa",
      res_form_desc:
        "Completa el formulario y te confirmaremos tu reserva en breve.",
      label_date: "Fecha",
      label_hour: "Hora",
      label_people: "Comensales",
      label_name: "Nombre completo",
      label_phone: "Teléfono",
      opt_select_hour: "Selecciona una hora",
      person_singular: "Persona",
      person_plural: "Personas",
      ph_name: "Tu nombre",
      btn_confirm_res: "Confirmar Reserva",
      res_success: "¡Reserva enviada con éxito! Te contactaremos pronto.",
      contact_card_title: "¡Te estamos esperando!",
      contact_card_desc:
        '"Estamos deseando recibirte y compartir contigo lo mejor de nuestra cocina tradicional con toques modernos, justo frente al emblemático Parque del Retiro."',
      address: "DIRECCIÓN",
      phone: "TELÉFONO",
      email: "EMAIL",
      follow_us: "SÍGUENOS",
      btn_view_maps: "Ver en Google Maps",
      large_group_title: "¿Vienes con un grupo grande?",
      large_group_desc:
        "Para celebraciones, eventos de empresa o grupos de más de 6 personas, contáctanos directamente para ofrecerte un menú personalizado.",
      btn_call_now: "Llamar Ahora",
      btn_send_email: "Enviar Email",
      mon_sun: "Lun - Dom",
      cookie_text:
        "Utilizamos cookies para garantizar que brindamos la mejor experiencia en nuestro sitio web. Al continuar navegando, acepta su uso.",
      cookie_accept: "Aceptar",
      // Legal Notice Page
      legal_title: "Aviso Legal | La Taberna del Retiro",
      legal_hero_title: "Aviso Legal",
      legal_sec1_title: "1. Información General",
      legal_sec1_text:
        "En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se detallan los datos del titular del sitio web: La Taberna del Retiro (CIF: 12345678A), con domicilio en Calle de Alcalá, 123, 28009 Madrid.",
      legal_sec2_title: "2. Propiedad Intelectual",
      legal_sec2_text:
        "El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que aparecen en el mismo pertenecen a La Taberna del Retiro y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.",
      legal_sec3_title: "3. Responsabilidad",
      legal_sec3_text:
        "La Taberna del Retiro no se hace responsable de la legalidad de otros sitios web de terceros desde los que pueda accederse al portal. Tampoco responde por la legalidad de otros sitios web de terceros, que pudieran estar vinculados desde este portal.",
      // Privacy Policy Page
      privacy_title: "Privacidad | La Taberna del Retiro",
      privacy_hero_title: "Política de Privacidad",
      privacy_sec1_title: "1. Protección de Datos",
      privacy_sec1_text:
        "La Taberna del Retiro garantiza la protección y confidencialidad de los datos personales, de cualquier tipo que nos proporcionen nuestras empresas clientes de acuerdo con lo dispuesto en el Reglamento General de Protección de Datos.",
      privacy_sec2_title: "2. Finalidad del Tratamiento",
      privacy_sec2_text:
        "Todos los datos facilitados por nuestros clientes a La Taberna del Retiro o a su personal, serán incluidos en un fichero automatizado de datos de carácter personal creado y mantenido bajo la responsabilidad de La Taberna del Retiro, imprescindibles para prestar los servicios solicitados por los usuarios.",
      privacy_sec3_title: "3. Derechos del Usuario",
      privacy_sec3_text:
        "Los usuarios podrán ejercitar sus derechos de acceso, rectificación, cancelación y oposición enviando un correo electrónico a nuestra dirección de contacto: hola@latabernadelretiro.com",
    },
    en: {
      lang_text: "ES",
      // Nav & Common
      nav_home: "Home",
      nav_history: "History",
      nav_menu: "Menu",
      nav_contact: "Contact",
      nav_reserve: "Book a Table",
      btn_reserve_now: "Book Now",
      all_rights: "All rights reserved.",
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      cookies: "Cookies",
      footer_logo: "THE RETIRO TAVERN",
      footer_hours_title: "Opening Hours",
      // Index Page
      hero_subtitle: "Madrid Tradition",
      hero_title: "The flavor of Madrid in the <span>heart</span> of Retiro",
      hero_description:
        "Soulful dishes, inherited recipes, and the best atmosphere across from the capital's most iconic park.",
      btn_view_menu: "View Full Menu",
      btn_reserve: "Book a Table",
      history_date: "Since 1994",
      history_title: "Our History: Roots in Every Bite",
      history_quote:
        '"At La Taberna del Retiro, cooking is not just food; it\'s the language my grandfather used to tell us how much he loved us."',
      history_p1:
        "What began as a small eatery founded by the García family has become a benchmark of Madrid gastronomy. We keep the essence of old taverns alive, where market products and slow-cooked traditional methods are the stars.",
      history_p2:
        "Every Madrilenian Stew we serve follows the exact recipe written three decades ago, respecting the three traditional servings and our love for our heritage.",
      history_more: "Learn more about us →",
      dishes_subtitle: "Chef's Suggestions",
      dishes_title: "Dishes that Define Madrid",
      dishes_description:
        "Selection of our most beloved specialties, prepared daily with fresh market ingredients.",
      dish1_title: "Full Madrilenian Stew",
      dish1_desc:
        "Served in three traditional servings: noodle soup, chickpeas with vegetables, and selected meats.",
      reviews: "reviews",
      specialty: "Specialty",
      dish2_title: 'Garlic Prawns "Abuela Rosa"',
      dish2_desc:
        "Fresh white prawns, purple garlic from Las Pedroñeras, and extra virgin olive oil from Madrid.",
      favorite: "Favorite",
      dish3_title: "Madrilenian Tripe",
      dish3_desc:
        "Our century-old recipe: mellow, with its touch of Pimentón de la Vera and traditional chorizo.",
      tradition: "Tradition",
      teaser_title: "Would you like to enjoy a table facing Retiro?",
      teaser_desc:
        "Guarantee your spot at our tavern and prepare for an unforgettable gastronomic experience.",
      hours_summary: "Monday to Friday 1:00 PM - 11:00 PM",
      footer_desc:
        "Preserving the legacy of Madrid's gastronomy in the city's most beautiful corner. Quality, tradition, and care.",
      mon_thu: "Monday - Thursday",
      fri_sat: "Friday - Saturday",
      sun: "Sunday",
      footer_location_title: "Where We Are",
      street: "Alcalá Street, 123",
      city: "28009 Madrid, Spain",
      footer_map_title: "Map",
      // Carta Page
      menu_hero_title: "Our Menu",
      menu_hero_desc:
        "Traditional Madrid flavor with the best seasonal products.",
      cat_starters: "Starters & Tapas",
      tag_signature: "Signature",
      item1_name:
        'Grandma\'s Potato Omelette <span class="tag-badge">Signature</span>',
      item1_desc:
        "Our legendary recipe with free-range eggs, sour potatoes, and slow-caramelized onions.",
      item2_name: "Iberian Ham Croquettes",
      item2_desc:
        "Creamy béchamel infused with ham bone and acorn-fed bits (6 units).",
      item3_name: "Retiro Crispy Bravas",
      item3_desc:
        "Diced, double-cooked, and our secret slightly spicy brava sauce.",
      item4_name: "Russian Salad with Tuna Belly",
      item4_desc:
        "New potatoes, mild mayonnaise, and premium quality tuna belly.",
      cat_meats: "Meats & Stews",
      item5_name: 'Madrilenian Tripe <span class="tag-badge">Signature</span>',
      item5_desc:
        "Century-old recipe with much care, Asturian chorizo, blood sausage, and its touch of chili.",
      item6_name: "Aged Beef Ribeye",
      item6_desc:
        "45 days of dry-aged maturation, served with cristal peppers and fries.",
      item7_name: "Braised Bull Tail",
      item7_desc:
        "Slow-cooked in Madrid red wine until the meat falls off the bone.",
      cat_fish: "Fish of the Day",
      item8_name: "Cod Pil-Pil",
      item8_desc: "Skrei cod loins with EVOO emulsion and golden garlic.",
      item9_name: "Hook and Line Hake Bilbaína style",
      item9_desc:
        "Straight from the market, prepared with sautéed garlic, chili, and cider vinegar.",
      cat_desserts: "Homemade Desserts",
      item10_name: "Caramelized Torrija",
      item10_desc:
        "Soaked in milk and cream, finished with a burnt sugar crust and vanilla ice cream.",
      item11_name: "Fluid Cheesecake",
      item11_desc: "Made with a blend of Madrid cheeses, baked daily.",
      menu_teaser_title: "Shall we prepare a table for you?",
      menu_teaser_desc:
        "Enjoy the best traditional gastronomy facing Retiro Park. We recommend booking in advance.",
      footer_rights_prices: "All rights reserved. Prices include VAT.",
      // Reservas Page
      res_hero_title: "Contact & Reservations",
      res_hero_desc:
        "Live an unforgettable gastronomic experience facing Madrid's lung.",
      res_form_title: "Book Your Table",
      res_form_desc:
        "Complete the form and we will confirm your reservation shortly.",
      label_date: "Date",
      label_hour: "Time",
      label_people: "Guests",
      label_name: "Full Name",
      label_phone: "Phone",
      opt_select_hour: "Select a time",
      person_singular: "Person",
      person_plural: "People",
      ph_name: "Your name",
      btn_confirm_res: "Confirm Reservation",
      res_success: "Reservation sent successfully! We will contact you soon.",
      contact_card_title: "We are waiting for you!",
      contact_card_desc:
        '"We look forward to welcoming you and sharing the best of our traditional cuisine with modern touches, right in front of the iconic Retiro Park."',
      address: "ADDRESS",
      phone: "PHONE",
      email: "EMAIL",
      follow_us: "FOLLOW US",
      btn_view_maps: "View on Google Maps",
      large_group_title: "Coming with a large group?",
      large_group_desc:
        "For celebrations, corporate events, or groups of more than 6 people, contact us directly for a personalized menu.",
      btn_call_now: "Call Now",
      btn_send_email: "Send Email",
      mon_sun: "Mon - Sun",
      cookie_text:
        "We use cookies to ensure that we give you the best experience on our website. By continuing to browse, you accept their use.",
      cookie_accept: "Accept",
      // Legal Notice Page
      legal_title: "Legal Notice | The Retiro Tavern",
      legal_hero_title: "Legal Notice",
      legal_sec1_title: "1. General Information",
      legal_sec1_text:
        "In compliance with the duty of information collected in article 10 of Law 34/2002, of July 11, on Services of the Information Society and Electronic Commerce, the details of the owner of the website are listed below: La Taberna del Retiro (CIF: 12345678A), located at Calle de Alcalá, 123, 28009 Madrid.",
      legal_sec2_title: "2. Intellectual Property",
      legal_sec2_text:
        "The design of the portal and its source codes, as well as the logos, trademarks and other distinctive signs that appear in it belong to La Taberna del Retiro and are protected by the corresponding intellectual and industrial property rights.",
      legal_sec3_title: "3. Responsibility",
      legal_sec3_text:
        "La Taberna del Retiro is not responsible for the legality of other third-party websites from which the portal can be accessed. Nor does it respond for the legality of other third-party websites, which could be linked from this portal.",
      // Privacy Policy Page
      privacy_title: "Privacy | The Retiro Tavern",
      privacy_hero_title: "Privacy Policy",
      privacy_sec1_title: "1. Data Protection",
      privacy_sec1_text:
        "La Taberna del Retiro guarantees the protection and confidentiality of personal data, of any type provided by our client companies in accordance with the provisions of the General Data Protection Regulation.",
      privacy_sec2_title: "2. Purpose of the Treatment",
      privacy_sec2_text:
        "All data provided by our clients to La Taberna del Retiro or its staff will be included in an automated file of personal data created and maintained under the responsibility of La Taberna del Retiro, essential to provide the services requested by the users.",
      privacy_sec3_title: "3. User Rights",
      privacy_sec3_text:
        "Users may exercise their rights of access, rectification, cancellation and opposition by sending an email to our contact address: hola@latabernadelretiro.com",
    },
  };

  const langToggle = document.getElementById("lang-toggle");
  const langText = document.getElementById("lang-text");

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookies = document.getElementById("accept-cookies");
  let currentLang = localStorage.getItem("preferredLanguage") || "es";

  function updateLanguage(lang) {
    // Normal text updates
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Placeholder updates
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    if (langText) {
      langText.textContent = translations[lang].lang_text;
    }

    document.documentElement.lang = lang;
    localStorage.setItem("preferredLanguage", lang);
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      updateLanguage(currentLang);
    });
  }

  // Cookie Banner Logic
  if (cookieBanner && !localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 1000);
  }

  if (acceptCookies) {
    acceptCookies.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.classList.remove("show");
    });
  }

  // Initialize language
  updateLanguage(currentLang);

  // --- HAMBURGER MENU ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      // Prevent scrolling when menu is open
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "auto";
    });

    // Close menu when a link is clicked
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });
  }

  // Nav Bar transparency effect on scroll
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
      nav.style.padding = "10px 0";
    } else {
      nav.style.boxShadow = "none";
      nav.style.padding = "15px 0";
    }
  });
});
