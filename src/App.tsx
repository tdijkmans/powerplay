import { useState } from "react";
import "./App.scss";
import Card from "./components/Card/Card";
import GameScore from "./components/GameScore/GameScore";
import UsaList from "./components/UsaList/UsaList";
import UsaMap from "./components/UsaMap/UsaMap";
import UsaStateInfo from "./components/UsaStateInfo/UsaStateInfo";
import UserForm from "./components/UserForm/UserForm";
import MapControl from "./components/ZoomControl/MapControl";

function App() {
	const [showMenu, setShowMenu] = useState(true);
	const [showMapControl, setShowMapControl] = useState(false);

	return (
		<>
			<div className="container">
				<div className="NW">
					<Card>
						<GameScore />
					</Card>
				</div>
				<div className="N">North</div>
				<div className="NE" />
				<div className="W" />
				<div className="center-board">
					<UsaMap />
				</div>
				<div className="E">
					<Card>
						<UsaList />
					</Card>
				</div>
				<div className="SW">
					{showMapControl ? (
						<MapControl setShowMapControl={setShowMapControl} />
					) : (
						<button
							className="mapcontrol__button"
							type="button"
							onClick={() => setShowMapControl(true)}
						>
							<span className="material-symbols-outlined">settings</span>
						</button>
					)}
				</div>
				<div className="S">
					<UsaStateInfo />
				</div>
			</div>

			{showMenu && (
				<div className="menu-overlay-container">
					<div className="menu-overlay">
						<Card>
							<UserForm setShowMenu={setShowMenu} />
						</Card>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
