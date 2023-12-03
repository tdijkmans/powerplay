import React, { FC, useState } from 'react';
import { stateData } from '../../data/stateData';
import { UsaState } from '../../data/stateData.interface';
import { useHoveredState } from '../../hooks/useHoveredState';
import { useZoom } from '../../hooks/useZoom';
import useGlobalStore from '../../stores/useGlobalStore';
import { getPartyColor } from '../../utilities';
import ContextMenu from '../ContextMenu/ContextMenu';
import MapContours from './MapContours';
import './UsaMap.scss';

interface UsaMapProps { }

const UsaMap: FC<UsaMapProps> = () => {
  const initialStates = stateData.map((s) => ({ ...s, fill: getPartyColor(s.party), opacity: 0.7, }))
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [id, setId] = useState('');
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
  const handleMouseEnter = useHoveredState(state => state.handleMouseEnter)
  const handleMouseLeave = useHoveredState(state => state.handleMouseLeave)
  const hoveredState = useHoveredState(state => state.hoveredState)
  const [states, setStates] = useState(initialStates)
  const [clickedState, setClickedState] = useState<UsaState>({} as UsaState)
  const winAState = useGlobalStore((state) => state.winAState)
  const sortedStates = states?.sort((a) => hoveredState?.id === a.id ? 1 : -1)
  const scale = useZoom(((state) => state.scale))
  const handleWheel = useZoom(state => state.handleWheel)
  const hideContextMenu = () => { setContextMenuVisible(false); };

  const handleOptionClick = (option: UsaState['party']) => {
    hideContextMenu();
    const updatedStates = states.map((s) => s.id === id ? { ...s, fill: getPartyColor(option), opacity: 1 } : s)
    winAState(option, clickedState)
    setStates(updatedStates)
  };

  const showContextMenu = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-id');
    setClickedState(states.find((s) => s.id === id) || {} as UsaState)
    setId(id as string);
    setContextMenuVisible(true);
    setContextMenuPosition({ top: e.clientY - 250, left: e.clientX - 250 });
  };

  return (

    <div className="UsaMap">
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
          transform={`scale(${scale})`}
          fill="none"
        >
          <MapContours />

          {sortedStates?.map((state) => (
            <g
              key={state.id}
              id={state.id}
              className={`state-group ${hoveredState?.id === state.id ? 'hovered' : ''
                }`}
            >
              <path
                id={state.id}
                key={state.id}
                onClick={showContextMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                d={state.d}
                data-id={state.id}
                data-name={state.stateName}
                fill={state.fill}
                opacity={state.opacity}
                stroke={
                  hoveredState?.id === state.id ? 'white' : ''
                }
              />
              <text
                x={state?.x}
                y={state?.y}
                textAnchor="middle"
                fontSize="12px"
                fill="white"
                stroke="white"
                strokeWidth="1px"
                onClick={showContextMenu}
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
          stateName={clickedState.stateName}
          isVisible={contextMenuVisible}
          position={contextMenuPosition}
          onOptionClick={handleOptionClick}
          onHide={hideContextMenu}
        />

      </>
    </div>
  )
}

export default UsaMap;
