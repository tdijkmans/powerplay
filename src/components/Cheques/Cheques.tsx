// templates/component/Cheques.tsx

import "./Cheques.scss"; // Import your SCSS file

function Cheques() {
	const toUSD = (amount: number) =>
		amount.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

	return (
		<div className="cheques__container">
			<div className="cheques__stack">
				<div className="cheque">
					<div className="cheque__title">Cheque</div>
					<div className="cheque__value">{toUSD(1000000)}</div>
					<div className="cheque__text">One million dollars</div>
					<div className="cheque__icon"> 💸 </div>
				</div>

				<div className="cheque">
					<div className="cheque__title">Cheque</div>
					<div className="cheque__value">{toUSD(5000000)}</div>
					<div className="cheque__text">Five million dollars</div>
					<div className="cheque__icon">🕵️</div>
				</div>

				<div className="cheque">
					<div className="cheque__title">Cheque</div>
					<div className="cheque__value">{toUSD(10000000)}</div>
					<div className="cheque__text">Ten million dollars</div>
					<div className="cheque__icon">🚔</div>
				</div>
			</div>

			<div className="cheques__legend">
				<div className="cheques__legend__title">Fundraising: krijg cheques</div>
				<div className="cheques__legend__text">
					Cheques kan je Cashen of Stashen. Ze komen uit Legitieme 💸, Chantable
					🕵️ of Illegale 🚔 bronnen.
				</div>
			</div>
		</div>
	);
}

export default Cheques;
