import { FC } from "react";
import { useZoom } from "../../hooks/useZoom";
import "./ZoomControl.scss";

type ZoomControlProps = Record<string, unknown>;

const ZoomControl: FC<ZoomControlProps> = () => {
	const scale = useZoom((state) => state.scale);
	const setScale = useZoom((state) => state.setScale);
	const percentageZoom = `${(scale * 100).toFixed(0)}%`;
	const x = useZoom((state) => state.translateX);
	const y = useZoom((state) => state.translateY);
	const setX = useZoom((state) => state.setTranslateX);
	const setY = useZoom((state) => state.setTranslateY);

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
			<button type="button" onClick={() => setX(x + 50)}>
				{/* right arrow unicode */}
				&#x2192;
			</button>
			<button type="button" onClick={() => setX(x - 500)}>
				{/* left arrow unicode */}
				&#x2190;
			</button>
			<button type="button" onClick={() => setY(y + 50)}>
				{/* down arrow unicode */}
				&#x2193;
			</button>
			<button type="button" onClick={() => setY(y - 50)}>
				{/* up arrow unicode				 */}
				&#x2191;
			</button>
		</div>
	);
};

export default ZoomControl;
