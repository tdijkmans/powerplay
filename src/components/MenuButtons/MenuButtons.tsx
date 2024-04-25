// templates/component/MenuButtons.tsx

import { useGlobal } from "../../stores/useGlobal.store";
import { useMenu } from "../../stores/useMenu.store";
import RoundButton from "../RoundButton/RoundButton";
import MapControl from "../ZoomControl/MapControl";
import "./MenuButtons.scss"; // Import your SCSS file

function MenuButtons() {
	const userForm = useMenu((state) => state.getMenu("userForm"));
	const openMenu = useMenu((state) => state.openMenu);
	const closeMenu = useMenu((state) => state.closeMenu);
	const impactCardList = useMenu((state) => state.getMenu("impactCardList"));
	const clearStore = useGlobal((state) => state.clearPersistedStore);

	const handleOnKeyDown = (e: any) => {
		if (e.key === "Escape") {
			closeMenu("impactCardList");
			closeMenu("userForm");
		}
	}



	return (
		<div className="menu-buttons" onClick={() => { }}
			onKeyDown={handleOnKeyDown}
		>
			<RoundButton
				onClick={() =>
					userForm.open ? closeMenu("userForm") : openMenu("userForm")
				}
				icon="person"
			/>
			<div className="menu-buttons__spacer" />
			<RoundButton icon="delete_forever" onClick={clearStore} />

			<div className="menu-buttons__spacer" />
			<MapControl />
			<div className="menu-buttons__spacer" />

			<RoundButton
				onClick={() =>
					impactCardList.open
						? closeMenu("impactCardList")
						: openMenu("impactCardList")
				}
				icon="flash_on"
			/>
		</div>
	);
}

export default MenuButtons;
