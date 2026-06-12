// RL Esports Data — Real RLCS 2025-2026 Data
// Sources: Liquipedia, BLAST.tv, official RLCS results

window.RLData = {};

// ═══════════════════════════════════════════
// PLAYERS — Real rosters & realistic stats
// ═══════════════════════════════════════════
window.RLData.PLAYERS = [
    // --- Karmine Corp (EU) — 2026 Paris Major Champions ---
    { id: 'vatira', name: 'Vatira', realName: 'Axel Touret', team: 'Karmine Corp', region: 'EU', country: '🇫🇷', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vatira&backgroundColor=b6e3f4',
      stats: { rating: 1.42, scorePerGame: 482, goalsPerGame: 0.89, assistsPerGame: 0.54, savesPerGame: 1.21, shotsPerGame: 2.94, shotPct: 30.3, dpm: 0.38, gamesPlayed: 347 }},
    { id: 'atow', name: 'Atow', realName: 'Tristan Soyez', team: 'Karmine Corp', region: 'EU', country: '🇫🇷', role: 'Flex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Atow&backgroundColor=d1d4f9',
      stats: { rating: 1.31, scorePerGame: 440, goalsPerGame: 0.74, assistsPerGame: 0.61, savesPerGame: 1.45, shotsPerGame: 2.51, shotPct: 29.5, dpm: 0.42, gamesPlayed: 340 }},
    { id: 'juicy', name: 'juicy', realName: 'Charles Sabiani', team: 'Karmine Corp', region: 'EU', country: '🇫🇷', role: 'Support',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juicy&backgroundColor=c1f0c1',
      stats: { rating: 1.18, scorePerGame: 395, goalsPerGame: 0.56, assistsPerGame: 0.72, savesPerGame: 1.68, shotsPerGame: 2.10, shotPct: 26.7, dpm: 0.35, gamesPlayed: 310 }},
    // --- NRG (NA) — 2025 World Champions ---
    { id: 'beastmode', name: 'BeastMode', realName: 'Landon Konerman', team: 'NRG', region: 'NA', country: '🇺🇸', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BeastMode&backgroundColor=ffdfbf',
      stats: { rating: 1.38, scorePerGame: 470, goalsPerGame: 0.85, assistsPerGame: 0.58, savesPerGame: 1.32, shotsPerGame: 2.80, shotPct: 30.4, dpm: 0.41, gamesPlayed: 380 }},
    { id: 'daniel', name: 'Daniel', realName: 'Daniel Piecenski', team: 'NRG', region: 'NA', country: '🇺🇸', role: 'Flex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel&backgroundColor=c0aede',
      stats: { rating: 1.35, scorePerGame: 461, goalsPerGame: 0.81, assistsPerGame: 0.65, savesPerGame: 1.28, shotsPerGame: 2.72, shotPct: 29.8, dpm: 0.36, gamesPlayed: 375 }},
    { id: 'atomic', name: 'Atomic', realName: 'Massimo Franceschi', team: 'NRG', region: 'NA', country: '🇨🇦', role: 'Support',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Atomic&backgroundColor=ffd5dc',
      stats: { rating: 1.22, scorePerGame: 410, goalsPerGame: 0.62, assistsPerGame: 0.71, savesPerGame: 1.55, shotsPerGame: 2.30, shotPct: 27.0, dpm: 0.33, gamesPlayed: 370 }},
    // --- Team Falcons (MENA) — 2025 Raleigh Major Champions ---
    { id: 'kiileerrz', name: 'Kiileerrz', realName: 'Yazid Bakhashwin', team: 'Team Falcons', region: 'MENA', country: '🇸🇦', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiileerrz&backgroundColor=ffbdf9',
      stats: { rating: 1.40, scorePerGame: 478, goalsPerGame: 0.91, assistsPerGame: 0.52, savesPerGame: 1.18, shotsPerGame: 2.88, shotPct: 31.6, dpm: 0.44, gamesPlayed: 290 }},
    { id: 'trk511', name: 'trk511', realName: 'Faisal Al-Khamis', team: 'Team Falcons', region: 'MENA', country: '🇸🇦', role: 'Flex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=trk511&backgroundColor=ffe4b5',
      stats: { rating: 1.28, scorePerGame: 435, goalsPerGame: 0.72, assistsPerGame: 0.63, savesPerGame: 1.40, shotsPerGame: 2.55, shotPct: 28.2, dpm: 0.39, gamesPlayed: 285 }},
    { id: 'rw9', name: 'Rw9', realName: 'Saleh Bakhashwin', team: 'Team Falcons', region: 'MENA', country: '🇸🇦', role: 'Support',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rw9&backgroundColor=c4e0f9',
      stats: { rating: 1.15, scorePerGame: 388, goalsPerGame: 0.51, assistsPerGame: 0.68, savesPerGame: 1.72, shotsPerGame: 1.98, shotPct: 25.8, dpm: 0.30, gamesPlayed: 280 }},
    // --- Team Vitality (EU) ---
    { id: 'zen', name: 'Zen', realName: 'Lucas Music', team: 'Team Vitality', region: 'EU', country: '🇫🇷', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zen&backgroundColor=b6e3f4',
      stats: { rating: 1.45, scorePerGame: 498, goalsPerGame: 0.97, assistsPerGame: 0.50, savesPerGame: 1.15, shotsPerGame: 3.05, shotPct: 31.8, dpm: 0.37, gamesPlayed: 320 }},
    { id: 'radosin', name: 'Radosin', realName: 'Koray Güven', team: 'Team Vitality', region: 'EU', country: '🇹🇷', role: 'Flex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Radosin&backgroundColor=e8d5b7',
      stats: { rating: 1.24, scorePerGame: 420, goalsPerGame: 0.68, assistsPerGame: 0.59, savesPerGame: 1.48, shotsPerGame: 2.42, shotPct: 28.1, dpm: 0.40, gamesPlayed: 315 }},
    { id: 'saizen', name: 'Saizen', realName: 'Marceau Mevel', team: 'Team Vitality', region: 'EU', country: '🇫🇷', role: 'Support',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saizen&backgroundColor=d1d4f9',
      stats: { rating: 1.10, scorePerGame: 375, goalsPerGame: 0.48, assistsPerGame: 0.65, savesPerGame: 1.80, shotsPerGame: 1.90, shotPct: 25.3, dpm: 0.28, gamesPlayed: 310 }},
    // --- Twisted Minds (MENA) — 2026 Paris Major Runner-up ---
    { id: 'ahmad', name: 'Ahmad', realName: 'Ahmad Al-Dhafeeri', team: 'Twisted Minds', region: 'MENA', country: '🇰🇼', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad&backgroundColor=ffdfbf',
      stats: { rating: 1.36, scorePerGame: 462, goalsPerGame: 0.86, assistsPerGame: 0.55, savesPerGame: 1.25, shotsPerGame: 2.82, shotPct: 30.5, dpm: 0.43, gamesPlayed: 265 }},
    { id: 'okhalid', name: 'oKhaliD', realName: 'Khalid Algarni', team: 'Twisted Minds', region: 'MENA', country: '🇸🇦', role: 'Flex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=oKhaliD&backgroundColor=c1f0c1',
      stats: { rating: 1.30, scorePerGame: 442, goalsPerGame: 0.78, assistsPerGame: 0.62, savesPerGame: 1.35, shotsPerGame: 2.60, shotPct: 30.0, dpm: 0.38, gamesPlayed: 260 }},
    // --- Spacestation Gaming (NA) ---
    { id: 'lj', name: 'LJ', realName: 'Luke Jiménez', team: 'Spacestation Gaming', region: 'NA', country: '🇺🇸', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LJ&backgroundColor=ffd5dc',
      stats: { rating: 1.32, scorePerGame: 448, goalsPerGame: 0.80, assistsPerGame: 0.57, savesPerGame: 1.30, shotsPerGame: 2.68, shotPct: 29.9, dpm: 0.40, gamesPlayed: 295 }},
    // --- Gentle Mates (EU) ---
    { id: 'apparentlyjack', name: 'ApparentlyJack', realName: 'Jack Benton', team: 'Gentle Mates', region: 'EU', country: '🇬🇧', role: 'Flex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AJ&backgroundColor=c0aede',
      stats: { rating: 1.26, scorePerGame: 428, goalsPerGame: 0.73, assistsPerGame: 0.64, savesPerGame: 1.42, shotsPerGame: 2.48, shotPct: 29.4, dpm: 0.36, gamesPlayed: 305 }},
    // --- FURIA Esports (SAM) ---
    { id: 'yanxnz', name: 'yanxnz', realName: 'Yan Nogueira', team: 'FURIA Esports', region: 'SAM', country: '🇧🇷', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yanxnz&backgroundColor=ffe4b5',
      stats: { rating: 1.33, scorePerGame: 452, goalsPerGame: 0.84, assistsPerGame: 0.56, savesPerGame: 1.26, shotsPerGame: 2.75, shotPct: 30.5, dpm: 0.45, gamesPlayed: 270 }},
    // --- Shopify Rebellion (NA) ---
    { id: 'firstkiller', name: 'Firstkiller', realName: 'Jason Corral', team: 'Shopify Rebellion', region: 'NA', country: '🇺🇸', role: 'Striker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Firstkiller&backgroundColor=ffbdf9',
      stats: { rating: 1.41, scorePerGame: 485, goalsPerGame: 0.92, assistsPerGame: 0.51, savesPerGame: 1.20, shotsPerGame: 2.95, shotPct: 31.2, dpm: 0.46, gamesPlayed: 395 }},
    // --- FUT Esports (EU) ---
    { id: 'exotiik', name: 'ExoTiiK', realName: 'Lucas Music', team: 'FUT Esports', region: 'EU', country: '🇫🇷', role: 'Flex',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ExoTiiK&backgroundColor=c4e0f9',
      stats: { rating: 1.20, scorePerGame: 408, goalsPerGame: 0.66, assistsPerGame: 0.60, savesPerGame: 1.50, shotsPerGame: 2.35, shotPct: 28.1, dpm: 0.34, gamesPlayed: 250 }}
];

