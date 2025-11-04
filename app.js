// Application state z poprawną integracją localStorage
const state = {
  userName: '',
  currentSection: 'dashboard',
  auditHistory: [],
  currentAudit: null,
  plan10Days: [],
  completedExercises: [],
  readArticles: [],
  unlockedBadges: [],
  points: 0,
  streak: 0,
  lastActivityDate: null,
  sidebarOpen: false,
  quizCompleted: false,
  quizBonusAwarded: false,

  // Audit sections data
  auditSections: [
    {
      id: 1,
      title: "Krzesło i ustawienie ciała",
      icon: "fas fa-chair",
      weight: 25,
      healthRisk: "krzeslo",
      questions: [
        { id: "k1", text: "Stopy w pełni oparte o podłogę; w razie potrzeby podnóżek/podstawka", checked: false, weight: 6.25, healthRisk: "krzeslo" },
        { id: "k2", text: "Uda równolegle do podłogi; kąt w kolanach ok. 90°", checked: false, weight: 6.25, healthRisk: "krzeslo" },
        { id: "k3", text: "Oparcie z wyczuwalnym podparciem lędźwi", checked: false, weight: 6.25, healthRisk: "krzeslo" },
        { id: "k4", text: "Podłokietniki na poziomie blatu; barki rozluźnione; nadgarstki w osi", checked: false, weight: 6.25, healthRisk: "krzeslo" }
      ]
    },
    {
      id: 2,
      title: "Monitor",
      icon: "fas fa-desktop",
      weight: 20,
      healthRisk: "monitor",
      questions: [
        { id: "m1", text: "Górna krawędź ekranu na wysokości oczu (lub nieco niżej), odległość 50–70 cm", checked: false, weight: 6.67, healthRisk: "monitor" },
        { id: "m2", text: "Ekran lekko odchylony (10–20°) i ustawiony na wprost", checked: false, weight: 6.67, healthRisk: "monitor" },
        { id: "m3", text: "Źródło światła dziennego pada z boku (bez olśnień i odbić)", checked: false, weight: 6.66, healthRisk: "monitor" }
      ]
    },
    {
      id: 3,
      title: "Klawiatura i mysz",
      icon: "fas fa-keyboard",
      weight: 15,
      healthRisk: "klawiatura_mysz",
      questions: [
        { id: "km1", text: "Klawiatura na wysokości łokci; nadgarstki prosto", checked: false, weight: 7.5, healthRisk: "klawiatura_mysz" },
        { id: "km2", text: "Mysz blisko klawiatury, na tej samej wysokości", checked: false, weight: 7.5, healthRisk: "klawiatura_mysz" }
      ]
    },
    {
      id: 4,
      title: "Postawa ciała",
      icon: "fas fa-user",
      weight: 10,
      healthRisk: "postawa",
      questions: [
        { id: "p1", text: "Plecy prosto; barki rozluźnione", checked: false, weight: 5, healthRisk: "postawa" },
        { id: "p2", text: "Głowa w naturalnej pozycji (nie wysunięta do przodu)", checked: false, weight: 5, healthRisk: "postawa" }
      ]
    },
    {
      id: 5,
      title: "Praca z dwoma monitorami",
      icon: "fas fa-tv",
      weight: 10,
      healthRisk: "2monitory",
      hasMode: true,
      mode: "na",
      questions: [],
      symmetricQuestions: [
        { id: "2m_s1", text: "Krawędzie monitorów stykają się na środku pola widzenia", checked: false, weight: 2.5, healthRisk: "2monitory" },
        { id: "2m_s2", text: "Ta sama wysokość; górna krawędź na wysokości wzroku lub trochę poniżej", checked: false, weight: 2.5, healthRisk: "2monitory" },
        { id: "2m_s3", text: "Nachylenie 10–20° i lekko do środka (jak skrzydła książki)", checked: false, weight: 2.5, healthRisk: "2monitory" },
        { id: "2m_s4", text: "Krzesło ustawione pośrodku między monitorami", checked: false, weight: 2.5, healthRisk: "2monitory" }
      ],
      mixedQuestions: [
        { id: "2m_m1", text: "Główny monitor ustawiony na wprost", checked: false, weight: 3.34, healthRisk: "2monitory" },
        { id: "2m_m2", text: "Pomocniczy z boku, pod kątem; bez skręcania tułowia", checked: false, weight: 3.33, healthRisk: "2monitory" },
        { id: "2m_m3", text: "Zmieniasz stronę monitora pomocniczego co kilka dni", checked: false, weight: 3.33, healthRisk: "2monitory" }
      ]
    },
    {
      id: 6,
      title: "Praca z laptopem",
      icon: "fas fa-laptop",
      weight: 10,
      healthRisk: "laptop",
      hasApplies: true,
      applies: false,
      questions: [
        { id: "l1", text: "Używam podstawki pod laptopa oraz zewnętrznej klawiatury i myszy", checked: false, weight: 5, healthRisk: "laptop" },
        { id: "l2", text: "Otwory wentylacyjne laptopa nie są zasłonięte", checked: false, weight: 5, healthRisk: "laptop" }
      ]
    },
    {
      id: 7,
      title: "Mikroprzerwy i pro-tipy",
      icon: "fas fa-clock",
      weight: 10,
      healthRisk: "mikroprzerwy",
      questions: [
        { id: "mp1", text: "Krótkie, aktywne przerwy co 30–40 minut", checked: false, weight: 3.34, healthRisk: "mikroprzerwy" },
        { id: "mp2", text: "Kosz na śmieci ustawiony dalej od biurka (zachęca do wstania)", checked: false, weight: 3.33, healthRisk: "mikroprzerwy" },
        { id: "mp3", text: "Podczas rozmów tel. bez komputera — wstaję i robię krótki spacer (walk-and-talk)", checked: false, weight: 3.33, healthRisk: "mikroprzerwy" }
      ]
    }
  ],

  // Health consequences mapping
  healthConsequences: {
    krzeslo: {
      name: "Problemy z krzesłem i wysokością",
      urgency: "high",
      icon: "fas fa-chair",
      color: "var(--color-orange-500)",
      effects: [
        "Bóle pleców i kręgosłupa (72% pracowników)",
        "Żylaki i obrzęki nóg (20%)",
        "Ograniczony przepływ krwi",
        "Chroniczne zapalenie stawów"
      ],
      actionItems: [
        "Wymień/wyreguluj krzesło",
        "Dodaj podnóżek",
        "Ćwiczenie: Rozciąganie pleców"
      ]
    },
    monitor: {
      name: "Problemy z monitorem",
      urgency: "high",
      icon: "fas fa-desktop",
      color: "var(--color-orange-500)",
      effects: [
        "Bóle karku i szyi (51% pracowników)",
        "Zaburzenia wzroku (60%)",
        "Bóle głowy i migreny (47%)",
        "Zmęczenie oczu"
      ],
      actionItems: [
        "Podnieś monitor na podstawkę",
        "Dostosuj oświetlenie",
        "Ćwiczenie: Palming i ruchy oczu"
      ]
    },
    klawiatura_mysz: {
      name: "Problemy z klawiaturą i myszą",
      urgency: "high",
      icon: "fas fa-keyboard",
      color: "var(--color-orange-500)",
      effects: [
        "Zespół cieśni nadgarstka (15% pracowników)",
        "Bóle ramion i przedramienia",
        "Zapalenie ścięgien",
        "Chroniczny ból nadgarstka"
      ],
      actionItems: [
        "Przysuń mysz do klawiatury",
        "Dodaj podpórkę pod nadgarstki",
        "Ćwiczenie: Rozciąganie nadgarstków"
      ]
    },
    postawa: {
      name: "Problemy z postawą ciała",
      urgency: "high",
      icon: "fas fa-user",
      color: "var(--color-orange-500)",
      effects: [
        "Bóle szyi i karku (51%)",
        "Chroniczne napięcie mięśni",
        "Chroniczne migreny",
        "Skolioza i zaburzenia kręgosłupa"
      ],
      actionItems: [
        "Pamiętaj o naturalnej pozycji głowy",
        "Rozluźniaj barki regularnie",
        "Ćwiczenie: Rotacja szyi i ramion"
      ]
    },
    "2monitory": {
      name: "Asymetryczne ustawienie monitorów",
      urgency: "medium",
      icon: "fas fa-tv",
      color: "var(--color-yellow-500)",
      effects: [
        "Bóle szyi i pleców",
        "Asymetryczne obciążenie mięśni",
        "Skolioza (krzywe boki)",
        "Chroniczne bóle jednostronne"
      ],
      actionItems: [
        "Wyrównaj wysokość monitorów",
        "Ustaw monitory symetrycznie",
        "Ćwiczenie: Rotacja ramion"
      ]
    },
    laptop: {
      name: "Brak właściwego setupu laptopa",
      urgency: "critical",
      icon: "fas fa-laptop",
      color: "var(--color-red-500)",
      effects: [
        "Poważne bóle szyi i pleców",
        "Zespół cieśni nadgarstka (natychmiast)",
        "Chroniczne problemy ze wzrokiem",
        "Długoterminowe uszkodzenia zdrowotne"
      ],
      actionItems: [
        "NATYCHMIAST: Kup podstawkę pod laptopa",
        "Podłącz zewnętrzną klawiaturę i mysz",
        "To jest PRIORYTET!"
      ]
    },
    mikroprzerwy: {
      name: "Brak przerw i ruchu",
      urgency: "critical",
      icon: "fas fa-clock",
      color: "var(--color-red-500)",
      effects: [
        "Stres chroniczny (81% pracowników)",
        "Zwiększone ryzyko chorób serca (30%)",
        "Zmęczenie i depresja (45%)",
        "Zaburzenia snu (20%)"
      ],
      actionItems: [
        "Ustaw timer na co 30 minut",
        "Rób krótkie spacery",
        "Wykonuj ćwiczenia rozluźniające"
      ]
    }
  },

  // Plan 10-dniowy data
  challenges: [
    { day: 1, dayOfWeek: "Dzień 1", title: "Zacznij od audytu", task: "Wykonaj pełny audyt ergonomii - otrzymasz spersonalizowany plan działań", type: "audit", completed: false, completedDate: null },
    { day: 2, dayOfWeek: "Dzień 2", title: "Regulacja wysokości", task: "Dostosuj wysokość krzesła - stopy na podłodze, kolana pod 90°", type: "action", completed: false, completedDate: null },
    { day: 3, dayOfWeek: "Dzień 3", title: "Pozycja monitora", task: "Podnieś monitor - górna krawędź ekranu na wysokości oczu", type: "action", completed: false, completedDate: null },
    { day: 4, dayOfWeek: "Dzień 4", title: "Pierwsze ćwiczenia", task: "Wykonaj zestaw ćwiczeń na szyję i ramiona - 10 minut", type: "exercise", completed: false, completedDate: null },
    { day: 5, dayOfWeek: "Dzień 5", title: "Edukacja - połowa tygodnia", task: "Przeczytaj artykuł: Dlaczego ergonomia ma znaczenie dla zdrowia", type: "education", completed: false, completedDate: null },
    { day: 6, dayOfWeek: "Dzień 6", title: "Pozycja klawiatury i myszy", task: "Dostosuj wysokość - klawiatura na łokciach, mysz blisko klawiatury", type: "action", completed: false, completedDate: null },
    { day: 7, dayOfWeek: "Dzień 7", title: "Ćwiczenia na plecy", task: "Wykonaj 10-minutowy set rozciągający na plecy", type: "exercise", completed: false, completedDate: null },
    { day: 8, dayOfWeek: "Dzień 8", title: "Mikroprzerwy - habit builder", task: "Ustaw timer - co godzinę 5-minutowa przerwa z ćwiczeniami", type: "habit", completed: false, completedDate: null },
    { day: 9, dayOfWeek: "Dzień 9", title: "Finalna edukacja", task: "Przeczytaj: Jak utrzymać dobre nawyki ergonomiczne", type: "education", completed: false, completedDate: null },
    { day: 10, dayOfWeek: "Dzień 10", title: "Re-audyt i podsumowanie", task: "Wykonaj ponownie audyt ergonomii - porównaj wyniki! 🎉", type: "audit", completed: false, completedDate: null }
  ],

  // Exercises data
  exercises: {
    neckShoulders: {
      title: "Szyja i ramiona",
      icon: "fas fa-head-side-virus",
      exercises: [
        { name: "Rotacja szyi", duration: 45, description: "Obracaj głowę powoli w lewo i prawo, zatrzymując się na koniec zakresu na 3 sekundy. Powtórz 5 razy w każdą stronę." },
        { name: "Pochylanie szyi", duration: 45, description: "Pochylaj głowę do przodu, aż poczujesz napięcie w karku. Zatrzymaj na 5 sekund, potem do tyłu. Powtórz 5 razy." },
        { name: "Rotacja ramion", duration: 60, description: "Podnieś ramiona do uszu i obracaj je wstecz 10 razy, potem naprzód 10 razy. Powoli i kontrolowanie." },
        { name: "Rozciąganie boku szyi", duration: 60, description: "Pochyl głowę do prawego ramienia, zatrzymaj 15 sekund. Powtórz po lewej stronie." }
      ]
    },
    back: {
      title: "Plecy",
      icon: "fas fa-person-hiking",
      exercises: [
        { name: "Rozciąganie pleców", duration: 60, description: "Wstań, połóż dłonie za siebie i obracaj tułów powoli do przodu. Zatrzymaj na 15 sekund. Powtórz 3 razy." },
        { name: "Cat-cow stretch", duration: 90, description: "Stoi na czworaka. Wygib plecy do przodu, zatrzymaj 5 sekund. Potem zaokrąglij plecy, zatrzymaj 5 sekund. Powtórz 8 razy." },
        { name: "Pochylenie do przodu", duration: 75, description: "Stoi, nogi na szerokości bioder. Pochylaj się do przodu, starając się dotknąć palcami podłogi. Zatrzymaj 20 sekund." },
        { name: "Wyprost klatki piersiowej", duration: 60, description: "Stoi prosto, spłoć dłonie za plecami. Powoli podnosi ramiona do tyłu. Zatrzymaj 15 sekund. Powtórz 3 razy." }
      ]
    },
    wrists: {
      title: "Nadgarstki i dłonie",
      icon: "fas fa-hand-fist",
      exercises: [
        { name: "Rotacja nadgarstka", duration: 30, description: "Wyciągnij rękę do przodu, otwórz i zamykaj dłoń. Obracaj nadgarstkiem w kółko 10 razy w każdą stronę." },
        { name: "Rozciąganie palców", duration: 45, description: "Spłoć dłonie za sobą, przymknij oczy i powoli podnies ręce w górę. Zatrzymaj 20 sekund." },
        { name: "Masaż pięści", duration: 40, description: "Zaciskaj pięści, a następnie rozluźniaj przez 2 sekundy. Powtórz 20 razy. Potem rozciągaj palce maksymalnie." },
        { name: "Modlitewne rozciąganie", duration: 50, description: "Dłonie razem przed грудями, przesuwaj je powoli w dół, aż poczujesz napięcie. Zatrzymaj 20 sekund." }
      ]
    },
    eyes: {
      title: "Oczy",
      icon: "fas fa-eye",
      exercises: [
        { name: "Mruganie świadome", duration: 90, description: "Mrugaj powoli i świadomie przez 1,5 minuty. To nawilży oczy i rozluźni mięśnie." },
        { name: "Ruchy oczu", duration: 60, description: "Patrz w górę, dół, prawo, lewo i po przekątnych. Każdy kierunek 5 sekund. Powtórz cykl 3 razy." },
        { name: "Palming", duration: 120, description: "Zakryj oczy dłońmi (nie naciskając). Siedź w ciemności i oddychaj. 2 minuty pełnego relaksu." },
        { name: "Focus shift", duration: 300, description: "Patrz przez okno na coś daleko (min 20 m), potem na coś blisko (30 cm). Przełączaj co 10 sekund przez 5 minut." }
      ]
    },
    legs: {
      title: "Nogi",
      icon: "fas fa-person-walking",
      exercises: [
        { name: "Rozciąganie ud", duration: 50, description: "Siądź, złóż prawe nogi na lewe kolano. Pochylaj się do przodu. Zatrzymaj 20 sekund. Powtórz po drugiej stronie." },
        { name: "Rozciąganie łydek", duration: 45, description: "Siadaj przysiad, trzymając ścianę. Lewa noga zognięta, prawa wyprostowana. Zatrzymaj 20 sekund." },
        { name: "Mały spacer", duration: 180, description: "Przejdź 100-200 kroków po biurze lub korytarzu. Powoli, świadomie." },
        { name: "Ruchy nóg w siedzie", duration: 40, description: "Siedzisz i powoli unosisz prawe kolano, zatrzymujesz na 3 sekundy. Powtórz 10 razy na każdę nogę." }
      ]
    }
  },

  // Education articles
  articles: [
    {
      title: "Dlaczego ergonomia stanowiska jest ważna?",
      category: "Dlaczego to ważne",
      readingTime: 3,
      content: "Prawidłowa ergonomia to nie luksus - to inwestycja w Twoje zdrowie i życie. Praca w nieergonomicznym stanowisku powoduje bóle, zmęczenie i długoterminowe problemy zdrowotne. Ponad 79% pracowników biurowych codziennie odczuwa ból bezpośrednio związany z pracą. Dobra wiadomość? Większość problemów można rozwiązać już w 2-3 tygodnie prostych zmian. To nie wymaga dużych inwestycji - często to zwykła reorganizacja przestrzeni i kilka przyzwyczajeń."
    },
    {
      title: "Kąt 90 stopni - dlaczego to magiczna liczba?",
      category: "Jak to robić",
      readingTime: 3,
      content: "Gdy kąt w kolanach wynosi ok. 90°, a uda są równolegle do podłogi, przepływ krwi jest optymalny. Gdy zawijasz nogi pod siedzenie lub przesadnie je wyciągasz, ograniczasz krążenie, co prowadzi do zakrzepów, żylaków i bólu. Stopy powinny być całkowicie podparte - jeśli wisz - użyj podnóżka. To nie detail - to podstawa. Zmiana tego jednego ustawienia może zmienić Twoje samopoczucie w 1-2 tygodnie!"
    },
    {
      title: "Monitor na wysokości oczu - dlaczego?",
      category: "Jak to robić",
      readingTime: 3,
      content: "Gdy patrzysz na monitor, twoja głowa powinna być w naturalnej pozycji (lekko do góry). Jeśli monitor jest za nisko, wysuwasz głowę do przodu - już po pół godzinie czujesz ból szyi i karku. Przez rok to staje się chronicznym bólem. Górna krawędź monitora powinna być na wysokości oczu lub trochę poniżej, w odległości wyciągniętego ramienia (50-70 cm). To jedna z najważniejszych zmian!"
    },
    {
      title: "Zespół cieśni nadgarstka - jak go unikać?",
      category: "Poradnik",
      readingTime: 4,
      content: "Piszesz wiele? Mysz w złym miejscu? To sprawca zespołu cieśni nadgarstka (TOS). Nerw przeciśnięty w kanale nadgarstka powoduje: mrowienie, ból, bezsenność. Profilaktyka: mysz na tej samej wysokości co klawiatura, nadgarstki prosto, nie zawinięte. Regularnie rozciągaj dłonie - rób to co 30 minut. Jeśli już masz objawy - dodaj podpórkę pod nadgarstki."
    },
    {
      title: "Synergia ergonomii - efekt domina",
      category: "Dlaczego to ważne",
      readingTime: 3,
      content: "Ergonomia to nie pojedyncze elementy - to system. Dobrze ustawiony monitor wymaga dobrze ustawionego krzesła. Dobre krzesło wymaga podnóżka. Podnóżek wymaga regularnych przerw i ruchu. Wszystko ze sobą współpracuje. Nawet gdy poprawisz 70% - pozostałe 30% może zniwelować efekty. Dlatego ważne jest kompleksowe podejście. Zacznij od największego problemu i powoli dodawaj kolejne zmiany."
    },
    {
      title: "Mikroprzerwami - najlepsza inwestycja",
      category: "Poradnik",
      readingTime: 4,
      content: "Nie potrzebujesz długich przerw. Wystarczy co 30-40 minut wstać na 5 minut i zrobić parę rozciągnięć. To przywraca przepływ krwi, regeneruje oczy, zmienia perspektywę. Badania pokazują, że 5-minutowa przerwa co 30 minut ZWIĘKSZA produktywność (paradoks - ale prawdziwy). Ustaw timer - ta gra zmieni Twoją pracę. Zaczynasz teraz?"
    }
  ],

  // Gamification
  badges: [
    { id: 1, name: "Audyt się liczy", description: "Wykonaj swój pierwszy audyt ergonomii", icon: "fas fa-clipboard-check", points: 50, unlocked: false },
    { id: 2, name: "Zaczęty na poważnie", description: "Wykonaj pierwsze wyzwanie z planu", icon: "fas fa-forward", points: 50, unlocked: false },
    { id: 3, name: "Połowa drogi", description: "Wykonaj 5 dni z rzędu", icon: "fas fa-fire", points: 100, unlocked: false },
    { id: 4, name: "Prawie tam!", description: "Wykonaj 10 dni z rzędu", icon: "fas fa-hourglass-end", points: 100, unlocked: false },
    { id: 5, name: "Transformacja!", description: "Re-audyt wykazał wzrost 30%+", icon: "fas fa-arrow-up", points: 200, unlocked: false },
    { id: 6, name: "Legenda audytu", description: "Ukończ 10 dni + 85%+ w re-audycie", icon: "fas fa-crown", points: 150, unlocked: false },
    { id: 7, name: "Edukator", description: "Przeczytaj wszystkie artykuły", icon: "fas fa-book-open", points: 100, unlocked: false },
    { id: 8, name: "Mistrz ćwiczeń", description: "Wykonaj 15 ćwiczeń", icon: "fas fa-dumbbell", points: 150, unlocked: false },
    { id: 9, name: "Quiz Master", description: "Wykonaj Quiz Bonusowy", icon: "fas fa-brain", points: 100, unlocked: false }
  ],

  levels: [
    { name: "Bronze", minPoints: 0, maxPoints: 449, description: "Zaczynam audyt", percentage: "25%" },
    { name: "Silver", minPoints: 450, maxPoints: 899, description: "Robię postępy", percentage: "50%" },
    { name: "Gold", minPoints: 900, maxPoints: 1619, description: "Mistrz ergonomii", percentage: "90%" },
    { name: "Platinum", minPoints: 1620, maxPoints: 9999, description: "Legenda ergonomii - Quiz Bonusowy Odblokowany!", percentage: "90% (pełnia)" }
  ]
};

