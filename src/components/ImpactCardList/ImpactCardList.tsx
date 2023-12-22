// templates/component/ImpactCardList.tsx

import "./ImpactCardList.scss"; // Import your SCSS file
import { impactCards } from "./ImpactCards";

function ImpactCardList() {
	return (
		<div className="impact-card-list-container">
			<div className="impact-card-list__title">Impact kaarten</div>

			<div className="impact-card-list">
				{impactCards.map((card) => (
					<div className="impact-card-list__card" key={card.naam}>
						<div className="impact-card-list__card__title">{card.naam}</div>
						<div className="impact-card-list__card__description">
							{card.omschrijving}
						</div>

						<div className="impact-card-list__card__quote">
							<span className="material-symbols-outlined">format_quote</span>
							{card.quote}
							<span className="material-symbols-outlined">format_quote</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ImpactCardList;
