import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { useRef } from 'react';
// Custom heart geometry function
function createHeartGeometry() {
    const geometry = new BufferGeometry();

    const vertices = [];
    const indices = [];

    const uSteps = 64; // Number of divisions in u-direction
    const vSteps = 32; // Number of divisions in v-direction
    const uStepSize = (2 * Math.PI) / uSteps;
    const vStepSize = Math.PI / vSteps;

    // Generate vertices
    for (let vi = 0; vi <= vSteps; vi++) {
        const v = vi * vStepSize;

        for (let ui = 0; ui <= uSteps; ui++) {
            const u = ui * uStepSize;

            const x = Math.sin(v) * (15 * Math.sin(u) - 4 * Math.sin(3 * u));
            const z = 8 * Math.cos(v);
            const y = Math.sin(v) * (15 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(2 * u));

            vertices.push(x, y, z);
        }
    }

    // Generate indices for the faces
    for (let vi = 0; vi < vSteps; vi++) {
        for (let ui = 0; ui < uSteps; ui++) {
            const current = vi * (uSteps + 1) + ui;
            const next = current + uSteps + 1;

            indices.push(current, current + 1, next);
            indices.push(next, current + 1, next + 1);
        }
    }

    // Set vertices and indices in geometry
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
}
export default function Valentine(props) {
    const heartGeometry = createHeartGeometry()

    const heartRef = useRef()

    useFrame((_, delta) => {
        heartRef.current.rotation.y -= delta
    })

    return (
        <mesh ref={heartRef} geometry={heartGeometry}>
            <meshStandardMaterial color={props.color} metalness={0.5} roughness={0.4} />
        </mesh>
    );
};