// ==================================================================================
// POPRAWIONY MECHANIZM PAMIĘCI: ZAMIANA SYMULACJI NA RZECZYWISTY LOCALSTORAGE
// ==================================================================================

const STORAGE_KEYS = {
    USER_NAME: 'ergonomia_userName',
    AUDIT_HISTORY: 'ergonomia_auditHistory',
    PLAN_DAYS: 'ergonomia_plan10Days',
    COMPLETED_EXERCISES: 'ergonomia_completedExercises',
    READ_ARTICLES: 'ergonomia_readArticles',
    BADGES: 'ergonomia_badges',
    POINTS: 'ergonomia_points',
    STREAK: 'ergonomia_streak',
    LAST_ACTIVITY: 'ergonomia_lastActivityDate',
    QUIZ_COMPLETED: 'ergonomia_quizCompleted',
    QUIZ_BONUS: 'ergonomia_quizBonusAwarded'
};

const storage = {
    // ZAPISUJE CAŁY STAN APLIKACJI DO LOCALSTORAGE
    save() {
        try {
            // Zapis wartości string/number/boolean (toString())
            localStorage.setItem(STORAGE_KEYS.USER_NAME, state.userName);
            localStorage.setItem(STORAGE_KEYS.POINTS, state.points.toString());
            localStorage.setItem(STORAGE_KEYS.STREAK, state.streak.toString());
            localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, state.lastActivityDate ? state.lastActivityDate.toString() : '');
            localStorage.setItem(STORAGE_KEYS.QUIZ_COMPLETED, state.quizCompleted.toString());
            localStorage.setItem(STORAGE_KEYS.QUIZ_BONUS, state.quizBonusAwarded.toString());
            
            // Zapis obiektów i tablic (JSON.stringify)
            localStorage.setItem(STORAGE_KEYS.AUDIT_HISTORY, JSON.stringify(state.auditHistory));
            localStorage.setItem(STORAGE_KEYS.PLAN_DAYS, JSON.stringify(state.plan10Days));
            localStorage.setItem(STORAGE_KEYS.COMPLETED_EXERCISES, JSON.stringify(state.completedExercises));
            localStorage.setItem(STORAGE_KEYS.READ_ARTICLES, JSON.stringify(state.readArticles));
            localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(state.badges));

            console.log('Data saved to localStorage successfully.');
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },

    // ŁADUJE CAŁY STAN APLIKACJI Z LOCALSTORAGE
    load() {
        const userName = localStorage.getItem(STORAGE_KEYS.USER_NAME);

        if (userName) {
            state.userName = userName;

            // Ładowanie i parsowanie wartości numerycznych/boolowskich
            state.points = parseInt(localStorage.getItem(STORAGE_KEYS.POINTS)) || 0;
            state.streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK)) || 0;
            state.lastActivityDate = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
            state.quizCompleted = localStorage.getItem(STORAGE_KEYS.QUIZ_COMPLETED) === 'true';
            state.quizBonusAwarded = localStorage.getItem(STORAGE_KEYS.QUIZ_BONUS) === 'true';
            
            // Ładowanie i parsowanie obiektów/tablic (JSON.parse)
            state.auditHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_HISTORY)) || [];
            // Jeśli plan nie istnieje, ustaw początkowy plan
            state.plan10Days = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAN_DAYS)) || state.challenges.map(c => ({ ...c })); 
            state.completedExercises = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_EXERCISES)) || [];
            state.readArticles = JSON.parse(localStorage.getItem(STORAGE_KEYS.READ_ARTICLES)) || [];
            
            const savedBadges = JSON.parse(localStorage.getItem(STORAGE_KEYS.BADGES));
            if (savedBadges) {
                // Mapowanie zapisanych statusów odznak na aktualne definicje
                state.badges = state.badges.map(def => {
                    const saved = savedBadges.find(b => b.id === def.id);
                    return saved ? { ...def, unlocked: saved.unlocked } : def;
                });
            }

            console.log('Data loaded from localStorage successfully. User:', state.userName);
            return true;
        }
        return false;
    },

    clear() {
        // Usuwanie wszystkich kluczy aplikacji z pamięci przeglądarki
        const keysToRemove = Object.values(STORAGE_KEYS);
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Ponowna inicjalizacja stanu aplikacji do stanu początkowego
        Object.assign(state, {
            userName: '',
            currentSection: 'dashboard',
            auditHistory: [],
            currentAudit: null,
            plan10Days: state.challenges.map(c => ({ ...c })), 
            completedExercises: [],
            readArticles: [],
            unlockedBadges: [],
            points: 0,
            streak: 0,
            lastActivityDate: null,
            sidebarOpen: false,
            quizCompleted: false,
            quizBonusAwarded: false,
            badges: state.badges.map(b => ({ ...b, unlocked: false }))
        });

        console.log('Storage cleared and application state reset.');
    }
};

