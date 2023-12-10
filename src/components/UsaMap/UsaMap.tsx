import React, { FC, useState } from "react";
import { UsaState } from "../../data/stateData.interface";
import { useHoveredState } from "../../hooks/useHoveredState";
import { useZoom } from "../../hooks/useZoom";
import useGlobalStore from "../../stores/useGlobalStore";
import { getPartyColor } from "../../utilities";
import ContextMenu from "../ContextMenu/ContextMenu";
import MapContours from "./MapContours";
import "./UsaMap.scss";

const UsaMap: FC = () => {
	const fiftyStates = useGlobalStore((state) => state.fiftyStates);
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	// const [id, setId] = useState("");
	const [contextMenuPosition, setContextMenuPosition] = useState({
		top: 0,
		left: 0,
	});
	const handleMouseEnter = useHoveredState((state) => state.handleMouseEnter);
	const handleMouseLeave = useHoveredState((state) => state.handleMouseLeave);
	const hoveredState = useHoveredState((state) => state.hoveredState);
	const [clickedState, setClickedState] = useState<UsaState>({} as UsaState);
	const winAState = useGlobalStore((state) => state.winAState);
	const sortedStates = fiftyStates?.sort((a) =>
		hoveredState?.id === a.id ? 1 : -1,
	);
	const scale = useZoom((state) => state.scale);
	const handleWheel = useZoom((state) => state.handleWheel);
	const x = useZoom((state) => state.translateX);
	const y = useZoom((state) => state.translateY);

	const hideContextMenu = () => {
		setContextMenuVisible(false);
	};

	const handleOptionClick = (option: UsaState["party"]) => {
		hideContextMenu();
		winAState(option, clickedState);
	};

	const showContextMenu = (
		e: React.MouseEvent<SVGElement, MouseEvent>,
		state: UsaState,
	) => {
		e.preventDefault();
		setClickedState(fiftyStates.find((s) => s.id === state.id) as UsaState);
		// setId(id);
		setContextMenuVisible(true);
		setContextMenuPosition({ top: e.clientY - 250, left: e.clientX - 250 });
	};

	const handleKeyPress = (
		e: React.KeyboardEvent<SVGElement>,
		state: UsaState,
	) => {
		if (e.key === "Enter") {
			showContextMenu(
				e as unknown as React.MouseEvent<SVGElement, MouseEvent>,
				state,
			);
		}
	};

	return (
		<>
			<svg
				onWheel={handleWheel}
				className="board"
				xmlns="http://www.w3.org/2000/svg"
				id="board-graphic"
				width={1000}
				height={589}
				strokeLinejoin="round"
				stroke="#000"
				transform={`scale(${scale}) translate(${x}, ${y})`}
				fill="none"
			>
				<title>usa-map</title>
				<MapContours />

				{sortedStates?.map((state) => (
					<g
						key={state.id}
						id={state.id}
						className={`state-group ${
							hoveredState?.id === state.id ? "hovered" : ""
						}`}
						onClick={(e) => showContextMenu(e, state)}
						onKeyDown={(e) => handleKeyPress(e, state)}
						cursor="pointer"
					>
						<path
							id={state.id}
							key={state.id}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
							d={state.d}
							data-id={state.id}
							data-name={state.stateName}
							fill={getPartyColor(state.wonBy || state.party)}
							opacity={state.wonBy ? 1 : 0.4}
							className={hoveredState?.id === state.id ? "hovered-path" : ""}
						/>
						<text
							id={state.id}
							x={state?.x}
							y={state?.y}
							textAnchor="middle"
							fontSize="12px"
							fill="white"
							stroke="white"
							strokeWidth="1px"
						>
							{state.id}
						</text>
						<text
							x={state?.x}
							y={state?.y + 16}
							textAnchor="middle"
							fontSize="12px"
							stroke="white"
						>
							{state.electoralVotes}
						</text>
					</g>
				))}
			</svg>

			<ContextMenu
				state={clickedState}
				isVisible={contextMenuVisible}
				position={contextMenuPosition}
				onOptionClick={handleOptionClick}
				onHide={hideContextMenu}
			/>
		</>
	);
};

export default UsaMap;
