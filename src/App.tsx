import "./App.scss";
import Card from "./components/Card/Card";
import GameScore from "./components/GameScore/GameScore";
import UsaList from "./components/UsaList/UsaList";
import UsaMap from "./components/UsaMap/UsaMap";
import UsaStateInfo from "./components/UsaStateInfo/UsaStateInfo";
import UserForm from "./components/UserForm/UserForm";
import MapControl from "./components/ZoomControl/MapControl";
import { useMenu } from "./hooks/useMenu.store";

function App() {
	const userForm = useMenu((state) => state.getMenu("userForm"));
	const mapControl = useMenu((state) => state.getMenu("mapControl"));
	const openMenu = useMenu((state) => state.setMenuOpen);

	return (
		<>
			{userForm.open && (
				<div className="menu-overlay-container">
					<div className="menu-overlay">
						<Card>
							<UserForm />
						</Card>
					</div>
				</div>
			)}
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
				<div className="SW" />
				<div className="S">
					<UsaStateInfo />
				</div>
			</div>

			<div className="settings-menu">
				{mapControl.open ? (
					<button
						className="mapcontrol__button"
						type="button"
						onClick={() => openMenu("mapControl", false)}
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				) : (
					<button
						className="mapcontrol__button"
						type="button"
						onClick={() => openMenu("mapControl", true)}
					>
						<span className="material-symbols-outlined">settings</span>
					</button>
				)}
			</div>
			{mapControl.open && <MapControl />}
		</>
	);
}

export default App;
