import axios from 'axios';

import {
    statsTypeList,
    StatsTypeToHuman,
    statsTypeValueToHuman,
    calculateFullStatsDiff,
} from '@/lib/models/stats';

import type { FetchFullStatsUserResData, FetchFullStatsUserRes } from '@/lib/api/routes/users/stats';

type Cell = (string | number | null)[];

type Rows = Cell[];

const statsHumanToCurrLast = Object.values(StatsTypeToHuman).map((val) => ([
    `${val} (нач)`,
    `${val} (тек)`,
])).flat();

const ROW_HEADER: Cell = [
    'Имя пользователя',
    'Имя',
    'Фамилия',
    'Кол-во тренировок',
    'Кол-во показателей',
    'Общая успеваемость',
    null,
    ...statsHumanToCurrLast,
];

const LIMIT_USERS_PER_REQ = 20;

const delay = (ms: number) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

const parseStatsByUser = (statsData: FetchFullStatsUserResData): Cell => {
    const {
        user,
        wourkoutsCount,
        statsCount,
        statsDiff,
    } = statsData;
    const { username, firstName, lastName } = user;

    const fullDiffPercent = calculateFullStatsDiff(statsDiff);
    const statsValues = statsTypeList.map((type) => {
        const start = statsDiff.start?.[type];
        const last = statsDiff.last?.[type];

        return [statsTypeValueToHuman(type, start, true), statsTypeValueToHuman(type, last, true)];
    }).flat();

    return [
        username,
        firstName,
        lastName,
        wourkoutsCount,
        statsCount,
        `${fullDiffPercent}%`,
        null,
        ...statsValues,
    ];
};

const getUsersStats = async (offset = 0): Promise<FetchFullStatsUserRes> => {
    const { data } = await axios.get<FetchFullStatsUserRes>(`/api/users/stats?offset=${offset}&limit=${LIMIT_USERS_PER_REQ}`);

    return data;
};

const getUsersStatsPagin = async function* (): AsyncIterableIterator<FetchFullStatsUserResData> {
    const { total, items } = await getUsersStats();

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
        yield item;
    }
    if (total <= LIMIT_USERS_PER_REQ) {
        return;
    }
    let offset = LIMIT_USERS_PER_REQ;

    while (total > offset) {
        // eslint-disable-next-line no-await-in-loop
        const { items: nextItems } = await getUsersStats(offset);

        // eslint-disable-next-line no-restricted-syntax
        for (const item of nextItems) {
            yield item;
        }
        offset += LIMIT_USERS_PER_REQ;
    }
};

const parseUsersStats = async (): Promise<Rows> => {
    const rows: Rows = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const statsData of getUsersStatsPagin()) {
        rows.push(parseStatsByUser(statsData));

        await delay(5);
    }

    return rows;
};

export const downloadAllStatsCSV = async (): Promise<string> => {
    const rows: Rows = [
        ROW_HEADER,
        ...await parseUsersStats(),
    ];

    const rowsStr = rows
        .map((row) => row.join(','))
        .join('\n');

    return `data:text/csv;charset=utf-8,\uFEFF${rowsStr}`;
};
