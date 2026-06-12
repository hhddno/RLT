// Mock Data for RL Esports

window.RLData = {};

window.RLData.PLAYERS = [
    {
        id: 'p1',
        name: 'Vatira',
        team: 'Karmine Corp',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vatira&backgroundColor=b6e3f4',
        stats: {
            dpm: 2.4, // Demos per minute
            scorePerGame: 450,
            goalsPerGame: 0.8,
            assistsPerGame: 0.7,
            savesPerGame: 1.5,
            shotPercentage: 28.5
        }
    },
    {
        id: 'p2',
        name: 'Zen',
        team: 'Team Vitality',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zen&backgroundColor=ffdfbf',
        stats: {
            dpm: 0.9,
            scorePerGame: 510,
            goalsPerGame: 1.1,
            assistsPerGame: 0.6,
            savesPerGame: 1.2,
            shotPercentage: 35.2
        }
    },
    {
        id: 'p3',
        name: 'Monkey M00n',
        team: 'Team BDS',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MM&backgroundColor=ffbdf9',
        stats: {
            dpm: 1.2,
            scorePerGame: 420,
            goalsPerGame: 0.6,
            assistsPerGame: 0.9,
            savesPerGame: 2.1,
            shotPercentage: 24.1
        }
    },
    {
        id: 'p4',
        name: 'Daniel',
        team: 'G2 Esports',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel&backgroundColor=c0aede',
        stats: {
            dpm: 1.5,
            scorePerGame: 480,
            goalsPerGame: 0.9,
            assistsPerGame: 0.8,
            savesPerGame: 1.4,
            shotPercentage: 31.0
        }
    },
    {
        id: 'p5',
        name: 'Firstkiller',
        team: 'Gen.G Mobil1 Racing',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FK&backgroundColor=b6e3f4',
        stats: {
            dpm: 1.8,
            scorePerGame: 495,
            goalsPerGame: 1.0,
            assistsPerGame: 0.7,
            savesPerGame: 1.6,
            shotPercentage: 33.4
        }
    },
    {
        id: 'p6',
        name: 'Rise',
        team: 'Karmine Corp',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rise&backgroundColor=ffdfbf',
        stats: {
            dpm: 2.1,
            scorePerGame: 410,
            goalsPerGame: 0.7,
            assistsPerGame: 0.8,
            savesPerGame: 1.3,
            shotPercentage: 26.5
        }
    }
];

window.RLData.TEAMS = [
    {
        id: 't1',
        name: 'Karmine Corp',
        logo: 'KC',
        rank: 1,
        points: 3500,
        winRate: 78.5,
        region: 'EU'
    },
    {
        id: 't2',
        name: 'Team Vitality',
        logo: 'VIT',
        rank: 2,
        points: 3200,
        winRate: 72.1,
        region: 'EU'
    },
    {
        id: 't3',
        name: 'G2 Esports',
        logo: 'G2',
        rank: 3,
        points: 3100,
        winRate: 68.4,
        region: 'NA'
    },
    {
        id: 't4',
        name: 'Gen.G Mobil1 Racing',
        logo: 'GENG',
        rank: 4,
        points: 2900,
        winRate: 65.0,
        region: 'NA'
    },
    {
        id: 't5',
        name: 'Team BDS',
        logo: 'BDS',
        rank: 5,
        points: 2750,
        winRate: 60.5,
        region: 'EU'
    }
];

window.RLData.MATCHES = [
    {
        id: 'm1',
        date: '2026-06-12',
        event: 'RLCS Major 1 - Grand Final',
        team1: { name: 'Karmine Corp', score: 4, logo: 'KC' },
        team2: { name: 'Team Vitality', score: 3, logo: 'VIT' },
        duration: 'Bo7',
        status: 'Completed',
        games: [
            { id: 'g1', winner: 'KC', score1: 3, score2: 2, map: 'Mannfield (Night)' },
            { id: 'g2', winner: 'VIT', score1: 1, score2: 4, map: 'DFH Stadium' },
            { id: 'g3', winner: 'KC', score1: 2, score2: 1, map: 'Champions Field' },
            { id: 'g4', winner: 'VIT', score1: 0, score2: 3, map: 'Utopia Coliseum' },
            { id: 'g5', winner: 'KC', score1: 4, score2: 3, map: 'Wasteland' },
            { id: 'g6', winner: 'VIT', score1: 1, score2: 2, map: 'Neo Tokyo' },
            { id: 'g7', winner: 'KC', score1: 5, score2: 4, map: 'Champions Field' }
        ]
    },
    {
        id: 'm2',
        date: '2026-06-11',
        event: 'RLCS Major 1 - Semi Final',
        team1: {
            name: 'Team BDS',
            score: 2,
            logo: 'BDS'
        },
        team2: {
            name: 'Karmine Corp',
            score: 4,
            logo: 'KC'
        },
        duration: 'Bo7',
        status: 'Completed'
    },
    {
        id: 'm3',
        date: '2026-06-11',
        event: 'RLCS Major 1 - Semi Final',
        team1: {
            name: 'G2 Esports',
            score: 1,
            logo: 'G2'
        },
        team2: {
            name: 'Team Vitality',
            score: 4,
            logo: 'VIT'
        },
        duration: 'Bo7',
        status: 'Completed'
    },
    {
        id: 'm4',
        date: '2026-06-10',
        event: 'RLCS Major 1 - Quarter Final',
        team1: {
            name: 'Gen.G',
            score: 3,
            logo: 'GENG'
        },
        team2: {
            name: 'G2 Esports',
            score: 4,
            logo: 'G2'
        },
        duration: 'Bo7',
        status: 'Completed'
    }
];
