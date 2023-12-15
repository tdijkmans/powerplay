import React, { FC, useState } from "react";
import useGlobalStore from "../../stores/useGlobalStore";
import "./UserForm.scss";

type UserFormProps = {
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserForm: FC<UserFormProps> = ({ setShowMenu }) => {
	const setPlayerNames = useGlobalStore((state) => state.setPlayerNames);
	const [firstPlayer, setFirstPlayer] = useState("");
	const [secondPlayer, setSecondPlayer] = useState("");

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
		setShowMenu(false);
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
