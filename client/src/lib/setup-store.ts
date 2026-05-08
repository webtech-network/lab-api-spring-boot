import { useSyncExternalStore } from 'react';
import heroSetup from '@/assets/hero-setup.jpg';
import setupMinimal from '@/assets/setup-minimal.jpg';
import setupStreaming from '@/assets/setup-streaming.jpg';
import setupDev from '@/assets/setup-dev.jpg';
import setupStudy from '@/assets/setup-study.jpg';
import setupGaming from '@/assets/setup-gaming.jpg';

export const SETUP_CATEGORIES = [
    'GAMING',
    'DEVELOPMENT',
    'MINIMALIST',
    'STUDY',
    'STREAMING',
] as const;
export type SetupCategory = (typeof SETUP_CATEGORIES)[number];

export const GEAR_TYPES = [
    'KEYBOARD',
    'MOUSE',
    'MONITOR',
    'HEADSET',
    'CHAIR',
    'MICROPHONE',
    'WEBCAM',
    'NOTEBOOK',
    'DESK',
    'OTHER',
] as const;
export type GearType = (typeof GEAR_TYPES)[number];

export const CATEGORY_LABELS: Record<SetupCategory, string> = {
    GAMING: 'Gaming',
    DEVELOPMENT: 'Desenvolvimento',
    MINIMALIST: 'Minimalista',
    STUDY: 'Estudos',
    STREAMING: 'Streaming',
};

export const GEAR_LABELS: Record<GearType, string> = {
    KEYBOARD: 'Teclado',
    MOUSE: 'Mouse',
    MONITOR: 'Monitor',
    HEADSET: 'Headset',
    CHAIR: 'Cadeira',
    MICROPHONE: 'Microfone',
    WEBCAM: 'Webcam',
    NOTEBOOK: 'Notebook',
    DESK: 'Mesa',
    OTHER: 'Outro',
};

export interface GearItem {
    id: string;
    name: string;
    brand: string;
    type: GearType;
    price: number;
}

export interface Setup {
    id: string;
    title: string;
    description: string;
    category: SetupCategory;
    imageUrl: string;
    estimatedCost: number;
    createdAt: string;
    author: string;
    gear: GearItem[];
}

const STORAGE_KEY = 'setuphub:setups:v1';

const seed: Setup[] = [
    {
        id: '1',
        title: 'Cyber Dev Cave',
        description:
            'Setup de desenvolvimento full-stack com iluminação ambiente roxa, dual monitors ultrawide e periféricos mecânicos. Pensado para sessões longas de código com conforto ergonômico.',
        category: 'DEVELOPMENT',
        imageUrl: heroSetup,
        estimatedCost: 18500,
        createdAt: '2025-04-12T10:00:00Z',
        author: 'Lucas Andrade',
        gear: [
            { id: 'g1', name: 'MX Master 3S', brand: 'Logitech', type: 'MOUSE', price: 850 },
            { id: 'g2', name: 'Keychron Q1 Pro', brand: 'Keychron', type: 'KEYBOARD', price: 2100 },
            { id: 'g3', name: 'Odyssey G9 49"', brand: 'Samsung', type: 'MONITOR', price: 9800 },
            { id: 'g4', name: 'Embody Gaming', brand: 'Herman Miller', type: 'CHAIR', price: 5200 },
        ],
    },
    {
        id: '2',
        title: 'Estação Streaming Neon',
        description:
            'Setup completo para streaming com áudio profissional, ring light e iluminação RGB sincronizada. Ideal para criadores de conteúdo que buscam qualidade broadcast.',
        category: 'STREAMING',
        imageUrl: setupStreaming,
        estimatedCost: 14200,
        createdAt: '2025-04-20T15:30:00Z',
        author: 'Mariana Vieira',
        gear: [
            { id: 'g5', name: 'SM7B', brand: 'Shure', type: 'MICROPHONE', price: 3200 },
            { id: 'g6', name: 'Stream Deck XL', brand: 'Elgato', type: 'OTHER', price: 1800 },
            { id: 'g7', name: 'Brio 4K', brand: 'Logitech', type: 'WEBCAM', price: 1400 },
        ],
    },
    {
        id: '3',
        title: 'Mesa Minimalista Nórdica',
        description:
            'Estação clean inspirada no design escandinavo. Madeira clara, poucos cabos à vista e foco total na produtividade silenciosa.',
        category: 'MINIMALIST',
        imageUrl: setupMinimal,
        estimatedCost: 9800,
        createdAt: '2025-03-05T08:15:00Z',
        author: 'Henrique Souza',
        gear: [
            { id: 'g8', name: 'Studio Display', brand: 'Apple', type: 'MONITOR', price: 12500 },
            { id: 'g9', name: 'Magic Keyboard', brand: 'Apple', type: 'KEYBOARD', price: 950 },
        ],
    },
    {
        id: '4',
        title: 'Battle Station RGB',
        description:
            'Triple monitor, periféricos top de linha e iluminação total RGB. Pronto para qualquer ranked.',
        category: 'GAMING',
        imageUrl: setupGaming,
        estimatedCost: 22300,
        createdAt: '2025-04-28T20:00:00Z',
        author: 'Pedro Castro',
        gear: [
            {
                id: 'g10',
                name: 'Aerox 3 Wireless',
                brand: 'SteelSeries',
                type: 'MOUSE',
                price: 720,
            },
            {
                id: 'g11',
                name: 'Apex Pro TKL',
                brand: 'SteelSeries',
                type: 'KEYBOARD',
                price: 1890,
            },
            {
                id: 'g12',
                name: 'Arctis Nova Pro',
                brand: 'SteelSeries',
                type: 'HEADSET',
                price: 2400,
            },
        ],
    },
    {
        id: '5',
        title: 'Code & Coffee',
        description:
            'Setup intimista de desenvolvimento com luz ambiente quente, mesa compacta e foco no essencial.',
        category: 'DEVELOPMENT',
        imageUrl: setupDev,
        estimatedCost: 11200,
        createdAt: '2025-04-02T09:00:00Z',
        author: 'Ana Beatriz',
        gear: [
            { id: 'g13', name: 'MacBook Pro 16"', brand: 'Apple', type: 'NOTEBOOK', price: 24000 },
            { id: 'g14', name: 'HHKB Studio', brand: 'PFU', type: 'KEYBOARD', price: 2900 },
        ],
    },
    {
        id: '6',
        title: 'Cantinho de Estudos',
        description:
            'Espaço dedicado a leitura e foco profundo. Iluminação focal, mínimo de distrações e ergonomia clássica.',
        category: 'STUDY',
        imageUrl: setupStudy,
        estimatedCost: 4200,
        createdAt: '2025-02-18T18:45:00Z',
        author: 'Júlia Ramos',
        gear: [
            { id: 'g15', name: 'Mesa Carvalho', brand: 'Tok&Stok', type: 'DESK', price: 1800 },
            {
                id: 'g16',
                name: 'Cadeira Aeron',
                brand: 'Herman Miller',
                type: 'CHAIR',
                price: 6800,
            },
        ],
    },
];