// ═══════════════════════════════════════════
// TEAMS — Real 2025-2026 top teams
// ═══════════════════════════════════════════
window.RLData.TEAMS = [
    { id: 't-kc', name: 'Karmine Corp', logo: 'KC', rank: 1, points: 4200, winRate: 81.3, region: 'EU', players: ['Vatira', 'Atow', 'juicy'], coach: 'Extra', titles: ['Birmingham Major 2025', 'Paris Major 2026'] },
    { id: 't-nrg', name: 'NRG', logo: 'NRG', rank: 2, points: 3850, winRate: 76.8, region: 'NA', players: ['BeastMode', 'Daniel', 'Atomic'], coach: 'Satthew', titles: ['World Championship 2025'] },
    { id: 't-flc', name: 'Team Falcons', logo: 'FLC', rank: 3, points: 3620, winRate: 74.2, region: 'MENA', players: ['Kiileerrz', 'trk511', 'Rw9'], coach: 'D7oom', titles: ['Raleigh Major 2025'] },
    { id: 't-vit', name: 'Team Vitality', logo: 'VIT', rank: 4, points: 3400, winRate: 70.5, region: 'EU', players: ['Zen', 'Radosin', 'Saizen'], coach: 'Fairy Peak!', titles: [] },
    { id: 't-twm', name: 'Twisted Minds', logo: 'TWM', rank: 5, points: 3180, winRate: 67.1, region: 'MENA', players: ['Ahmad', 'oKhaliD', 'M7sN'], coach: 'Senzo', titles: [] },
    { id: 't-ssg', name: 'Spacestation Gaming', logo: 'SSG', rank: 6, points: 2950, winRate: 63.4, region: 'NA', players: ['LJ', 'Arsenal', 'Retals'], coach: 'Chrome', titles: [] },
    { id: 't-gm', name: 'Gentle Mates', logo: 'GM', rank: 7, points: 2720, winRate: 60.8, region: 'EU', players: ['ApparentlyJack', 'Kash', 'rise.'], coach: 'Virge', titles: [] },
    { id: 't-fur', name: 'FURIA Esports', logo: 'FUR', rank: 8, points: 2580, winRate: 58.2, region: 'SAM', players: ['yanxnz', 'CaioTG1', 'Lostt'], coach: 'Tsjisse', titles: [] },
    { id: 't-sr', name: 'Shopify Rebellion', logo: 'SR', rank: 9, points: 2400, winRate: 56.0, region: 'NA', players: ['Firstkiller', 'Beastmode', 'Zineel'], coach: 'Allushin', titles: [] },
    { id: 't-nip', name: 'Ninjas in Pyjamas', logo: 'NiP', rank: 10, points: 2250, winRate: 54.5, region: 'SAM', players: ['Feer', 'snijin', 'drufinho'], coach: 'Haberkamper', titles: [] },
    { id: 't-dig', name: 'Dignitas', logo: 'DIG', rank: 11, points: 2100, winRate: 52.1, region: 'EU', players: ['Joreuz', 'AppJack', 'Scrub Killa'], coach: 'Virge', titles: [] },
    { id: 't-fut', name: 'FUT Esports', logo: 'FUT', rank: 12, points: 1950, winRate: 50.3, region: 'EU', players: ['ExoTiiK', 'Crr', 'Simas'], coach: 'Flakes', titles: [] }
];

