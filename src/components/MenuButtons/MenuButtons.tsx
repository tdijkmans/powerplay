// templates/component/MenuButtons.tsx

import { useGlobal } from "../../stores/useGlobal.store";
import { useMenu } from "../../stores/useMenu.store";
import RoundButton from "../RoundButton/RoundButton";
import MapControl from "../ZoomControl/MapControl";
import "./MenuButtons.scss"; // Import your SCSS file

function MenuButtons() {
	const userForm = useMenu((state) => state.getMenu("userForm"));
	const impactCardList = useMenu((state) => state.getMenu("impactCardList"));
	const clearStore = useGlobal((state) => state.clearPersistedStore);

	const setMenuOpen = useMenu((state) => state.setMenuOpen);
	return (
		<div className="menu-buttons">
			<RoundButton
				onClick={() => setMenuOpen("userForm", !userForm.open)}
				icon="person"
			/>
			<div className="menu-buttons__spacer" />
			<RoundButton icon="delete_forever" onClick={clearStore} />

			<div className="menu-buttons__spacer" />
			<MapControl />
			<div className="menu-buttons__spacer" />

			<RoundButton
				onClick={() => setMenuOpen("impactCardList", !impactCardList.open)}
				icon="flash_on"
			/>
		</div>
	);
}

export default MenuButtons;
