import { FC } from "react";
import "./ImpactCards.scss";

const ImpactCards: FC = () => (
	<div className="ic-card-stack-container">
		<div className="ic-card-stack">
			<div className="ic-card">1</div>
			<div className="ic-card">2</div>
			<div className="ic-card">
				<div className="ic-card__title">Impact</div>
				<span className="material-symbols-outlined">flash_on</span>
			</div>
		</div>
		<div className="ic-card-explanation">
			<div className="ic-card-explanation__title">Impactkaart</div>
			<div className="ic-card-explanation__text">
				Speel ze wanneer je wilt. Lees de kaart en volg de instructies.
			</div>
		</div>
	</div>
);

export default ImpactCards;
