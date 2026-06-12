// RL Esports Data — Comprehensive realistic dataset

window.RLData = {};

window.RLData.PLAYERS = [
    {
        id: 'p1', name: 'Vatira', team: 'Karmine Corp', region: 'EU', role: 'Striker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vatira&backgroundColor=b6e3f4',
        stats: { dpm: 2.4, scorePerGame: 450, goalsPerGame: 0.82, assistsPerGame: 0.71, savesPerGame: 1.53, shotPercentage: 28.5, gamesPlayed: 312 }
    },
    {
        id: 'p2', name: 'Zen', team: 'Team BDS', region: 'EU', role: 'Flex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zen&backgroundColor=ffdfbf',
        stats: { dpm: 0.9, scorePerGame: 510, goalsPerGame: 1.12, assistsPerGame: 0.63, savesPerGame: 1.24, shotPercentage: 35.2, gamesPlayed: 287 }
    },
    {
        id: 'p3', name: 'Monkey Moon', team: 'Team Vitality', region: 'EU', role: 'Playmaker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MonkeyMoon&backgroundColor=ffbdf9',
        stats: { dpm: 1.2, scorePerGame: 420, goalsPerGame: 0.65, assistsPerGame: 0.92, savesPerGame: 2.15, shotPercentage: 24.1, gamesPlayed: 450 }
    },
    {
        id: 'p4', name: 'Daniel', team: 'G2 Stride', region: 'NA', role: 'Striker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel&backgroundColor=c0aede',
        stats: { dpm: 1.5, scorePerGame: 480, goalsPerGame: 0.94, assistsPerGame: 0.81, savesPerGame: 1.42, shotPercentage: 31.0, gamesPlayed: 260 }
    },
    {
        id: 'p5', name: 'Firstkiller', team: 'Gen.G Mobil1 Racing', region: 'NA', role: 'Striker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Firstkiller&backgroundColor=b6e3f4',
        stats: { dpm: 1.8, scorePerGame: 495, goalsPerGame: 1.03, assistsPerGame: 0.72, savesPerGame: 1.61, shotPercentage: 33.4, gamesPlayed: 380 }
    },
    {
        id: 'p6', name: 'Rise', team: 'Karmine Corp', region: 'EU', role: 'Défenseur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rise&backgroundColor=ffdfbf',
        stats: { dpm: 2.1, scorePerGame: 410, goalsPerGame: 0.71, assistsPerGame: 0.83, savesPerGame: 1.35, shotPercentage: 26.5, gamesPlayed: 310 }
    },
    {
        id: 'p7', name: 'Beastmode', team: 'Gen.G Mobil1 Racing', region: 'NA', role: 'Flex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beastmode&backgroundColor=d1d4f9',
        stats: { dpm: 1.4, scorePerGame: 465, goalsPerGame: 0.88, assistsPerGame: 0.76, savesPerGame: 1.55, shotPercentage: 29.8, gamesPlayed: 340 }
    },
    {
        id: 'p8', name: 'Seikoo', team: 'Vitality', region: 'EU', role: 'Striker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Seikoo&backgroundColor=ffd5dc',
        stats: { dpm: 1.1, scorePerGame: 500, goalsPerGame: 1.05, assistsPerGame: 0.69, savesPerGame: 1.18, shotPercentage: 34.1, gamesPlayed: 295 }
    },
    {
        id: 'p9', name: 'ApparentlyJack', team: 'Gentle Mates Alpine', region: 'EU', role: 'Flex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AJ&backgroundColor=c1f0c1',
        stats: { dpm: 1.6, scorePerGame: 440, goalsPerGame: 0.78, assistsPerGame: 0.85, savesPerGame: 1.47, shotPercentage: 27.3, gamesPlayed: 275 }
    },
    {
        id: 'p10', name: 'Joyo', team: 'Team BDS', region: 'EU', role: 'Striker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joyo&backgroundColor=ffe4b5',
        stats: { dpm: 1.3, scorePerGame: 475, goalsPerGame: 0.96, assistsPerGame: 0.64, savesPerGame: 1.30, shotPercentage: 30.5, gamesPlayed: 310 }
    },
    {
        id: 'p11', name: 'Comm', team: 'G2 Stride', region: 'NA', role: 'Défenseur',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Comm&backgroundColor=c4e0f9',
        stats: { dpm: 2.8, scorePerGame: 380, goalsPerGame: 0.55, assistsPerGame: 0.72, savesPerGame: 1.90, shotPercentage: 22.1, gamesPlayed: 350 }
    },
    {
        id: 'p12', name: 'ExoTiiK', team: 'Karmine Corp', region: 'EU', role: 'Flex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ExoTiiK&backgroundColor=e8d5b7',
        stats: { dpm: 1.7, scorePerGame: 430, goalsPerGame: 0.74, assistsPerGame: 0.90, savesPerGame: 1.48, shotPercentage: 25.9, gamesPlayed: 290 }
    }
];

