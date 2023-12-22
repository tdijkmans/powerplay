import { FC } from "react";
import { useZoom } from "../../hooks/useZoom";
import RoundButton from "../RoundButton/RoundButton";
import "./MapControl.scss";

const MapControl: FC = () => {
	const scale = useZoom((state) => state.scale);
	const setScale = useZoom((state) => state.setScale);
	const percentageZoom = `${(scale * 100).toFixed(0)}%`;
	const x = useZoom((state) => state.translateX);
	const y = useZoom((state) => state.translateY);
	const setX = useZoom((state) => state.setTranslateX);
	const setY = useZoom((state) => state.setTranslateY);
	const reset = useZoom((state) => state.reset);

	return (
		<div className="mapcontrol">
			<RoundButton onClick={() => setScale(scale - 0.1)} icon="zoom_out" />
			<RoundButton onClick={() => setScale(1)} icon="search" />
			<RoundButton onClick={() => setScale(scale + 0.1)} icon="zoom_in" />

			<RoundButton onClick={() => setY(y - 50)} icon="north" />
			<RoundButton onClick={() => setX(x - 50)} icon="west" />
			<RoundButton
				onClick={() => {
					setY(0);
					setX(0);
				}}
				icon="center_focus_strong"
			/>
			<RoundButton onClick={() => setX(x + 50)} icon="east" />
			<RoundButton onClick={() => setY(y + 50)} icon="south" />
			<span className="mapcontrol__zoom-level">{percentageZoom}</span>
			<RoundButton onClick={reset} icon="refresh" />
		</div>
	);
};

export default MapControl;
