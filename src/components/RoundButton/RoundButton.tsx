// templates/component/RoundButton.tsx

import "./RoundButton.scss"; // Import your SCSS file

interface RoundButtonProps {
	onClick: () => void;
	icon: string;
}

function RoundButton(props: RoundButtonProps) {
	return (
		<button className="round-button" type="button" onClick={props.onClick}>
			<span className="material-symbols-outlined">{props.icon}</span>
		</button>
	);
}

export default RoundButton;