window.RLData.TEAMS = [
    { id: 't1', name: 'Karmine Corp', logo: 'KC', rank: 1, points: 3520, winRate: 79.2, region: 'EU', players: ['Vatira', 'Rise', 'ExoTiiK'] },
    { id: 't2', name: 'Team BDS', logo: 'BDS', rank: 2, points: 3310, winRate: 74.5, region: 'EU', players: ['Zen', 'Joyo', 'Extra'] },
    { id: 't3', name: 'G2 Stride', logo: 'G2', rank: 3, points: 3150, winRate: 69.8, region: 'NA', players: ['Daniel', 'Comm', 'Atomic'] },
    { id: 't4', name: 'Gen.G Mobil1 Racing', logo: 'GENG', rank: 4, points: 2980, winRate: 66.3, region: 'NA', players: ['Firstkiller', 'Beastmode', 'Chronic'] },
    { id: 't5', name: 'Team Vitality', logo: 'VIT', rank: 5, points: 2850, winRate: 63.1, region: 'EU', players: ['Monkey Moon', 'Seikoo', 'Radosin'] },
    { id: 't6', name: 'Gentle Mates Alpine', logo: 'GMA', rank: 6, points: 2650, winRate: 58.7, region: 'EU', players: ['ApparentlyJack', 'Kash', 'Aztromick'] },
    { id: 't7', name: 'FaZe Clan', logo: 'FAZE', rank: 7, points: 2400, winRate: 55.4, region: 'NA', players: ['Sypical', 'Allushin', 'Mist'] },
    { id: 't8', name: 'Team Falcons', logo: 'FLC', rank: 8, points: 2200, winRate: 52.0, region: 'MENA', players: ['Ahmad', 'Trk', 'oKhaliD'] }
];

