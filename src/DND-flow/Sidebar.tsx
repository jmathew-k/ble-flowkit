import React, { DragEvent } from 'react'

const onDragStart = (event: DragEvent, nodeType: string, commandType: string) => {
	event.dataTransfer.setData('application/reactflow', nodeType)
	event.dataTransfer.setData('application/reactflowcommand', commandType)
	event.dataTransfer.effectAllowed = 'move'
}

const Sidebar = () => {
	var connectFunction = () => {
		console.log("connect")
	}
	return (
		<aside>
			<div className='description'>
				You can drag these blocks to the pane on the left.
			</div>
			<div
				className='react-flow__node-input'
				onDragStart={(event: DragEvent) => onDragStart(event, 'input', 'connect')}
				draggable
			>
				Connect Bluetooth
			</div>
			<div
				className='react-flow__node-default'
				onDragStart={(event: DragEvent) => onDragStart(event, 'default', 'test1')}
				draggable
			>
				BLE Test Sequence 1
			</div>
			<div
				className='react-flow__node-default'
				onDragStart={(event: DragEvent) => onDragStart(event, 'default', 'test2')}
				draggable
			>
				BLE Test Sequence 2
			</div>
			<div
				className='react-flow__node-default'
				onDragStart={(event: DragEvent) => onDragStart(event, 'default', 'test3')}
				draggable
			>
				BLE Test Sequence 3
			</div>
			<div
				className='react-flow__node-output'
				onDragStart={(event: DragEvent) => onDragStart(event, 'output', 'stop')}
				draggable
			>
				Stop Transmission
			</div>
		</aside>
	)
}

export default Sidebar
