// templates/component/MenuButtons.tsx

import { useMenu } from "../../stores/useMenu.store";
import RoundButton from "../RoundButton/RoundButton";
import "./MenuButtons.scss"; // Import your SCSS file

function MenuButtons() {
	const userForm = useMenu((state) => state.getMenu("userForm"));
	const impactCardList = useMenu((state) => state.getMenu("impactCardList"));

	const setMenuOpen = useMenu((state) => state.setMenuOpen);
	return (
		<div className="menu-buttons">
			<RoundButton
				onClick={() => setMenuOpen("userForm", !userForm.open)}
				icon="person"
			/>
			<RoundButton
				onClick={() => setMenuOpen("impactCardList", !impactCardList.open)}
				icon="flash_on"
			/>
		</div>
	);
}

export default MenuButtons;