window.RLData.MATCHES = [
    {
        id: 'm1', date: '2025-12-15', event: 'RLCS 2025 Major 2 — Grand Final', status: 'Completed',
        team1: { name: 'Karmine Corp', score: 4, logo: 'KC' },
        team2: { name: 'Team BDS', score: 2, logo: 'BDS' },
        duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU',
        games: [
            { id: 'g1', winner: 'KC', score1: 3, score2: 1, map: 'Champions Field' },
            { id: 'g2', winner: 'BDS', score1: 1, score2: 4, map: 'DFH Stadium' },
            { id: 'g3', winner: 'KC', score1: 2, score2: 0, map: 'Mannfield (Night)' },
            { id: 'g4', winner: 'BDS', score1: 2, score2: 3, map: 'Urban Central' },
            { id: 'g5', winner: 'KC', score1: 5, score2: 3, map: 'Neo Tokyo' },
            { id: 'g6', winner: 'KC', score1: 2, score2: 1, map: 'Champions Field' }
        ]
    },
    {
        id: 'm2', date: '2025-12-15', event: 'RLCS 2025 Major 2 — Semi Final', status: 'Completed',
        team1: { name: 'G2 Stride', score: 1, logo: 'G2' },
        team2: { name: 'Karmine Corp', score: 4, logo: 'KC' },
        duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU',
        games: [
            { id: 'g1', winner: 'KC', score1: 1, score2: 3, map: 'DFH Stadium' },
            { id: 'g2', winner: 'KC', score1: 0, score2: 2, map: 'Mannfield (Night)' },
            { id: 'g3', winner: 'G2', score1: 4, score2: 2, map: 'Utopia Coliseum' },
            { id: 'g4', winner: 'KC', score1: 1, score2: 5, map: 'Champions Field' },
            { id: 'g5', winner: 'KC', score1: 0, score2: 3, map: 'Neo Tokyo' }
        ]
    },
    {
        id: 'm3', date: '2025-12-14', event: 'RLCS 2025 Major 2 — Semi Final', status: 'Completed',
        team1: { name: 'Gen.G Mobil1 Racing', score: 3, logo: 'GENG' },
        team2: { name: 'Team BDS', score: 4, logo: 'BDS' },
        duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU',
        games: [
            { id: 'g1', winner: 'GENG', score1: 2, score2: 1, map: 'DFH Stadium' },
            { id: 'g2', winner: 'BDS', score1: 0, score2: 3, map: 'Champions Field' },
            { id: 'g3', winner: 'GENG', score1: 4, score2: 2, map: 'Wasteland' },
            { id: 'g4', winner: 'BDS', score1: 1, score2: 2, map: 'Neo Tokyo' },
            { id: 'g5', winner: 'GENG', score1: 3, score2: 0, map: 'Mannfield (Night)' },
            { id: 'g6', winner: 'BDS', score1: 2, score2: 4, map: 'Urban Central' },
            { id: 'g7', winner: 'BDS', score1: 1, score2: 3, map: 'Champions Field' }
        ]
    },
    {
        id: 'm4', date: '2025-12-14', event: 'RLCS 2025 Major 2 — Quarter Final', status: 'Completed',
        team1: { name: 'Team Vitality', score: 4, logo: 'VIT' },
        team2: { name: 'FaZe Clan', score: 2, logo: 'FAZE' },
        duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU',
        games: [
            { id: 'g1', winner: 'VIT', score1: 3, score2: 1, map: 'Champions Field' },
            { id: 'g2', winner: 'FAZE', score1: 1, score2: 2, map: 'DFH Stadium' },
            { id: 'g3', winner: 'VIT', score1: 2, score2: 0, map: 'Neo Tokyo' },
            { id: 'g4', winner: 'FAZE', score1: 2, score2: 4, map: 'Mannfield (Night)' },
            { id: 'g5', winner: 'VIT', score1: 1, score2: 0, map: 'Urban Central' },
            { id: 'g6', winner: 'VIT', score1: 3, score2: 2, map: 'Wasteland' }
        ]
    },
    {
        id: 'm5', date: '2025-12-13', event: 'RLCS 2025 Major 2 — Quarter Final', status: 'Completed',
        team1: { name: 'Gentle Mates Alpine', score: 2, logo: 'GMA' },
        team2: { name: 'G2 Stride', score: 4, logo: 'G2' },
        duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU'
    },
    {
        id: 'm6', date: '2025-12-13', event: 'RLCS 2025 Major 2 — Quarter Final', status: 'Completed',
        team1: { name: 'Team Falcons', score: 1, logo: 'FLC' },
        team2: { name: 'Team BDS', score: 4, logo: 'BDS' },
        duration: 'Bo7', vodUrl: 'https://www.youtube.com/embed/Y8hx6pkIfvU'
    }
];

window.RLData.UPCOMING = [
    {
        id: 'u1', date: '2026-06-20', event: 'RLCS 2026 Major 1 — Day 1', status: 'Upcoming',
        team1: { name: 'Karmine Corp', score: 0, logo: 'KC' },
        team2: { name: 'Team Vitality', score: 0, logo: 'VIT' },
        duration: 'Bo7'
    },
    {
        id: 'u2', date: '2026-06-20', event: 'RLCS 2026 Major 1 — Day 1', status: 'Upcoming',
        team1: { name: 'G2 Stride', score: 0, logo: 'G2' },
        team2: { name: 'Gen.G Mobil1 Racing', score: 0, logo: 'GENG' },
        duration: 'Bo7'
    },
    {
        id: 'u3', date: '2026-06-21', event: 'RLCS 2026 Major 1 — Day 2', status: 'Upcoming',
        team1: { name: 'Team BDS', score: 0, logo: 'BDS' },
        team2: { name: 'Gentle Mates Alpine', score: 0, logo: 'GMA' },
        duration: 'Bo5'
    }
];
