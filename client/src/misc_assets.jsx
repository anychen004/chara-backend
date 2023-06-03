import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Pointer(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.z -= delta*0.5)) //TODO ADD CUSTOM ROTATION SO THAT IT GOES FASTER WHEN EDGE-ON
  // Return the view, these are regular Threejs elements expressed in JSX
  
  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <cylinderGeometry args={[1, 1, 0.25, 3]} /> {/* triangular prism. see if I can get to fill screen? */}
      <meshStandardMaterial color={hovered ? "#BF3C1F" : "#F2F2F2"} />
    </mesh>
  )
}

export default function Asset() {
  return (
    <div className='foreground'>
    <Canvas>
        <perspectiveCamera fov={60}/>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Pointer position={[0, 0, 0]} rotation-x={3.141592653589793238462643383279502884197*0.5} /> {/* too lazy to import MATH PI */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} /> {/* the rotate/zoom functionality on your canvas. comment out if it gets too much lmao */}
    </Canvas>
  </div>
  )
}
