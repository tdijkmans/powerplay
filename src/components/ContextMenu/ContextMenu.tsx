import { FC } from "react";
import { Party, UsaState } from "../../data/stateData.interface";
import "./ContextMenu.scss";

interface ContextMenuProps {
	isVisible: boolean;
	position: { top: number; left: number };
	onOptionClick: (option: Party) => void;
	onHide: () => void;
	stateName: UsaState["stateName"];
}

const ContextMenu: FC<ContextMenuProps> = ({
	isVisible,
	position,
	onOptionClick,
	onHide,
	stateName,
}) => {
	return (
		<>
			{isVisible && (
				<div
					className="context-menu"
					style={{ top: position.top, left: position.left }}
				>
					<div className="context-indicator--title">
						Kies een partij voor {stateName}
					</div>

					<div
						className="context-indicator"
						onClick={() => onOptionClick("republican")}
						onKeyDown={() => onOptionClick("republican")}
					>
						<div className="context-indicator--rep" />
						<div>Republikeinen</div>
					</div>

					<div
						className="context-indicator"
						onClick={() => onOptionClick("democrat")}
						onKeyDown={() => onOptionClick("democrat")}
					>
						<div className="context-indicator--dem" />
						<div>Democraten</div>
					</div>
					<div
						className="context-indicator"
						onClick={() => onOptionClick("swing")}
						onKeyDown={() => onOptionClick("swing")}
					>
						<div className="context-indicator--und" />
						<div>Onbeslist</div>
					</div>
				</div>
			)}
			<div
				className={`overlay ${isVisible ? "visible" : ""}`}
				onClick={onHide}
				onKeyDown={onHide}
			/>
		</>
	);
};

export default ContextMenu;
