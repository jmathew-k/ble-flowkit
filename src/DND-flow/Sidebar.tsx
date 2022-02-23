import React, { DragEvent } from 'react'

const onDragStart = (event: DragEvent, nodeType: string) => {
	event.dataTransfer.setData('application/reactflow', nodeType)
	event.dataTransfer.effectAllowed = 'move'
}

const Sidebar = () => {
	return (
		<aside>
			<div className='description'>
				You can drag these blocks to the pane on the left.
			</div>
			<div
				className='react-flow__node-input'
				onDragStart={(event: DragEvent) => onDragStart(event, 'input')}
				draggable
			>
				Connect Bluetooth
			</div>
			<div
				className='react-flow__node-default'
				onDragStart={(event: DragEvent) => onDragStart(event, 'default')}
				draggable
			>
				BLE Test Sequence 1
			</div>
			<div
				className='react-flow__node-default'
				onDragStart={(event: DragEvent) => onDragStart(event, 'default')}
				draggable
			>
				BLE Test Sequence 2
			</div>
			<div
				className='react-flow__node-default'
				onDragStart={(event: DragEvent) => onDragStart(event, 'default')}
				draggable
			>
				BLE Test Sequence 3
			</div>
			<div
				className='react-flow__node-output'
				onDragStart={(event: DragEvent) => onDragStart(event, 'output')}
				draggable
			>
				Stop Transmission
			</div>
		</aside>
	)
}

export default Sidebar
