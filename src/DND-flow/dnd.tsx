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

	function onClickStart() {
		console.log("start")
		elements.forEach((element, index) => {
			if('runtime' in element.data) {
				element.data.runtime()
			}
		})
	}

	var runFunction = () => {
		console.log("run")
	}

	var connectBluetooth = () => {
		console.log("connect")
	}
	var test1Bluetooth = () => {
		console.log("test1")
	}
	var test2Bluetooth = () => {
		console.log("test2")
	}
	var test3Bluetooth = () => {
		console.log("test3")
	}
	var stopBluetooth = () => {
		console.log("stop")
	}

	var table:object = {
		connect: {label: 'connect', runtime: connectBluetooth},
		test1: {label: 'test1', runtime: test1Bluetooth},
		test2: {label: 'test2', runtime: test2Bluetooth},
		test3: {label: 'test3', runtime: test3Bluetooth},
		stop: {label: 'stop', runtime: stopBluetooth},
	}

	var dataLookup = (type:string) => {
		return table[type as keyof typeof table]
	}

	const onDrop = (event: DragEvent) => {
		event.preventDefault()

		if (reactFlowInstance) {
			const type = event.dataTransfer.getData('application/reactflow')
			const typeCommand = event.dataTransfer.getData('application/reactflowcommand')
			const position = reactFlowInstance.project({
				x: event.clientX,
				y: event.clientY - 40,
			})
			const newNode: Node = {
				id: getId(),
				type,
				position,
				data: dataLookup(typeCommand),
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
				<button onClick={onClickStart}>Start</button>
			</ReactFlowProvider>
		</div>
	)
}

export default DnDFlow
