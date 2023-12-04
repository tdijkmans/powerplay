import { FC } from "react";
import "./Card.scss";

interface CardProps {
	children?: React.ReactNode;
	isMenu?: boolean;
	position?: { top: number; left: number };
}

const Card: FC<CardProps> = ({ children, position, isMenu }) => (
	<div
		className="Card"
		style={{
			top: position?.top,
			left: position?.left,
			position: isMenu ? "absolute" : "relative",
			zIndex: isMenu ? 1000 : 0,
		}}
	>
		{children}
	</div>
);

export default Card;
