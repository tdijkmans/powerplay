import { FC } from "react";
import { useZoom } from "../../hooks/useZoom";
import "./ZoomControl.scss";

type ZoomControlProps = Record<string, unknown>;

const ZoomControl: FC<ZoomControlProps> = () => {
	const scale = useZoom((state) => state.scale);
	const setScale = useZoom((state) => state.setScale);
	const percentageZoom = `${(scale * 100).toFixed(0)}%`;

	return (
		<div className="ZoomControl">
			Zoom {percentageZoom}
			<button type="button" onClick={() => setScale(scale + 0.1)}>
				+
			</button>
			<button type="button" onClick={() => setScale(1)}>
				Reset
			</button>
			<button type="button" onClick={() => setScale(scale - 0.1)}>
				-
			</button>
		</div>
	);
};

export default ZoomControl;
