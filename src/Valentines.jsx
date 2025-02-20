import Valentine from './valentine';
import { Canvas } from '@react-three/fiber';
import './home.css';
import { create } from 'zustand';

const useColorStore = create(set => ({
  red: 224,
  green: 33,
  blue: 138,
  setRed: event => set(_ => ({ red: event.target.value })),
  setGreen: event => set(_ => ({ green: event.target.value })),
  setBlue: event => set(_ => ({ blue: event.target.value })),
}));

export function ColorSettings() {
  const red = useColorStore(state => state.red);
  const green = useColorStore(state => state.green);
  const blue = useColorStore(state => state.blue);
  const setRed = useColorStore(state => state.setRed);
  const setGreen = useColorStore(state => state.setGreen);
  const setBlue = useColorStore(state => state.setBlue);

  return (
    <div id="settings">
      <div id="header">Color</div>
      <div id="sliders">
        <input
          id="red"
          value={red}
          onChange={setRed}
          key="red"
          type="range"
          min="0"
          max="255"
        />
        <input
          id="green"
          value={green}
          onChange={setGreen}
          key="green"
          type="range"
          min="0"
          max="255"
        />
        <input
          id="blue"
          value={blue}
          onChange={setBlue}
          key="blue"
          type="range"
          min="0"
          max="255"
        />
      </div>
    </div>
  );
}

export default function Valentines() {
  const red = useColorStore(state => state.red);
  const green = useColorStore(state => state.green);
  const blue = useColorStore(state => state.blue);
  return (
    <div>
      <ColorSettings />
      <div id="home">
        <Canvas camera={{ position: [0, 0, 100], fov: 50 }}>
          <color attach="background" args={['hotpink']} />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} />
          <Valentine color={'rgb(' + red + ',' + green + ',' + blue + ')'} />
        </Canvas>
      </div>
    </div>
  );
}