// ==================================================================================
// LOGIKA APLIKACJI (POZOSTAJE BEZ ZMIAN)
// ==================================================================================

// Application logic
const app = {
  init() {
    // Próba załadowania stanu z localStorage (teraz poprawne)
    const hasData = storage.load();

    if (!hasData || !state.userName) {
      // Pierwszy raz / brak danych - pokaż ekran powitalny
      this.showWelcomeScreen();
      return;
    }

    // Ukryj ekran powitalny i pokaż aplikację
    this.hideWelcomeScreen();
    
    // Renderuj widoki
    this.renderDashboard();
    this.updateDashboardKPIs();
  },

  showWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const app = document.getElementById('app');
    welcomeScreen.classList.remove('hidden');
    app.style.display = 'none';
  },

  hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const app = document.getElementById('app');
    welcomeScreen.classList.add('hidden');
    app.style.display = 'flex';
  },

  startAdventure() {
    const nameInput = document.getElementById('userNameInput');
    const name = nameInput.value.trim();

    if (!name) {
      this.showToast('Proszę wpisać swoje imię!', 'error');
      return;
    }

    // Zapisz imię w stanie i LocalStorage
    state.userName = name;
    
    // Inicjalizacja planu, jeśli jest pusty (na wypadek, gdyby load() nie załadowało)
    if (state.plan10Days.length === 0 || state.plan10Days[0].completed === true) {
        state.plan10Days = state.challenges.map(c => ({ ...c }));
    }
    storage.save(); // ZAPISUJE DANE TRWALE

    // Ukryj ekran powitalny i pokaż aplikację
    this.hideWelcomeScreen();

    // Renderuj dashboard
    this.renderDashboard();
    this.updateDashboardKPIs();

    // Pokaż powitanie
    this.showToast(`Witaj ${name}! 🎉 Zacznijmy Twoją przygodę z ergonomią!`, 'success');
    this.triggerConfetti();
  },

  navigateTo(section) {
    // Update active menu item - find by data-section attribute
    document.querySelectorAll('.menu-item').forEach(item => {
      if (item.getAttribute('data-section') === section) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Hide all sections
    document.querySelectorAll('.section').forEach(s => {
      s.classList.remove('active');
    });

    // Show target section
    state.currentSection = section;
    const targetSection = document.getElementById(section + 'Section');
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Render section content
    switch(section) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'audit':
        this.renderAudit();
        break;
      case 'plan':
        this.renderPlan();
        break;
      case 'exercises':
        this.renderExercises();
        break;
      case 'education':
        this.renderEducation();
        break;
      case 'results':
        this.renderResults();
        break;
      case 'gamification':
        this.renderGamification();
        break;
    }

    // Scroll to top
    window.scrollTo(0, 0);,

  handleDashboardCTA() {
    // Handle the CTA button on dashboard
    const completedDays = state.plan10Days.filter(d => d.completed).length;
    if (completedDays < state.plan10Days.length) {
      this.navigateTo('plan');
    } else {
      this.showToast('Gratulacje! Wszystkie wyzwania ukończone!', 'success');
    }
  }
  },

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  },

  renderDashboard() {
    this.updateDashboardMetrics();
    this.updateGreeting();
  },

  updateGreeting() {
    // Get current challenge day
    const completedDays = state.plan10Days.filter(d => d.completed).length;
    const currentDay = state.plan10Days[completedDays] || state.plan10Days[state.plan10Days.length - 1];

    // Use userName instead of day name
    const displayName = state.userName || 'Przyjaciół';
    document.getElementById('greetingTitle').textContent = `Witaj, ${displayName}! 🎯`;
    document.getElementById('greetingSubtitle').textContent = `Dzisiaj czeka Cię: ${currentDay.title}`;

    // Update CTA button
    const ctaButton = document.getElementById('dashboardCTA');
    if (currentDay.completed) {
      ctaButton.innerHTML = '<i class="fas fa-check"></i> Gratulacje! Dzisiaj już wszystko zrobiłeś! 🎉';
      ctaButton.className = 'btn btn--success btn--lg';
    } else if (completedDays > 0) {
      ctaButton.innerHTML = '<i class="fas fa-forward"></i> Kontynuuj wyzwanie';
      ctaButton.className = 'btn btn--primary btn--lg';
    } else {
      ctaButton.innerHTML = '<i class="fas fa-play"></i> Zacznij dzisiejsze wyzwanie';
      ctaButton.className = 'btn btn--primary btn--lg';
    }

    // Update motivational quote
    const quotes = [
      'Dzisiaj poprawiasz swoją ergonomię - jeden krok do zdrowszego kręgosłupa! 💪',
      'Twoje plecy Ci dziękują za każde wyzwanie. Jeśli się nie dziękują, rób więcej ćwiczeń! 😄',
      'Ergonomia to nie luksus, to inwestycja w Twoje przyszłe "ja" bez bólu. 🎯',
      'Pamiętaj: siedź jak król, pracuj jak uczony, ruszaj się jak atleta! 🏆',
      'Zero wyzwań opuszczonych = zero żalu jutro. Let\'s go! 🚀'
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').textContent = randomQuote;
  },

  updateDashboardMetrics() {
    // 1. Ergonomia
    const latestAudit = state.auditHistory[state.auditHistory.length - 1];
    const ergonomicsEl = document.getElementById('metricErgonomics');
    if (latestAudit) {
      ergonomicsEl.textContent = latestAudit.score + '%';
      // Update color based on score
      const card = ergonomicsEl.closest('.metric-card');
      if (latestAudit.score >= 85) {
        card.style.borderColor = 'var(--color-success)';
      } else if (latestAudit.score >= 70) {
        card.style.borderColor = 'var(--color-primary)';
      } else if (latestAudit.score >= 50) {
        card.style.borderColor = 'var(--color-warning)';
      } else {
        card.style.borderColor = 'var(--color-error)';
      }
    } else {
      ergonomicsEl.textContent = '--';
      document.getElementById('ergonomicsProgress').textContent = 'Wykonaj swój pierwszy audyt';
    }

    // 2. Dzisiejsze Wyzwanie
    const completedDays = state.plan10Days.filter(d => d.completed).length;
    const currentDay = state.plan10Days[completedDays];
    if (currentDay) {
      document.getElementById('metricChallenge').textContent = currentDay.title;
    } else {
      document.getElementById('metricChallenge').textContent = 'Wszystko ukończone! 🎉';
    }

    // 3. Streak
    document.getElementById('metricStreak').textContent = state.streak;

    // 4. Odznaki
    const unlockedCount = state.badges.filter(b => b.unlocked).length;
    document.getElementById('metricBadges').textContent = `${unlockedCount} / ${state.badges.length}`;

    // 5. Skutki zdrowotne
    const healthConsequences = this.countHealthConsequences();
    document.getElementById('metricHealth').textContent = healthConsequences;

    // 6. Ćwiczenia dzisiaj
    const exercisesToday = this.calculateExercisesToday();
    document.getElementById('metricExercises').textContent = exercisesToday.percentage + '%';
    document.getElementById('exercisesProgressFill').style.width = exercisesToday.percentage + '%';

    // 7. Gamifikacja Level
    const currentLevel = this.getCurrentLevel();
    const nextLevel = this.getNextLevel();
    document.getElementById('metricLevel').textContent = currentLevel.name;

    // Always show progress to Platinum (1620)
    const platinumThreshold = 1620;
    if (state.points >= platinumThreshold) {
      document.getElementById('metricPoints').textContent = `${state.points} pkt (Platinum osiągnięty! 🎉)`;
      document.getElementById('levelProgressFill').style.width = '100%';
    } else {
      const pointsToPlat = platinumThreshold - state.points;
      document.getElementById('metricPoints').textContent = `${state.points} / ${platinumThreshold} pkt do Platinum`;
      const progressPercentage = Math.round((state.points / platinumThreshold) * 100);
      document.getElementById('levelProgressFill').style.width = progressPercentage + '%';
    }

    // 8. Quiz Bonusowy
    this.updateQuizBonusMetric();
  },

  updateQuizBonusMetric() {
    const quizCard = document.getElementById('quizBonusCard');
    const metricQuiz = document.getElementById('metricQuiz');
    const quizStatus = document.getElementById('quizStatus');
    const currentLevel = this.getCurrentLevel();
    const isPlatinum = state.points >= 1620;

    if (isPlatinum) {
      // Unlocked
      quizCard.classList.remove('locked');
      quizCard.classList.add('unlocked');

      if (state.quizCompleted) {
        quizCard.classList.add('completed');
        metricQuiz.textContent = '✓ Quiz Wykonany';
        quizStatus.textContent = 'Gratulacje! +500 pkt';
        quizStatus.style.color = 'var(--color-success)';
      } else {
        quizCard.classList.remove('completed');
        metricQuiz.textContent = 'Sprawdź swoją wiedzę!';
        quizStatus.textContent = '+500 pkt za wykonanie';
        quizStatus.style.color = 'var(--color-purple-500)';
      }
    } else {
      // Locked
      quizCard.classList.add('locked');
      quizCard.classList.remove('unlocked', 'completed');
      metricQuiz.innerHTML = '🔒 Odblokuj na Platinum';
      const pointsNeeded = 1620 - state.points;
      const percentToGo = Math.round((state.points / 1620) * 100);
      quizStatus.textContent = `${percentToGo}% do odblokowania (${pointsNeeded} pkt)`;
      quizStatus.style.color = 'var(--color-text-secondary)';
    }
  },

  countHealthConsequences() {
    const latestAudit = state.auditHistory[state.auditHistory.length - 1];
    if (!latestAudit) return '--';

    const uniqueRisks = new Set();
    latestAudit.risks.forEach(risk => uniqueRisks.add(risk));

    return `${uniqueRisks.size} zagrożeń`;
  },

  calculateExercisesToday() {
    // This function assumes a daily exercise target (e.g., 3 exercises a day)
    // For now, let's assume a simple fixed goal of 5 exercises per day for the purpose of this metric
    const targetExercises = 5; 
    const today = new Date().toDateString();
    
    // Count unique exercises completed today (simplified check for demo)
    const completedToday = state.completedExercises.filter(id => {
        // We'll use the lastActivityDate or similar mechanism in a real app
        // For now, we'll just return the number of unique exercises
        return true; 
    }).length; 
    
    // Correct way would involve checking against lastActivityDate or adding a date to completedExercises array
    
    const percentage = Math.min(100, Math.round((completedToday / targetExercises) * 100));

    return { percentage: percentage, completed: completedToday, total: targetExercises };
  },

  showMetricTooltip(metricId) {
    const tooltips = {
      'ergonomia': 'Ile procent Twojego stanowiska pracy jest ergonomicznie poprawne. Im wyżej, tym mniej będziesz chodzić do lekarza 🏥. Czemu nie 100%? Bo nie jesteś robotem... choć byłoby fajnie 🤖',
      'daily-challenge': 'Które z 10 dni wyzwań masz dzisiaj do wykonania. Może to bycie rewolucjonistą i dostosowanie monitora, a może spacer biurowy (aka "losowe poruszanie się po biurze" 😄)',
      'streak': 'Ile dni z rzędu nie zignorowałeś wyzwań. Jak licznik w grze! 🎮 Każdy dzień to +1 punkt do Twojego zdrowia (i do ego 💪)',
      'badges': 'Ile odznak już masz? To jak kolekcja Pokemon, ale dla Twojej ergonomii 🏆. Każda odznaka to proof że coś zrobiłeś (i że istniejesz 😎)',
      'health-consequences': 'Ile skutków zdrowotnych Twój audyt odkrył. To jak lista "rzeczy do zrobienia" ale dla Twojego ciała. Im mniej, tym lepiej! 🎯',
      'exercises-today': 'Jaki procent dzisiejszych ćwiczeń już zrobiłeś? Jeszcze 0%? Nie ma problemu, dzień dopiero się zaczyna! ☀️ Już 100%? Jesteś legend! 🌟',
      'gamification-level': 'Jakim jesteś poziomem w grze ergonomii? Bronze to początek, Platinum to legenda 👑. Punkty zbierasz za: wyzwania (50 pkt), ćwiczenia (25 pkt), odznaki (50-200 pkt). Platinum = 1620 punktów (90% pełnej puli bez quizu)!',
      'quiz-bonus': 'Bonus dla najlepszych! Osiągnij Platinum (1620+ punktów = 90% pełnej puli), aby odblokować Quiz. Wykonaj go, aby zdobyć dodatkowe 500 punktów i zostać Legendą Ergonomii! 🧠'
    };
    this.showToast(tooltips[metricId] || 'Brak opisu dla tej metryki.', 'info', 8000);
  },
  
  // ==================================================================================
  // AUDYT LOGIC
  // ==================================================================================

  renderAudit() {
    state.currentAudit = JSON.parse(JSON.stringify(state.auditSections));
    const content = document.getElementById('auditSection');
    let html = '<div class="audit-container">';

    state.currentAudit.forEach(section => {
      html += `<div class="audit-section-card">`;
      html += `<div class="audit-section-header">`;
      html += `<h3><i class="${section.icon}"></i> ${section.title} (${section.weight}%)</h3>`;
      html += `</div>`;

      // Handle Laptop section
      if (section.hasApplies) {
        html += `<div class="audit-applies-toggle">`;
        html += `<label><input type="checkbox" onchange="app.toggleLaptopApplies()" ${section.applies ? 'checked' : ''}> Czy pracujesz na laptopie?</label>`;
        html += `</div>`;

        if (section.applies) {
           html += `<div class="audit-questions">`;
            section.questions.forEach((q, idx) => {
               html += `
                <div class="audit-question-item ${q.checked ? 'checked' : 'unchecked'}">
                    <label style="display: flex; align-items: flex-start; gap: var(--space-12); cursor: pointer;">
                        <input type="checkbox" ${q.checked ? 'checked' : ''} onchange="app.toggleAuditQuestion(${section.id}, ${idx})" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer; accent-color: var(--color-primary);">
                        <span style="flex: 1; line-height: 1.5;">${q.text}</span>
                        ${!q.checked ? '<i class="fas fa-exclamation-triangle" style="color: var(--color-red-500); font-size: 16px; margin-top: 2px;"></i>' : ''}
                    </label>
                </div>
               `;
            });
            html += '</div>';
        } else {
             html += `<p style="color: var(--color-text-secondary); padding: var(--space-12);">Pomiń tę sekcję, jeśli nie pracujesz na laptopie.</p>`;
        }
      } 
      
      // Handle Dual Monitor section
      else if (section.hasMode) {
        html += `<div class="audit-mode-selector">`;
        html += `<label for="monitorMode${section.id}">Jaki masz setup z dwoma monitorami?</label>`;
        html += `<select id="monitorMode${section.id}" onchange="app.setMonitorMode(event.target.value)">`;
        html += `<option value="na" ${section.mode === 'na' ? 'selected' : ''}>Nie dotyczy/Jeden monitor</option>`;
        html += `<option value="sym" ${section.mode === 'sym' ? 'selected' : ''}>Symetryczne (dwa główne)</option>`;
        html += `<option value="mix" ${section.mode === 'mix' ? 'selected' : ''}>Jeden główny + pomocniczy</option>`;
        html += `</select>`;
        html += `</div>`;

        // Show questions based on mode
        if (section.mode === 'sym') {
          html += '<div class="audit-questions">';
          section.symmetricQuestions.forEach((q, idx) => {
            html += `
                <div class="audit-question-item ${q.checked ? 'checked' : 'unchecked'}">
                    <label style="display: flex; align-items: flex-start; gap: var(--space-12); cursor: pointer;">
                        <input type="checkbox" ${q.checked ? 'checked' : ''} onchange="app.toggleMonitorQuestion('sym', ${idx})" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer; accent-color: var(--color-primary);">
                        <span style="flex: 1; line-height: 1.5;">${q.text}</span>
                        ${!q.checked ? '<i class="fas fa-exclamation-triangle" style="color: var(--color-warning); font-size: 16px; margin-top: 2px;"></i>' : ''}
                    </label>
                </div>
            `;
          });
          html += '</div>';
        } else if (section.mode === 'mix') {
          html += '<div class="audit-questions">';
          section.mixedQuestions.forEach((q, idx) => {
            html += `
                <div class="audit-question-item ${q.checked ? 'checked' : 'unchecked'}">
                    <label style="display: flex; align-items: flex-start; gap: var(--space-12); cursor: pointer;">
                        <input type="checkbox" ${q.checked ? 'checked' : ''} onchange="app.toggleMonitorQuestion('mix', ${idx})" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer; accent-color: var(--color-primary);">
                        <span style="flex: 1; line-height: 1.5;">${q.text}</span>
                        ${!q.checked ? '<i class="fas fa-exclamation-triangle" style="color: var(--color-warning); font-size: 16px; margin-top: 2px;"></i>' : ''}
                    </label>
                </div>
            `;
          });
          html += '</div>';
        }
      } 
      
      // Handle standard sections
      else {
        html += '<div class="audit-questions">';
        section.questions.forEach((q, idx) => {
          html += `
            <div class="audit-question-item ${q.checked ? 'checked' : 'unchecked'}">
                <label style="display: flex; align-items: flex-start; gap: var(--space-12); cursor: pointer;">
                    <input type="checkbox" ${q.checked ? 'checked' : ''} onchange="app.toggleAuditQuestion(${section.id}, ${idx})" style="width: 20px; height: 20px; margin-top: 2px; cursor: pointer; accent-color: var(--color-primary);">
                    <span style="flex: 1; line-height: 1.5;">${q.text}</span>
                    ${!q.checked ? `<i class="fas fa-exclamation-triangle" style="color: ${section.id <= 4 ? 'var(--color-orange-500)' : 'var(--color-warning)'}; font-size: 16px; margin-top: 2px;"></i>` : ''}
                </label>
            </div>
          `;
        });
        html += '</div>';
      }
      html += '</div>';
    });

    html += `
        <div style="text-align: center; margin-top: var(--space-40); padding-bottom: var(--space-40);">
            <button class="btn btn--primary btn--lg" onclick="app.completeAudit()">
                <i class="fas fa-clipboard-check"></i> Zakończ Audyt i Otrzymaj Wyniki
            </button>
        </div>
    `;

    html += '</div>';
    content.innerHTML = html;
  },

  toggleLaptopApplies() {
      const laptopSection = state.currentAudit.find(s => s.id === 6);
      if (laptopSection) {
          laptopSection.applies = !laptopSection.applies;
          this.renderAudit(); // Re-render to show/hide questions
      }
  },

  setMonitorMode(mode) {
    const dualMonitorSection = state.currentAudit.find(s => s.id === 5);
    if (dualMonitorSection) {
      dualMonitorSection.mode = mode;
      this.renderAudit(); // Re-render to show correct questions
    }
  },

  toggleAuditQuestion(sectionId, questionIdx) {
    const section = state.currentAudit.find(s => s.id === sectionId);
    if (section) {
      section.questions[questionIdx].checked = !section.questions[questionIdx].checked;
      this.renderAudit(); // Re-render to update checkbox status
    }
  },

  toggleMonitorQuestion(mode, questionIdx) {
    const section = state.currentAudit.find(s => s.id === 5); // Dual monitor section
    if (section) {
      if (mode === 'sym') {
        section.symmetricQuestions[questionIdx].checked = !section.symmetricQuestions[questionIdx].checked;
      } else if (mode === 'mix') {
        section.mixedQuestions[questionIdx].checked = !section.mixedQuestions[questionIdx].checked;
      }
      this.renderAudit(); // Re-render to update checkbox status
    }
  },

  completeAudit() {
    let totalScore = 0;
    let maxScore = 100;
    const risks = [];
    
    state.currentAudit.forEach(section => {
      let sectionMaxScore = section.weight;
      let sectionCurrentScore = 0;
      let questionsToCheck = [];

      if (section.id === 5) { // Dual Monitors
        if (section.mode === 'na') {
          sectionMaxScore = 0; // Don't count this section if N/A
        } else if (section.mode === 'sym') {
          questionsToCheck = section.symmetricQuestions;
        } else if (section.mode === 'mix') {
          questionsToCheck = section.mixedQuestions;
        }
      } else if (section.id === 6) { // Laptop
          if (!section.applies) {
              sectionMaxScore = 0; // Don't count if doesn't apply
          } else {
              questionsToCheck = section.questions;
          }
      } else { // Standard sections
        questionsToCheck = section.questions;
      }

      if (sectionMaxScore > 0) {
        questionsToCheck.forEach(q => {
          if (q.checked) {
            sectionCurrentScore += q.weight;
          } else {
            risks.push(q.healthRisk);
          }
        });
      } else if (sectionMaxScore === 0 && (section.id === 5 || section.id === 6)) {
          // If the section is N/A (dual monitor) or not applied (laptop), we need to reduce maxScore
          maxScore -= section.weight;
      }

      totalScore += sectionCurrentScore;
    });
    
    // Normalize score based on applicable sections
    const finalScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 100;

    const auditResult = {
      score: finalScore,
      date: new Date().toISOString(),
      risks: [...new Set(risks)], // Unique risks
      rawScore: totalScore,
      maxPossibleScore: maxScore
    };

    state.auditHistory.push(auditResult);
    
    // Check first audit badge
    if (state.auditHistory.length === 1) {
        this.checkBadge(1); // Audyt się liczy
        this.addPoints(50);
    }
    
    // Check re-audit badge (5) - Transformation
    if (state.auditHistory.length >= 2) {
        const firstAudit = state.auditHistory[0];
        const improvement = finalScore - firstAudit.score;
        if (improvement >= 30) {
            this.checkBadge(5);
        }
    }
    
    storage.save(); // ZAPISUJE DANE TRWALE
    
    this.showToast(`Audyt zakończony! Wynik: ${finalScore}%`, 'success', 3000);
    this.navigateTo('results');
  },

  // ==================================================================================
  // PLAN LOGIC
  // ==================================================================================

  renderPlan() {
    const content = document.getElementById('planContent');
    let html = '<h2 style="margin-bottom: var(--space-24);">Twój Plan Akcji 10 Dni 🚀</h2>';
    
    const completedDays = state.plan10Days.filter(d => d.completed).length;
    const currentDay = completedDays + 1;
    
    state.plan10Days.forEach((day, idx) => {
      const isBlocked = idx >= currentDay;
      if (idx === 0) html += '<div class="plan-days-grid">';
      html += `
        <div class="plan-day-card ${day.completed ? 'completed' : ''} ${isBlocked ? 'blocked' : ''}">
          <div class="plan-day-header">
            <div class="day-number">${day.day}</div>
            <div style="flex: 1;">
              <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);">${day.dayOfWeek}</div>
              <div class="day-title">${day.title}</div>
            </div>
            ${isBlocked ? '<div style="font-size: 24px; color: var(--color-text-secondary); opacity: 0.5;">🔒</div>' : ''}
          </div>
          <div class="day-task">${day.task}</div>
          <div class="day-footer">
            <div class="day-type">
              <i class="${this.getDayTypeIcon(day.type)}"></i> ${this.getDayTypeLabel(day.type)}
            </div>
            <div class="day-checkbox">
              <input type="checkbox" id="day-${idx}" ${day.completed ? 'checked' : ''} ${isBlocked ? 'disabled' : ''} onchange="app.toggleDay(${idx})">
              <label for="day-${idx}" style="${isBlocked ? 'opacity: 0.5; cursor: not-allowed;' : ''}">${isBlocked ? 'Zablokowane' : 'Wykonane'}</label>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    content.innerHTML = html;
  },
  
  getDayTypeIcon(type) {
    const icons = {
      audit: 'fas fa-clipboard-check',
      action: 'fas fa-cog',
      exercise: 'fas fa-dumbbell',
      education: 'fas fa-book',
      reflection: 'fas fa-lightbulb',
      habit: 'fas fa-repeat',
      celebration: 'fas fa-trophy'
    };
    return icons[type] || 'fas fa-circle';
  },
  
  getDayTypeLabel(type) {
    const labels = {
      audit: 'Audyt',
      action: 'Akcja',
      exercise: 'Ćwiczenie',
      education: 'Edukacja',
      reflection: 'Refleksja',
      habit: 'Nawyk',
      celebration: 'Gratulacje'
    };
    return labels[type] || type;
  },
  
  toggleDay(idx) {
    const today = new Date().toDateString();
    const isCompleted = state.plan10Days[idx].completed;
    
    if (isCompleted) {
      // Un-complete is usually not allowed in a real app, but for demo we can allow it
      state.plan10Days[idx].completed = false;
      this.removePoints(50);
      this.showToast('Zadanie cofnięte. Spróbuj wykonać je ponownie!', 'info');
    } else {
      state.plan10Days[idx].completed = true;
      state.plan10Days[idx].completedDate = today;
      
      // Update streak
      this.updateStreak();
      
      // Add points
      this.addPoints(50);
      this.showToast('Wyzwanie dnia ukończone! +50 punktów', 'success');
      
      // Check badges (2, 3, 4)
      const completedCount = state.plan10Days.filter(d => d.completed).length;
      if (completedCount >= 1) this.checkBadge(2);
      if (completedCount >= 5) this.checkBadge(3);
      if (completedCount >= 10) {
          this.checkBadge(4);
          // Check Legenda audytu badge (6)
          const latestAudit = state.auditHistory[state.auditHistory.length - 1];
          if (latestAudit && latestAudit.score >= 85) {
              this.checkBadge(6);
          }
      }
    }
    
    storage.save(); // ZAPISUJE DANE TRWALE
    this.renderPlan();
    this.renderDashboard();
    this.updateDashboardMetrics();
  },

  updateStreak() {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare only date

      if (!state.lastActivityDate) {
          state.streak = 1;
      } else {
          const lastDate = new Date(state.lastActivityDate);
          lastDate.setHours(0, 0, 0, 0);
          
          const diffTime = Math.abs(today - lastDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

          if (diffDays === 1) {
              state.streak += 1; // Consecutive day
          } else if (diffDays > 1) {
              state.streak = 1; // Streak broken, reset
          } 
          // If diffDays is 0, it means activity was today, streak remains the same
      }
      
      state.lastActivityDate = today.toISOString();
  },

  // ==================================================================================
  // ĆWICZENIA LOGIC
  // ==================================================================================
  
  renderExercises() {
    const content = document.getElementById('exercisesContent');
    let html = '<h2 style="margin-bottom: var(--space-24);">Ćwiczenia i Relaks 🧘‍♀️</h2>';
    html += '<p style="color: var(--color-text-secondary); margin-bottom: var(--space-32);">Wybierz zestaw i ćwicz w trakcie mikroprzerw. Ukończone ćwiczenia są oznaczone, a każde daje Ci +25 punktów!</p>';

    html += '<div class="exercise-categories-grid">';
    Object.entries(state.exercises).forEach(([key, category]) => {
      html += `
        <div class="exercise-category-card">
          <div class="category-header">
            <i class="${category.icon}"></i>
            <h3>${category.title}</h3>
          </div>
          <ul class="exercise-list">
            ${category.exercises.map((ex, idx) => `
              <li class="exercise-item ${state.completedExercises.includes(`${key}-${idx}`) ? 'completed' : ''}" onclick="app.startExercise('${key}', ${idx})">
                <div class="exercise-item-header">
                  <div class="exercise-name">${ex.name}</div>
                  <div class="exercise-duration"><i class="fas fa-clock"></i> ${ex.duration}s</div>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    });
    html += '</div>';
    content.innerHTML = html;
  },
  
  startExercise(categoryKey, exerciseIdx) {
    const exercise = state.exercises[categoryKey].exercises[exerciseIdx];
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('exerciseModalContent');
    let timeLeft = exercise.duration;
    let timerInterval;
    
    const formatTime = (seconds) => {
      if (seconds >= 60) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
      }
      return `${seconds}s`;
    };

    const updateTimer = () => {
      document.getElementById('timerValue').textContent = formatTime(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timerValue').textContent = 'Wykonane!';
        document.getElementById('timerValue').style.color = 'var(--color-success)';
        this.completeExercise(categoryKey, exerciseIdx);
        setTimeout(() => {
          this.closeExerciseModal();
        }, 1500);
      }
      
      timeLeft--;
    };

    content.innerHTML = `
      <div class="timer-display">
        <div class="timer-circle" id="timerValue">${formatTime(timeLeft)}</div>
        <div class="timer-exercise-name">${exercise.name}</div>
        <div class="timer-description">${exercise.description}</div>
        <div class="timer-controls">
          <button class="btn btn--primary" onclick="app.closeExerciseModal()">
            <i class="fas fa-stop"></i> Zatrzymaj
          </button>
        </div>
      </div>
    `;
    modal.classList.add('show');
    timerInterval = setInterval(updateTimer, 1000);
    
    // Store interval so we can clear it when modal closes
    modal.timerInterval = timerInterval;
  },

  closeExerciseModal() {
    const modal = document.getElementById('exerciseModal');
    if (modal.timerInterval) {
        clearInterval(modal.timerInterval);
    }
    modal.classList.remove('show');
    this.renderExercises(); // Re-render to update completion status
    this.updateDashboardMetrics(); // Update dashboard metric
  },

  completeExercise(categoryKey, exerciseIdx) {
    const exerciseId = `${categoryKey}-${exerciseIdx}`;
    
    if (!state.completedExercises.includes(exerciseId)) {
      state.completedExercises.push(exerciseId);
      this.addPoints(25);
      this.showToast('Ćwiczenie ukończone! +25 punktów', 'success');
      
      // Check badge
      if (state.completedExercises.length >= 15) {
        this.checkBadge(8); // Master of exercises
      }
      storage.save(); // ZAPISUJE DANE TRWALE
    }
    
    // Play sound (simple beep)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1); 
    } catch (e) {
        console.log("Could not play sound: ", e);
    }
  },

  // ==================================================================================
  // EDUKACJA LOGIC
  // ==================================================================================
  
  renderEducation() {
    const content = document.getElementById('educationContent');
    let html = '<h2 style="margin-bottom: var(--space-24);">Baza Wiedzy 📚</h2>';
    html += '<p style="color: var(--color-text-secondary); margin-bottom: var(--space-32);">Poczytaj artykuły, aby zrozumieć, dlaczego ergonomia jest kluczowa dla Twojego zdrowia! (+30 punktów za każdy)</p>';
    
    html += '<div class="article-grid">';
    state.articles.forEach((article, idx) => {
      const isRead = state.readArticles.includes(idx);
      html += `
        <div class="article-card ${isRead ? 'read' : ''}" onclick="app.readArticle(${idx})">
          <div class="article-header">
            <div class="article-category">${article.category}</div>
            <div class="article-time"><i class="fas fa-clock"></i> ${article.readingTime} min</div>
          </div>
          <h3 class="article-title">${article.title}</h3>
          <p class="article-summary">${article.content.substring(0, 100)}...</p>
          <div class="article-footer">
            <i class="fas fa-book-open" style="color: var(--color-primary);"></i>
            ${isRead ? '<span style="color: var(--color-success); font-weight: var(--font-weight-bold);">✓ Przeczytane</span>' : '<span>Czytaj dalej...</span>'}
          </div>
        </div>
      `;
    });
    html += '</div>';
    content.innerHTML = html;
  },

  readArticle(idx) {
    const article = state.articles[idx];
    const modal = document.getElementById('articleModal');
    const content = document.getElementById('articleModalContent');
    
    const isRead = state.readArticles.includes(idx);
    
    let html = `
      <div class="article-reader">
        <div class="article-reader-header">
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);">${article.category}</div>
          <h2>${article.title}</h2>
          <div style="color: var(--color-text-secondary); margin-top: var(--space-8); margin-bottom: var(--space-24);"><i class="fas fa-clock"></i> ${article.readingTime} min czytania</div>
        </div>
        <div style="line-height: 1.8; font-size: var(--font-size-base); color: var(--color-text);">
          ${article.content}
        </div>
        ${!isRead ? `
            <div style="margin-top: var(--space-32); text-align: center;">
                <button class="btn btn--primary" onclick="app.markArticleRead(${idx})">
                    <i class="fas fa-check"></i> Oznacz jako przeczytane
                </button>
            </div>
        ` : `
            <div style="margin-top: var(--space-32); text-align: center;">
                <button class="btn btn--success" disabled>
                    <i class="fas fa-check"></i> Przeczytane
                </button>
            </div>
        `}
      </div>
    `;
    modal.classList.add('show');
    content.innerHTML = html;
  },
  
  markArticleRead(idx) {
    if (!state.readArticles.includes(idx)) {
      state.readArticles.push(idx);
      this.addPoints(30);
      this.showToast('Artykuł przeczytany! +30 punktów', 'success');
      
      // Check badges
      if (state.readArticles.length === state.articles.length) {
        this.checkBadge(7); // Educator
      }
      storage.save(); // ZAPISUJE DANE TRWALE
    }
    this.closeArticleModal();
    this.renderEducation();
    this.updateDashboardMetrics();
  },
  
  closeArticleModal() {
    document.getElementById('articleModal').classList.remove('show');
  },

  // ==================================================================================
  // WYNIKI I RAPORTY LOGIC
  // ==================================================================================
  
  renderResults() {
    const content = document.getElementById('resultsContent');
    if (state.auditHistory.length === 0) {
      content.innerHTML = `
        <div style="text-align: center; padding: var(--space-48);">
          <div style="font-size: 64px; color: var(--color-text-secondary); margin-bottom: var(--space-24);">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3 style="margin-bottom: var(--space-16);">Brak wyników</h3>
          <p style="color: var(--color-text-secondary); margin-bottom: var(--space-24);">Wykonaj pierwszy audyt ergonomii, aby zobaczyć swoje wyniki.</p>
          <button class="btn btn--primary" onclick="app.navigateTo('audit')">
            <i class="fas fa-play"></i> Rozpocznij audyt
          </button>
        </div>
      `;
      return;
    }

    const latestAudit = state.auditHistory[state.auditHistory.length - 1];
    const statusInfo = this.getStatusInfo(latestAudit.score);
    const completedDays = state.plan10Days.filter(d => d.completed).length;

    let html = `
      <div class="results-main-stat">
        <div class="main-stat-value" style="color: ${statusInfo.color};">${latestAudit.score}%</div>
        <div class="main-stat-label">${statusInfo.label}</div>
      </div>
      <div class="results-grid">
        <div class="result-card">
          <div class="result-card-header">
            <div class="result-card-title">Dni w wyzwaniu</div>
            <div class="result-card-value">${completedDays} / 10</div>
          </div>
        </div>
        <div class="result-card">
          <div class="result-card-header">
            <div class="result-card-title">Punkty</div>
            <div class="result-card-value">${state.points} pkt</div>
          </div>
        </div>
        <div class="result-card">
          <div class="result-card-header">
            <div class="result-card-title">Streak</div>
            <div class="result-card-value">${state.streak} dni</div>
          </div>
        </div>
        <div class="result-card">
          <div class="result-card-header">
            <div class="result-card-title">Zagrożenia</div>
            <div class="result-card-value">${latestAudit.risks.length} unikalnych</div>
          </div>
        </div>
      </div>
    `;

    html += '<h3 style="margin-top: var(--space-40); margin-bottom: var(--space-24);">Spersonalizowany Raport Ryzyka</h3>';
    
    // Group unchecked items by healthRisk
    const groupedByRisk = {};
    
    state.currentAudit.forEach(section => {
      let questionsToCheck = [];
      
      if (section.id === 5) { // Dual Monitors
        if (section.mode === 'sym') {
          questionsToCheck = section.symmetricQuestions;
        } else if (section.mode === 'mix') {
          questionsToCheck = section.mixedQuestions;
        }
      } else if (section.id === 6) { // Laptop
          if (section.applies) {
              questionsToCheck = section.questions;
          }
      } else { // Standard sections
        questionsToCheck = section.questions;
      }
      
      questionsToCheck.forEach(q => {
          if (!q.checked) {
              if (!groupedByRisk[q.healthRisk]) {
                  groupedByRisk[q.healthRisk] = [];
              }
              groupedByRisk[q.healthRisk].push(q.text);
          }
      });
      
      // Also add risks from the latest completed audit if we're not running a fresh one
      if (latestAudit && latestAudit.risks.length > 0) {
          latestAudit.risks.forEach(riskKey => {
              // Ensure we only add a risk if it's not present from the current audit run (to avoid duplicates if the user clicked audit just now)
              if (!groupedByRisk[riskKey]) {
                  // This is a placeholder for risks that came from the stored audit
                  groupedByRisk[riskKey] = groupedByRisk[riskKey] || [];
              }
          });
      }
    });

    let risksFound = Object.keys(groupedByRisk).filter(key => groupedByRisk[key].length > 0);
    
    if (risksFound.length === 0 && latestAudit.risks.length > 0) {
        risksFound = latestAudit.risks;
    } else if (risksFound.length === 0 && latestAudit.risks.length === 0) {
        html += '<div style="text-align: center; padding: var(--space-48); background: var(--color-bg-2); border-radius: var(--radius-lg);">';
        html += '<i class="fas fa-heart-circle-check" style="font-size: 48px; color: var(--color-success); margin-bottom: var(--space-16);"></i>';
        html += '<h4 style="margin-bottom: var(--space-8);">Brak Zidentyfikowanych Zagrożeń!</h4>';
        html += '<p style="color: var(--color-text-secondary);">Twoje stanowisko pracy jest w świetnej formie ergonomicznej. Utrzymaj te nawyki!</p>';
        html += '</div>';
    }
    
    // Sort risks by urgency (critical, high, medium)
    let sortedRisks = Object.entries(groupedByRisk).sort((a, b) => {
        const urgencyOrder = { critical: 0, high: 1, medium: 2 };
        const urgencyA = state.healthConsequences[a[0]]?.urgency || 'medium';
        const urgencyB = state.healthConsequences[b[0]]?.urgency || 'medium';
        return urgencyOrder[urgencyA] - urgencyOrder[urgencyB];
    });

    sortedRisks.forEach(([riskKey, items]) => {
      const consequence = state.healthConsequences[riskKey];
      if (!consequence) return;
      
      const borderColor = consequence.urgency === 'critical' ? 'var(--color-red-500)' : consequence.urgency === 'high' ? 'var(--color-orange-500)' : 'var(--color-yellow-500)';

      html += `
        <div style="background: var(--color-surface); padding: var(--space-20); border-radius: var(--radius-base); margin-bottom: var(--space-16); border-left: 4px solid ${borderColor};">
          <div style="display: flex; align-items: flex-start; gap: var(--space-12); margin-bottom: var(--space-12);">
            <i class="${consequence.icon}" style="font-size: 24px; color: ${borderColor}; margin-top: 2px;"></i>
            <div style="flex: 1;">
              <div style="font-weight: var(--font-weight-bold); margin-bottom: var(--space-4); font-size: var(--font-size-lg);">${consequence.name}</div>
              <div style="font-size: var(--font-size-xs); color: ${borderColor}; font-weight: var(--font-weight-bold); text-transform: uppercase; margin-bottom: var(--space-8);"> ${consequence.urgency === 'critical' ? '⚠️ KRYTYCZNE' : consequence.urgency === 'high' ? '🔺 WYSOKIE' : '⚠️ ŚREDNIE'} </div>
            </div>
          </div>
          <div style="margin-bottom: var(--space-12); padding-left: var(--space-32);">
            <strong style="display: block; margin-bottom: var(--space-4); font-size: var(--font-size-sm);">Niezaznaczone punkty:</strong>
            ${items.map(item => `<div style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: 4px;"><i class="fas fa-minus-circle" style="color: var(--color-warning); margin-right: 5px;"></i> ${item}</div>`).join('')}
          </div>
          <div style="margin-bottom: var(--space-12); padding-left: var(--space-32);">
            <strong style="display: block; margin-bottom: var(--space-4); font-size: var(--font-size-sm);">Potencjalne Skutki Zdrowotne:</strong>
            <ul style="list-style-type: disc; padding-left: var(--space-24);">
              ${consequence.effects.map(effect => `<li style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: 2px;">${effect}</li>`).join('')}
            </ul>
          </div>
          <div style="margin-bottom: var(--space-12); padding-left: var(--space-32);">
            <strong style="display: block; margin-bottom: var(--space-4); font-size: var(--font-size-sm);">Proponowane Działania Korekcyjne:</strong>
            <ul style="list-style-type: square; padding-left: var(--space-24);">
              ${consequence.actionItems.map(action => `<li style="font-size: var(--font-size-sm); color: var(--color-primary); font-weight: var(--font-weight-semibold); margin-bottom: 2px;">${action}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    });
    
    // Action buttons
    html += `
        <div style="text-align: center; margin-top: var(--space-40);">
            <button class="btn btn--primary btn--lg" onclick="app.navigateTo('plan')">
                <i class="fas fa-calendar-check"></i> Przejdź do wyzwań 10-dniowych
            </button>
            <button class="btn btn--outline btn--lg" onclick="app.showAuditHistory()">
                <i class="fas fa-chart-line"></i> Zobacz historię audytów
            </button>
            <button class="btn btn--outline btn--lg" onclick="app.renderAudit()">
                <i class="fas fa-redo"></i> Nowy audyt
            </button>
        </div>
    `;

    content.innerHTML = html;
  },

  getStatusInfo(score) {
    if (score >= 85) return { label: 'Doskonała Ergonomia!', color: 'var(--color-success)' };
    if (score >= 70) return { label: 'Dobra Ergonomia', color: 'var(--color-primary)' };
    if (score >= 50) return { label: 'Średnie Ryzyko', color: 'var(--color-warning)' };
    return { label: 'Wysokie Ryzyko', color: 'var(--color-error)' };
  },

  showAuditHistory() {
    // This is the implementation for showing the history (as it was in the original file)
    if (state.auditHistory.length === 0) {
      this.showToast('Brak historii audytów', 'error');
      return;
    }
    
    const content = document.getElementById('resultsContent'); // Use results content area
    const lastAudit = state.auditHistory[state.auditHistory.length - 1];
    const firstAudit = state.auditHistory[0];
    const improvement = lastAudit.score - firstAudit.score;
    const improvementPercent = firstAudit.score > 0 ? Math.round((improvement / firstAudit.score) * 100) : 0;
    
    let html = '<div style="max-width: 800px; margin: 0 auto;">';
    
    if (state.auditHistory.length >= 2) {
        html += '<h3 style="margin-bottom: var(--space-24);">Twoja Transformacja Ergonomiczna 📈</h3>';
        
        html += `
            <div style="display: flex; justify-content: space-around; background: var(--color-bg-1); padding: var(--space-20); border-radius: var(--radius-lg); margin-bottom: var(--space-24); text-align: center;">
                <div>
                    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-8);">Pierwszy audyt</div>
                    <div style="font-size: 48px; font-weight: var(--font-weight-bold); color: var(--color-primary);">${firstAudit.score}%</div>
                    <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-4);">${new Date(firstAudit.date).toLocaleDateString('pl-PL')}</div>
                </div>
                <div style="font-size: 64px; color: var(--color-primary); margin: 0 var(--space-24);">→</div>
                <div>
                    <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-8);">Ostatni audyt</div>
                    <div style="font-size: 48px; font-weight: var(--font-weight-bold); color: var(--color-success);">${lastAudit.score}%</div>
                    <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-4);">${new Date(lastAudit.date).toLocaleDateString('pl-PL')}</div>
                </div>
            </div>
        `;
        
        if (improvement > 0) {
            html += `
                <div style="text-align: center; padding: var(--space-16); background: var(--color-bg-3); border-radius: var(--radius-base); margin-bottom: var(--space-16);">
                    <i class="fas fa-trophy" style="font-size: 24px; color: var(--color-success); margin-right: 8px;"></i>
                    <span style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold);">Poprawa o ${improvementPercent}%! 🎉</span>
                </div>
            `;
        }
    }
    
    html += '<h4 style="margin: var(--space-24) 0 var(--space-16) 0;">Historia wszystkich audytów</h4>';
    html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-16);">';
    
    state.auditHistory.forEach((audit, idx) => {
        const date = new Date(audit.date).toLocaleDateString('pl-PL');
        html += `
            <div style="background: var(--color-bg-1); padding: var(--space-16); border-radius: var(--radius-base); text-align: center;">
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-8);">Audyt #${idx + 1}</div>
                <div style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-primary);">${audit.score}%</div>
                <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-4);">${date}</div>
            </div>
        `;
    });
    
    html += '</div>';
    
    html += `
        <div style="text-align: center; margin-top: var(--space-40);">
             <button class="btn btn--primary btn--lg" onclick="app.navigateTo('results')">
                <i class="fas fa-arrow-left"></i> Powrót do wyników
            </button>
        </div>
    `;
    
    html += '</div>';
    content.innerHTML = html;
  },

  exportReport() {
    this.showToast('Funkcja eksportu raportu wkrótce dostępna!', 'info');
  },

  // ==================================================================================
  // GAMIFIKACJA I PUNKTY LOGIC
  // ==================================================================================
  
  renderGamification() {
    const content = document.getElementById('gamificationContent');
    const currentLevel = this.getCurrentLevel();
    const nextLevel = this.getNextLevel();
    
    const platinumThreshold = 1620;
    const progressPercentage = Math.round((state.points / platinumThreshold) * 100);
    const pointsToNextLevel = nextLevel ? nextLevel.minPoints - state.points : 0;

    let html = '<h2 style="margin-bottom: var(--space-24);">Twoje Postępy i Odznaki 🏆</h2>';
    
    // Level Progress
    html += `
        <div style="background: var(--color-surface); border: 2px solid var(--color-card-border); border-radius: var(--radius-lg); padding: var(--space-24); margin-bottom: var(--space-32); text-align: center;">
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Twój Poziom</div>
            <div style="font-size: 64px; font-weight: var(--font-weight-bold); color: var(--color-primary); margin-bottom: var(--space-8);">${currentLevel.name}</div>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-8);">${currentLevel.description}</p>
            
            <div style="margin-top: var(--space-24);">
                <div style="font-size: var(--font-size-sm); display: flex; justify-content: space-between; margin-bottom: var(--space-8);">
                    <span>Punkty: ${state.points}</span>
                    <span>${state.points >= platinumThreshold ? 'Platinum Osiągnięty' : `Do Platinum: ${pointsToNextLevel} pkt`}</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progressPercentage}%;"></div>
                </div>
            </div>
            ${state.points < platinumThreshold && nextLevel ? `<div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-8);">Następny poziom: ${nextLevel.name} (${nextLevel.minPoints} pkt)</div>` : ''}
        </div>
    `;
    
    // Points System
    html += `
        <div style="background: var(--color-surface); border: 2px solid var(--color-card-border); border-radius: var(--radius-lg); padding: var(--space-24); margin-bottom: var(--space-32);">
            <h3 style="margin-bottom: var(--space-16);"><i class="fas fa-chart-line"></i> System Punktacji</h3>
            <div style="display: grid; gap: var(--space-12); font-size: var(--font-size-sm);">
                <div style="display: flex; justify-content: space-between; padding: var(--space-8); background: var(--color-bg-1); border-radius: var(--radius-base);">
                    <span>Wyzwania (10 dni × 50 pkt)</span> <strong>500 pkt</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-8); background: var(--color-bg-2); border-radius: var(--radius-base);">
                    <span>Ćwiczenia (20 × 25 pkt)</span> <strong>500 pkt</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-8); background: var(--color-bg-1); border-radius: var(--radius-base);">
                    <span>Artykuły (6 × 30 pkt)</span> <strong>180 pkt</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-8); background: var(--color-bg-2); border-radius: var(--radius-base);">
                    <span>Odznaki (max)</span> <strong>900 pkt</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: var(--space-12); background: var(--color-primary-light); border-radius: var(--radius-base); font-weight: var(--font-weight-bold); margin-top: var(--space-12);">
                    <span>SUMA PUNKTÓW MOŻLIWYCH</span> <strong>2580 pkt</strong>
                </div>
            </div>
        </div>
    `;

    // Badges
    html += '<h3 style="margin-bottom: var(--space-16);"><i class="fas fa-star"></i> Twoje Odznaki</h3>';
    html += '<div class="badges-grid">';
    
    state.badges.forEach(badge => {
        html += `
            <div class="badge-card ${badge.unlocked ? 'unlocked' : ''}">
                <i class="${badge.icon}"></i>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
                <div class="badge-points">${badge.points} pkt</div>
            </div>
        `;
    });
    
    html += '</div>';

    // Clear Storage button for testing/demo purposes
    html += `
        <div style="text-align: center; margin-top: var(--space-40); padding: var(--space-20); background: var(--color-error-light); border-radius: var(--radius-base);">
            <p style="color: var(--color-error); font-weight: var(--font-weight-bold); margin-bottom: var(--space-12);">Strefa resetu danych (Tylko do testów!)</p>
            <button class="btn btn--error" onclick="app.clearStorage()">
                <i class="fas fa-trash"></i> ZRESETUJ CAŁY STAN APLIKACJI
            </button>
        </div>
    `;

    content.innerHTML = html;
  },

  getCurrentLevel() {
    const currentLevel = state.levels.find(level => state.points >= level.minPoints && state.points <= level.maxPoints);
    return currentLevel || state.levels[0];
  },
  
  getNextLevel() {
      const currentLevelIndex = state.levels.findIndex(level => state.points >= level.minPoints && state.points <= level.maxPoints);
      if (currentLevelIndex !== -1 && currentLevelIndex < state.levels.length - 1) {
          return state.levels[currentLevelIndex + 1];
      }
      return null;
  },

  addPoints(amount) {
    state.points += amount;
    this.updateDashboardMetrics(); // Update display immediately
  },
  
  removePoints(amount) {
    state.points = Math.max(0, state.points - amount);
    this.updateDashboardMetrics(); // Update display immediately
  },
  
  checkBadge(id) {
    const badge = state.badges.find(b => b.id === id);
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      this.addPoints(badge.points);
      this.showToast(`Gratulacje! Odblokowano odznakę: ${badge.name} (+ ${badge.points} pkt)`, 'trophy', 5000);
      this.triggerConfetti();
      storage.save();
    }
  },

  clearStorage() {
      storage.clear();
      this.showToast('Cały stan aplikacji został zresetowany. Proszę odświeżyć stronę.', 'error', 5000);
      setTimeout(() => {
          window.location.reload(); // Force reload to show welcome screen
      }, 1000);
  },

  // ==================================================================================
  // UTILITY LOGIC
  // ==================================================================================
  
  showToast(message, type = 'info', duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    // Clear previous classes
    toast.className = 'toast show';
    
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') {
        toast.classList.add('success');
        iconClass = 'fas fa-check-circle';
    } else if (type === 'error') {
        toast.classList.add('error');
        iconClass = 'fas fa-exclamation-triangle';
    } else if (type === 'trophy') {
        toast.classList.add('trophy');
        iconClass = 'fas fa-trophy';
    } else {
        toast.classList.add('info');
    }
    
    // Add icon
    toast.innerHTML = `<i class="${iconClass}" style="margin-right: 8px;"></i> ${message}`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  },
  
  triggerConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    
    // Start particles from the center top
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2, // Start higher up
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        
        if (p.y > canvas.height) {
          particles.splice(index, 1);
        }
      });
      
      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
          canvas.style.display = 'none'; // Hide canvas when done
      }
    };
    
    canvas.style.display = 'block'; // Show canvas
    animate();
  }
};

// ==================================================================================
// URUCHOMIENIE APLIKACJI
// ==================================================================================

// Uruchamiamy inicjalizację po załadowaniu DOM, co jest najlepszą praktyką.
document.addEventListener('DOMContentLoaded', function() {
    app.init();
});
window.app = app;