function load(): Setup[] {
    if (typeof window === 'undefined') return seed;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
            return seed;
        }
        return JSON.parse(raw) as Setup[];
    } catch {
        return seed;
    }
}

let state: Setup[] = load();
const listeners = new Set<() => void>();

function persist() {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    listeners.forEach((l) => l());
}

function uid() {
    return Math.random().toString(36).slice(2, 11);
}

export const setupStore = {
    subscribe(cb: () => void) {
        listeners.add(cb);
        return () => listeners.delete(cb);
    },
    getSnapshot() {
        return state;
    },
    getServerSnapshot() {
        return seed;
    },
    list() {
        return state;
    },
    get(id: string) {
        return state.find((s) => s.id === id);
    },
    create(input: Omit<Setup, 'id' | 'createdAt' | 'gear' | 'author'> & { author?: string }) {
        const setup: Setup = {
            ...input,
            id: uid(),
            createdAt: new Date().toISOString(),
            author: input.author ?? 'Você',
            gear: [],
        };
        state = [setup, ...state];
        persist();
        return setup;
    },
    update(id: string, patch: Partial<Omit<Setup, 'id' | 'gear'>>) {
        state = state.map((s) => (s.id === id ? { ...s, ...patch } : s));
        persist();
    },
    remove(id: string) {
        state = state.filter((s) => s.id !== id);
        persist();
    },
    addGear(setupId: string, gear: Omit<GearItem, 'id'>) {
        state = state.map((s) =>
            s.id === setupId ? { ...s, gear: [...s.gear, { ...gear, id: uid() }] } : s
        );
        persist();
    },
    updateGear(setupId: string, gearId: string, patch: Partial<Omit<GearItem, 'id'>>) {
        state = state.map((s) =>
            s.id === setupId
                ? { ...s, gear: s.gear.map((g) => (g.id === gearId ? { ...g, ...patch } : g)) }
                : s
        );
        persist();
    },
    removeGear(setupId: string, gearId: string) {
        state = state.map((s) =>
            s.id === setupId ? { ...s, gear: s.gear.filter((g) => g.id !== gearId) } : s
        );
        persist();
    },
};

export function useSetups() {
    return useSyncExternalStore(
        setupStore.subscribe,
        setupStore.getSnapshot,
        setupStore.getServerSnapshot
    );
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
    }).format(value);
}
