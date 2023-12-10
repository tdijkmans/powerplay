import { FC } from "react";
import { useZoom } from "../../hooks/useZoom";
import "./MapControl.scss";

const MapButton: FC<{ onClick: () => void; icon: string }> = ({
	onClick,
	icon,
}) => (
	<button className="mapcontrol__button" type="button" onClick={onClick}>
		<span className="material-symbols-outlined">{icon}</span>
	</button>
);

type MapControlProps = Record<string, unknown>;

const MapControl: FC<MapControlProps> = () => {
	const scale = useZoom((state) => state.scale);
	const setScale = useZoom((state) => state.setScale);
	const percentageZoom = `${(scale * 100).toFixed(0)}%`;
	const x = useZoom((state) => state.translateX);
	const y = useZoom((state) => state.translateY);
	const setX = useZoom((state) => state.setTranslateX);
	const setY = useZoom((state) => state.setTranslateY);

	return (
		<div className="mapcontrol">
			<div className="mapcontrol__header">
				<div className="mapcontrol__title">
					<span className="material-symbols-outlined">map</span>
					<div className="mapcontrol__zoomlevel">{percentageZoom}</div>
				</div>
			</div>

			<div className="mapcontrol__body">
				<div className="mapcontrol__zoom">
					<MapButton onClick={() => setScale(scale - 0.1)} icon="zoom_out" />
					<MapButton onClick={() => setScale(1)} icon="search" />
					<MapButton onClick={() => setScale(scale + 0.1)} icon="zoom_in" />
				</div>

				<div className="mapcontrol__coordinates">
					<div />
					<MapButton onClick={() => setY(y - 50)} icon="north" />
					<div />
					<MapButton onClick={() => setX(x - 50)} icon="west" />
					<MapButton
						onClick={() => {
							setY(0);
							setX(0);
						}}
						icon="center_focus_strong"
					/>
					<MapButton onClick={() => setX(x + 50)} icon="east" />
					<div />
					<MapButton onClick={() => setY(y + 50)} icon="south" />
					<div />
				</div>
			</div>
		</div>
	);
};

export default MapControl;
