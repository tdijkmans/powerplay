import { FC } from "react";
import "./Card.scss";

interface CardProps {
	children?: React.ReactNode;
}

const Card: FC<CardProps> = ({ children }) => (
	<div className="card">{children}</div>
);

export default Card;
