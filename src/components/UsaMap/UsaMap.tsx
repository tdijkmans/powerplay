import React, { FC, useState } from "react";
import { UsaState } from "../../data/stateData.interface";
import { useGlobal } from "../../stores/useGlobal.store";
import { useHovered } from "../../stores/useHovered.store";
import { useMenu } from "../../stores/useMenu.store";
import { useZoom } from "../../stores/useZoom.store";
import { getPartyColor } from "../../utilities";
import ContextMenu from "../ContextMenu/ContextMenu";
import MapContours from "./MapContours";
import "./UsaMap.scss";

const UsaMap: FC = () => {
	const fiftyStates = useGlobal((state) => state.fiftyStates);
	const openMenu = useMenu((state) => state.openMenu);
	const closeMenu = useMenu((state) => state.closeMenu);
	const setMenuPosition = useMenu((state) => state.setMenuPosition);
	const handleMouseEnter = useHovered((state) => state.handleMouseEnter);
	const handleMouseLeave = useHovered((state) => state.handleMouseLeave);
	const hoveredState = useHovered((state) => state.hoveredState);
	const [clickedState, setClickedState] = useState<UsaState>({} as UsaState);
	const winAState = useGlobal((state) => state.winAState);
	const scale = useZoom((state) => state.scale);
	const handleWheel = useZoom((state) => state.handleWheel);
	const x = useZoom((state) => state.translateX);
	const y = useZoom((state) => state.translateY);
	const sortedStates = fiftyStates?.sort((a) =>
		hoveredState?.id === a.id ? 1 : -1,
	);

	const hideContextMenu = () => {
		closeMenu("contextMenu");
		setMenuPosition("contextMenu", 0, 0);
		setClickedState({} as UsaState);
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
		openMenu("contextMenu");
		setMenuPosition("contextMenu", e.clientX - 250, e.clientY - 250);
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
							fontSize="10px"
							fill="white"
							strokeWidth="0px"
							fontFamily="serif"
						>
							{state.stateName}
						</text>
						<text
							x={state?.x}
							y={state?.y + 16}
							textAnchor="middle"
							fontSize="8px"
							fill="white"
							strokeWidth="0px"
						>
							{state.electoralVotes}
						</text>
					</g>
				))}
			</svg>

			<ContextMenu
				state={clickedState}
				onOptionClick={handleOptionClick}
				onHide={hideContextMenu}
			/>
		</>
	);
};

export default UsaMap;
