import type { Coffee } from '../types/types';

const URL =
    'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json';

const toNumber = (v: number | string | null): number | undefined => {
    if (v === null || v === undefined) return undefined;
    const n = typeof v === 'string' ? Number(v) : v;
    return Number.isFinite(n) ? n : undefined;
};

export async function fetchCoffees(): Promise<Coffee[]> {
    try {
        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as Coffee[];

        return data
    } catch (error) {
        console.error('❌ Failed to fetch coffees:', error);
        throw new Error('Unable to load coffee data. Please try again later.');
    }
}

