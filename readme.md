# Snowstorm: A Wintertime Web Game

## Overview

Snowstorm is a web-based game where players destroy evil (red team) snowmen while avoiding good (green team) snowmen. Destroying good snowmen results in lost points.

This README explains how the visual effects of Snowstorm were created, covering both snowfall and snowmen rendering.

---

## Making it Snow

To create the illusion of snowfall:

- Particles are generated at random positions within a 3D spherical bounding volume, each representing a snowflake.
- These particles slowly rotate around the x-axis to create a swirling effect, giving the appearance of a snowstorm.
- The camera is positioned at the center of the sphere, making the player feel immersed in the storm.

### Code for Generating Snowflake Particles

```javascript
function generateRandomParticleInSphere(radius) {
  const phi = Math.random() * 2 * Math.PI;
  const theta = Math.acos(2 * Math.random() - 1);
  const r = Math.cbrt(Math.random()) * radius;

  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = r * Math.sin(theta) * Math.sin(phi);
  const z = r * Math.cos(theta);

  return [x, y, z];
}
```

### Animating Snowfall

```javascript
useFrame((state, delta) => {
  snow.current.rotation.x -= delta * 0.05;
});
```

Each particle is mapped to a PNG image of a snowflake for realism.

---

## Displaying the Snowmen

Snowmen are created using simple 3D geometry (spheres, cones) and can be either good (green) or evil (red) based on a React prop.

### Snowman Component

```javascript
function Snowman(props) {
  return (
    <group>
      {/* Bottom sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Middle sphere */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={props.evil ? 'red' : 'green'} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 2.4, 0.5]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.2, 2.4, 0.5]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 2.3, 0.6]}>
        <coneGeometry args={[0.1, 0.3, 32]} />
        <meshStandardMaterial color={props.evil ? 'red' : 'green'} />
      </mesh>
    </group>
  );
}
```

---

## The Camera Frustum

The **camera frustum** defines the visible 3D area from the camera's perspective. Snowmen are generated within this frustum to ensure they are always visible when they appear.

---

## Movement

Each frame, snowmen move forward along the z-axis. When they pass the camera, their positions reset to a random location within the camera frustum.

```javascript
useFrame((state, delta) => {
  snowman.current.position.z += delta * speed;
  if (snowman.current.position.z > cameraBoundary) {
    resetSnowmanPosition();
  }
});
```

---

## Destroying Snowmen

Clicking on a snowman makes it invisible, effectively destroying it.

```javascript
<mesh onClick={() => setVisible(false)}>
```

---

## Points System

A point store is created using Zustand to track the player's score.

```javascript
import create from 'zustand';

const useStore = create(set => ({
  points: 0,
  increasePoints: () => set(state => ({ points: state.points + 1 })),
  decreasePoints: () => set(state => ({ points: state.points - 1 })),
}));
```

When a snowman is clicked, the score increases or decreases depending on its type.

```javascript
const { increasePoints, decreasePoints } = useStore();

onClick={() => props.evil ? increasePoints() : decreasePoints()}
```

---

## Technologies Used

- **React Three Fiber** for rendering 3D scenes
- **Zustand** for state management
- **JavaScript (ES6+)** for game logic

---

## Installation & Running the Game

1. Clone the repository:
2. Install dependencies:
   ```sh
   npm install && npm run dev
   ```

---

## Contributions

Contributions are welcome! Feel free to submit a pull request from your fork, or open an issue.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.
