import "./App.scss";
import Card from "./components/Card/Card";
import GameScore from "./components/GameScore/GameScore";
import UsaList from "./components/UsaList/UsaList";
import UsaMap from "./components/UsaMap/UsaMap";
import UsaStateInfo from "./components/UsaStateInfo/UsaStateInfo";
import ZoomControl from "./components/ZoomControl/ZoomControl";

function App() {
	return (
		<>
			<div className="elsewhere">
				<Card>
					<UsaList />
				</Card>
			</div>
			<div className="container">
				<div className="NW">
					<GameScore />
				</div>
				<div className="N">North</div>
				<div className="NE" />
				<div className="W">West</div>
				<div className="center-board">
					<UsaMap />
				</div>
				<div className="E">East</div>
				<div className="SW">
					<ZoomControl />
				</div>
				<div className="S">
					<UsaStateInfo />
				</div>
				<div className="SE">Southeast</div>
			</div>
		</>
	);
}

export default App;
