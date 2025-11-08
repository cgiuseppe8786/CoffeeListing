import { useEffect, useMemo, useState } from 'react';
import './coffeeList.css';
import { Coffee } from '../../types/types';
import { fetchCoffees } from '../../services/coffee.service';
import { CoffeeCard } from '../CoffeeCard/coffeeCard';

export function CoffeeList() {
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [items, setItems] = useState<Coffee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const data = await fetchCoffees();
                if (alive) setItems(data);
            } catch (e) {
                if (alive) setError((e as Error).message);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    const view = useMemo(
        () => (onlyAvailable ? items.filter((c) => c.available) : items),
        [items, onlyAvailable]
    );

    return (
        <section className="collection">
            <header className="collection__header">
                <h2 className="collection__title">
                    Our Collection
                </h2>
                <p className="collection__subtitle">
                    Introducing our Coffee Collection, a selection of unique coffees from different
                    roast types and origins, expertly roasted in small batches and shipped fresh weekly.
                </p>

                <div className="tabs" role="tablist" aria-label="Filters">
                    <button
                        role="tab"
                        aria-selected={!onlyAvailable}
                        className={`tab ${!onlyAvailable ? 'tab--active' : ''}`}
                        onClick={() => setOnlyAvailable(false)}
                    >
                        All Products
                    </button>
                    <button
                        role="tab"
                        aria-selected={onlyAvailable}
                        className={`tab ${onlyAvailable ? 'tab--active' : ''}`}
                        onClick={() => setOnlyAvailable(true)}
                    >
                        Available Now
                    </button>
                </div>
            </header>


            {loading && <p className="helper">Loading…</p>}
            {error && <p className="helper error">Error: {error}</p>}

            <div className="grid">
                {view.map((item) => (
                    <CoffeeCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}
