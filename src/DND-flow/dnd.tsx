import React, { useState, DragEvent } from 'react'
import ReactFlow, {
	ReactFlowProvider,
	addEdge,
	removeElements,
	Controls,
	OnLoadParams,
	Elements,
	Connection,
	Edge,
	ElementId,
	Node,
	Background,
	MiniMap,
} from 'react-flow-renderer'

import Sidebar from './Sidebar'

import './dnd.css'

const style = {
	background: 'white',
	width: '100%',
	height: 1000,
}

const initialElements = [
	{
		id: '1',
		type: 'input',
		data: { label: 'Connect Bluetooth' },
		position: { x: 250, y: 25 },
	},
]

const onDragOver = (event: DragEvent) => {
	event.preventDefault()
	event.dataTransfer.dropEffect = 'move'
}

let id = 0
const getId = (): ElementId => `dndnode_${id++}`

const DnDFlow = () => {
	const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>()
	const [elements, setElements] = useState<Elements>(initialElements)

	const onConnect = (params: Connection | Edge) =>
		setElements((els) => addEdge(params, els))
	const onElementsRemove = (elementsToRemove: Elements) =>
		setElements((els) => removeElements(elementsToRemove, els))
	const onLoad = (_reactFlowInstance: OnLoadParams) =>
		setReactFlowInstance(_reactFlowInstance)

	const onDrop = (event: DragEvent) => {
		event.preventDefault()

		if (reactFlowInstance) {
			const type = event.dataTransfer.getData('application/reactflow')
			const position = reactFlowInstance.project({
				x: event.clientX,
				y: event.clientY - 40,
			})
			const newNode: Node = {
				id: getId(),
				type,
				position,
				data: { label: `${type} node` },
			}

			setElements((es) => es.concat(newNode))
		}
	}

	return (
		<div className='dndflow'>
			<ReactFlowProvider>
				<div className='reactflow-wrapper'>
					<ReactFlow
						elements={elements}
						onConnect={onConnect}
						onElementsRemove={onElementsRemove}
						onLoad={onLoad}
						onDrop={onDrop}
						onDragOver={onDragOver}
						style={style}
						key='edge-with-button'
					>
						<Controls />
						<MiniMap />
						<Background />
					</ReactFlow>
				</div>
				<Sidebar />
			</ReactFlowProvider>
		</div>
	)
}

export default DnDFlow
