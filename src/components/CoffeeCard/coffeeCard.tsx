import type { Coffee } from '../../types/types';
import './coffeCard.css';

type Props = { item: Coffee };

export function CoffeeCard({ item }: Props) {
    const { image, name, price, rating, votes, popular, available } = item;

    return (
        <article className={`card ${!available ? 'card--disabled' : ''}`} aria-label={name}>
            <div className="card__media">
                <img src={image} alt={name} loading="lazy" />
                {popular && <span className="badge badge--popular">Popular</span>}
                <span className="pill pill--price">{price}</span>
            </div>

            <div className="card__body">
                <h3 className="card__title">{name}</h3>

                <div className="card__meta">
                    <div className="rating" aria-label={rating ? `Rating ${rating} su 5` : 'No ratings'}>
                        <StarIcon filled={!!rating} />
                        <span className={`rating__value ${rating ? '' : 'muted'}`}>
                            {rating ? (Number.isInteger(rating) ? rating : rating) : 'No ratings'}
                        </span>
                        {votes !== undefined && <span className="rating__votes">({votes} votes)</span>}
                    </div>

                    {!available && <span className="status status--soldout">Sold out</span>}
                </div>
            </div>
        </article>
    );
}

function StarIcon({ filled = false }: { filled?: boolean }) {
    return (
        <svg className="icon-star" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={filled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}
