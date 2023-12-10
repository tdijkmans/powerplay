import "./App.scss";
import Card from "./components/Card/Card";
import GameScore from "./components/GameScore/GameScore";
import UsaList from "./components/UsaList/UsaList";
import UsaMap from "./components/UsaMap/UsaMap";
import UsaStateInfo from "./components/UsaStateInfo/UsaStateInfo";
import UserForm from "./components/UserForm/UserForm";
import MapControl from "./components/ZoomControl/MapControl";

function App() {
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
				<div className="W">
					<Card>
						<UserForm />
					</Card>
				</div>
				<div className="center-board">
					<UsaMap />
				</div>
				<div className="E">
					<Card>
						<UsaList />
					</Card>
				</div>
				<div className="SW">
					<Card>
						<MapControl />
					</Card>
				</div>
				<div className="S">
					<UsaStateInfo />
				</div>
			</div>
		</>
	);
}

export default App;