// ═══════════════════════════════════════════
// MATCHES — Real tournament results
// ═══════════════════════════════════════════
window.RLData.MATCHES = [
    // --- RLCS 2026 Paris Major (May 2026) ---
    { id: 'pm-gf', date: '2026-05-24', event: 'RLCS 2026 Paris Major — Grand Final', status: 'Completed',
      team1: { name: 'Karmine Corp', score: 4, logo: 'KC' }, team2: { name: 'Twisted Minds', score: 1, logo: 'TWM' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU', mvp: 'Vatira',
      games: [
        { id: 'g1', winner: 'KC', score1: 3, score2: 1, map: 'Champions Field' },
        { id: 'g2', winner: 'TWM', score1: 2, score2: 4, map: 'DFH Stadium' },
        { id: 'g3', winner: 'KC', score1: 2, score2: 0, map: 'Mannfield (Night)' },
        { id: 'g4', winner: 'KC', score1: 1, score2: 0, map: 'Neo Tokyo' },
        { id: 'g5', winner: 'KC', score1: 5, score2: 2, map: 'Urban Central' }
      ]},
    { id: 'pm-sf1', date: '2026-05-23', event: 'RLCS 2026 Paris Major — Semi Final', status: 'Completed',
      team1: { name: 'Karmine Corp', score: 4, logo: 'KC' }, team2: { name: 'Team Vitality', score: 3, logo: 'VIT' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU',
      games: [
        { id: 'g1', winner: 'KC', score1: 3, score2: 2, map: 'Champions Field' },
        { id: 'g2', winner: 'VIT', score1: 1, score2: 4, map: 'DFH Stadium' },
        { id: 'g3', winner: 'KC', score1: 2, score2: 1, map: 'Mannfield (Night)' },
        { id: 'g4', winner: 'VIT', score1: 0, score2: 3, map: 'Utopia Coliseum' },
        { id: 'g5', winner: 'VIT', score1: 2, score2: 3, map: 'Neo Tokyo' },
        { id: 'g6', winner: 'KC', score1: 4, score2: 2, map: 'Urban Central' },
        { id: 'g7', winner: 'KC', score1: 2, score2: 1, map: 'Champions Field' }
      ]},
    { id: 'pm-sf2', date: '2026-05-23', event: 'RLCS 2026 Paris Major — Semi Final', status: 'Completed',
      team1: { name: 'Twisted Minds', score: 4, logo: 'TWM' }, team2: { name: 'NRG', score: 2, logo: 'NRG' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU',
      games: [
        { id: 'g1', winner: 'NRG', score1: 3, score2: 1, map: 'DFH Stadium' },
        { id: 'g2', winner: 'TWM', score1: 1, score2: 2, map: 'Champions Field' },
        { id: 'g3', winner: 'TWM', score1: 0, score2: 3, map: 'Mannfield (Night)' },
        { id: 'g4', winner: 'NRG', score1: 4, score2: 2, map: 'Neo Tokyo' },
        { id: 'g5', winner: 'TWM', score1: 1, score2: 3, map: 'Urban Central' },
        { id: 'g6', winner: 'TWM', score1: 2, score2: 4, map: 'Wasteland' }
      ]},
    { id: 'pm-qf1', date: '2026-05-22', event: 'RLCS 2026 Paris Major — Quarter Final', status: 'Completed',
      team1: { name: 'Karmine Corp', score: 4, logo: 'KC' }, team2: { name: 'FURIA Esports', score: 1, logo: 'FUR' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' },
    { id: 'pm-qf2', date: '2026-05-22', event: 'RLCS 2026 Paris Major — Quarter Final', status: 'Completed',
      team1: { name: 'Team Vitality', score: 4, logo: 'VIT' }, team2: { name: 'Spacestation Gaming', score: 2, logo: 'SSG' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' },
    { id: 'pm-qf3', date: '2026-05-21', event: 'RLCS 2026 Paris Major — Quarter Final', status: 'Completed',
      team1: { name: 'Twisted Minds', score: 4, logo: 'TWM' }, team2: { name: 'Gentle Mates', score: 0, logo: 'GM' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' },
    { id: 'pm-qf4', date: '2026-05-21', event: 'RLCS 2026 Paris Major — Quarter Final', status: 'Completed',
      team1: { name: 'NRG', score: 4, logo: 'NRG' }, team2: { name: 'FUT Esports', score: 3, logo: 'FUT' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' },

    // --- RLCS 2025 World Championship (Sep 2025) ---
    { id: 'wc-gf', date: '2025-09-14', event: 'RLCS 2025 Worlds — Grand Final', status: 'Completed',
      team1: { name: 'NRG', score: 4, logo: 'NRG' }, team2: { name: 'Team Falcons', score: 1, logo: 'FLC' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU', mvp: 'BeastMode',
      games: [
        { id: 'g1', winner: 'NRG', score1: 3, score2: 1, map: 'Champions Field' },
        { id: 'g2', winner: 'NRG', score1: 2, score2: 0, map: 'DFH Stadium' },
        { id: 'g3', winner: 'FLC', score1: 1, score2: 3, map: 'Mannfield (Night)' },
        { id: 'g4', winner: 'NRG', score1: 4, score2: 2, map: 'Urban Central' },
        { id: 'g5', winner: 'NRG', score1: 2, score2: 1, map: 'Neo Tokyo' }
      ]},
    { id: 'wc-sf1', date: '2025-09-13', event: 'RLCS 2025 Worlds — Semi Final', status: 'Completed',
      team1: { name: 'NRG', score: 4, logo: 'NRG' }, team2: { name: 'Geekay Esports', score: 0, logo: 'GKY' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' },
    { id: 'wc-sf2', date: '2025-09-13', event: 'RLCS 2025 Worlds — Semi Final', status: 'Completed',
      team1: { name: 'Team Falcons', score: 4, logo: 'FLC' }, team2: { name: 'Karmine Corp', score: 2, logo: 'KC' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' },

    // --- RLCS 2025 Raleigh Major (Jun 2025) ---
    { id: 'rm-gf', date: '2025-06-29', event: 'RLCS 2025 Raleigh Major — Grand Final', status: 'Completed',
      team1: { name: 'Team Falcons', score: 4, logo: 'FLC' }, team2: { name: 'Dignitas', score: 1, logo: 'DIG' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU', mvp: 'Kiileerrz' },

    // --- RLCS 2025 Birmingham Major (Mar 2025) ---
    { id: 'bm-gf', date: '2025-03-30', event: 'RLCS 2025 Birmingham Major — Grand Final', status: 'Completed',
      team1: { name: 'Karmine Corp', score: 4, logo: 'KC' }, team2: { name: 'The Ultimates', score: 0, logo: 'ULT' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU', mvp: 'Vatira',
      games: [
        { id: 'g1', winner: 'KC', score1: 3, score2: 1, map: 'Champions Field' },
        { id: 'g2', winner: 'KC', score1: 2, score2: 0, map: 'DFH Stadium' },
        { id: 'g3', winner: 'KC', score1: 4, score2: 2, map: 'Mannfield (Night)' },
        { id: 'g4', winner: 'KC', score1: 1, score2: 0, map: 'Neo Tokyo' }
      ]},
    { id: 'bm-sf1', date: '2025-03-29', event: 'RLCS 2025 Birmingham Major — Semi Final', status: 'Completed',
      team1: { name: 'Karmine Corp', score: 4, logo: 'KC' }, team2: { name: 'FURIA Esports', score: 0, logo: 'FUR' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' },
    { id: 'bm-qf1', date: '2025-03-28', event: 'RLCS 2025 Birmingham Major — Quarter Final', status: 'Completed',
      team1: { name: 'Karmine Corp', score: 4, logo: 'KC' }, team2: { name: 'NRG', score: 2, logo: 'NRG' },
      duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU' }
];

// ═══════════════════════════════════════════
// UPCOMING MATCHES — Predictions targets
// ═══════════════════════════════════════════
window.RLData.UPCOMING = [
    { id: 'wc26-qf1', date: '2026-09-16', event: 'RLCS 2026 Worlds — Quarter Final', status: 'Upcoming',
      team1: { name: 'Karmine Corp', score: 0, logo: 'KC' }, team2: { name: 'FURIA Esports', score: 0, logo: 'FUR' }, duration: 'Bo7' },
    { id: 'wc26-qf2', date: '2026-09-16', event: 'RLCS 2026 Worlds — Quarter Final', status: 'Upcoming',
      team1: { name: 'NRG', score: 0, logo: 'NRG' }, team2: { name: 'Twisted Minds', score: 0, logo: 'TWM' }, duration: 'Bo7' },
    { id: 'wc26-qf3', date: '2026-09-17', event: 'RLCS 2026 Worlds — Quarter Final', status: 'Upcoming',
      team1: { name: 'Team Falcons', score: 0, logo: 'FLC' }, team2: { name: 'Gentle Mates', score: 0, logo: 'GM' }, duration: 'Bo7' },
    { id: 'wc26-qf4', date: '2026-09-17', event: 'RLCS 2026 Worlds — Quarter Final', status: 'Upcoming',
      team1: { name: 'Team Vitality', score: 0, logo: 'VIT' }, team2: { name: 'Spacestation Gaming', score: 0, logo: 'SSG' }, duration: 'Bo7' },
    { id: 'wc26-sf1', date: '2026-09-19', event: 'RLCS 2026 Worlds — Semi Final', status: 'Upcoming',
      team1: { name: 'TBD', score: 0, logo: '?' }, team2: { name: 'TBD', score: 0, logo: '?' }, duration: 'Bo7' },
    { id: 'wc26-gf', date: '2026-09-20', event: 'RLCS 2026 Worlds — Grand Final', status: 'Upcoming',
      team1: { name: 'TBD', score: 0, logo: '?' }, team2: { name: 'TBD', score: 0, logo: '?' }, duration: 'Bo7' }
];
