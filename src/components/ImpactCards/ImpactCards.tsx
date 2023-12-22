import { FC } from "react";
import "./ImpactCards.scss";

const ImpactCards: FC = () => (
	<div className="ic-card-stack-container">
		<div className="ic-card-stack">
			<div className="ic-card">1</div>
			<div className="ic-card">2</div>
			<div className="ic-card">
				<div className="ic-card__title">Impact kaart</div>
				<span className="material-symbols-outlined">flash_on</span>
			</div>
		</div>
		<div className="ic-card-explanation">
			<div className="ic-card-explanation__title">Impact kaart</div>
			<div className="ic-card-explanation__text">
				Op ieder moment kan een speler een Impact Kaart spelen om zichzelf of
				een tegenspeler te beïnvloeden. Volg de instructies op de kaart op.
			</div>
			<div className="ic-card-explanation__link">Zie tab rechts</div>
		</div>
	</div>
);

export default ImpactCards;
