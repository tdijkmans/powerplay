import { useState } from "react";
import "./App.scss";
import Card from "./components/Card/Card";
import Cheques from "./components/Cheques/Cheques";
import GameScore from "./components/GameScore/GameScore";
import ImpactCardList from "./components/ImpactCardList/ImpactCardList";
import ImpactCards from "./components/ImpactCards/ImpactCards";
import MenuButtons from "./components/MenuButtons/MenuButtons";
import MenuCard from "./components/MenuCard/MenuCard";
import OneTurn from "./components/OneTurn/OneTurn";
import PowerPlayLogo from "./components/PowerPlayLogo/PowerPlayLogo";
import UsaList from "./components/UsaList/UsaList";
import UsaMap from "./components/UsaMap/UsaMap";
import UsaStateInfo from "./components/UsaStateInfo/UsaStateInfo";
import UserForm from "./components/UserForm/UserForm";
import { useMenu } from "./stores/useMenu.store";

function App() {
	const tabs = ["states", "cards", "players"];
	const userForm = useMenu((state) => state.getMenu("userForm"));
	const [activeTab, setActiveTab] = useState(tabs[0]);

	return (
		<div className="app-container">
			{userForm.open && (
				<div className="menu-overlay-container">
					<div className="menu-overlay">
						{userForm.open && (
							<MenuCard>
								<UserForm />
							</MenuCard>
						)}
					</div>
				</div>
			)}
			<div className="grid-container">
				<div className="WEST-AREA">
					<Card>
						<GameScore />
					</Card>
					<Card>
						<OneTurn />
					</Card>
					<ImpactCards />
					<Cheques />
				</div>

				<div className="CENTRAL-AREA">
					<UsaMap />
				</div>
				<div className="EAST-AREA">
					<div className="tab-container">
						<div className="tab-buttons">
							<button
								onClick={() => setActiveTab(tabs[0])}
								type="button"
								className={activeTab === tabs[0] ? "active" : ""}
							>
								Staten
							</button>
							<button
								onClick={() => setActiveTab(tabs[1])}
								type="button"
								className={activeTab === tabs[1] ? "active" : ""}
							>
								Impactkaarten
							</button>
						</div>
						<div className="tab-content">
							{activeTab === tabs[0] && <UsaList />}
							{activeTab === tabs[1] && <ImpactCardList />}
						</div>
					</div>
				</div>
			</div>

			<div className="dashboard">
				<div className="dashboard-left">
					<MenuButtons />
				</div>
				<div className="center-dashboard">
					<PowerPlayLogo />
				</div>
				<UsaStateInfo />
			</div>
		</div>
	);
}

export default App;
