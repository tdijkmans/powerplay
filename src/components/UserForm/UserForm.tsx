import React, { FC, useState } from "react";
import { useGlobal } from "../../stores/useGlobal.store";
import { useMenu } from "../../stores/useMenu.store";

import { usePersistedGlobal } from "../../stores/usePersisted.store";
import "./UserForm.scss";

const UserForm: FC = () => {
	const openMenu = useMenu((state) => state.setMenuOpen);
	const setPlayerNames = useGlobal((state) => state.setPlayerNames);
	const [firstPlayer, setFirstPlayer] = useState("");
	const [secondPlayer, setSecondPlayer] = useState("");
	const useBounds = usePersistedGlobal((state) => state);
	console.log(useBounds);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.currentTarget;
		if (id === "democrat") {
			setFirstPlayer(value);
		} else {
			setSecondPlayer(value);
		}
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setPlayerNames({
			democrat: firstPlayer,
			republican: secondPlayer,
		});
		openMenu("userForm", false);
	};

	return (
		<form className="userform__form">
			<div className="userform__title">Geef de namen van de spelers in</div>
			<div className="userform__subtitle">
				Speler 1 is leider van de democraten, speler 2 is leider van de
				republikeinen.
			</div>

			<div className="userform__names">
				<label className="userform__label" htmlFor="democrat">
					Speler 1 <span className="userform__democrat">| Democraat</span>
				</label>
				<input
					className="userform__input"
					type="text"
					id="democrat"
					onChange={handleChange}
				/>

				<label className="userform__label" htmlFor="republican">
					Speler 2 <span className="userform__republican">| Republikein</span>
				</label>
				<input
					className="userform__input"
					type="text"
					id="republican"
					onChange={handleChange}
				/>

				<button
					className="userform__button"
					type="submit"
					onClick={handleSubmit}
				>
					Start spel
				</button>
			</div>
		</form>
	);
};

export default UserForm;
