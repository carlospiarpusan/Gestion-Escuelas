export const MOCK_VEHICLES = [
    {
        id: '1',
        plate: 'KUO-123',
        brand: 'Renault',
        model: 'Logan',
        year: 2022,
        km_current: 45200,
        soat_expires: '2025-11-15',
        techno_expires: '2025-11-15',
        tax_expires: '2025-06-30',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: '2',
        plate: 'HRX-456',
        brand: 'Chevrolet',
        model: 'Spark GT',
        year: 2021,
        km_current: 68100,
        soat_expires: '2024-03-01', // Expiring soon (Yellow/Red)
        techno_expires: '2024-02-28', // Expiring soon
        tax_expires: '2024-06-30',
        status: 'maintenance',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: '3',
        plate: 'JYZ-789',
        brand: 'Mazda',
        model: '2',
        year: 2023,
        km_current: 12500,
        soat_expires: '2025-08-20',
        techno_expires: '2026-08-20',
        tax_expires: '2025-06-30',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=300'
    }
];

export const MOCK_MAINTENANCE_LOGS = [
    {
        id: 'm1',
        vehicle_id: '2',
        type: 'repair',
        date: '2024-01-15',
        km_at_service: 67500,
        cost_parts: 350000,
        cost_labor: 120000,
        description: 'Cambio de pastillas de freno y rectificación de discos.',
        provider: 'Frenos y Más SAS'
    },
    {
        id: 'm2',
        vehicle_id: '1',
        type: 'oil_change',
        date: '2024-02-10',
        km_at_service: 44800,
        cost_parts: 180000,
        cost_labor: 40000,
        description: 'Cambio de aceite 10W30 y filtros.',
        provider: 'Aceites del Valle'
    }
];

export const MOCK_FUEL_LOGS = [
    {
        id: 'f1',
        vehicle_id: '1',
        date: '2024-02-12',
        km_at_fueling: 45100,
        gallons: 9.5,
        cost_total: 145000,
        is_full_tank: true
    },
    {
        id: 'f2',
        vehicle_id: '2',
        date: '2024-02-11',
        km_at_fueling: 68000,
        gallons: 8.2,
        cost_total: 128000,
        is_full_tank: true
    }
];
