import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += delta*0.1))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}>
      <boxGeometry args={[5, 0.1, 5]} />
      <meshStandardMaterial color={'#4e6081'} />
    </mesh>
  )
}

export default function Background() {
  return (
    <div className='background'>
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, -2.5, 0]} />
      <OrbitControls enablePan={false} enableZoom={false} /> {/* the rotate/zoom functionality on your canvas. comment out if it gets too much lmao */}
    </Canvas>
  </div>
  )
}
