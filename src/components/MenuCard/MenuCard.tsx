import { FC } from "react";
import "./MenuCard.scss";

interface CardProps {
	children?: React.ReactNode;
	position?: { top: number; left: number };
}

const MenuCard: FC<CardProps> = ({ children, position }) => (
	<div
		className="menu-card"
		style={{
			top: position?.top,
			left: position?.left,
		}}
	>
		{children}
	</div>
);

export default MenuCard;
