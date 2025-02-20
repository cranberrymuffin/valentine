# Valentine

This project demonstrates how to build a 3D heart shape using mathematical equations in 3D space. We use both **implicit** and **parametric** equations to represent and generate the heart's geometry and render it using a 3D mesh.

## Overview

### Implicit Equations vs Parametric Equations

1. **Implicit Equations** define shapes as relationships between variables. For example, a sphere can be represented by the equation:
   \[
   x^2 + y^2 + z^2 = r^2
   \]
   where "r" is the radius.

2. **Parametric Equations** describe each variable as a function of one or more parameters. For example, a sphere can be described with the parametric equations:

   - \( x = r \cdot \sin(\phi) \cdot \cos(\theta) \)
   - \( y = r \cdot \sin(\phi) \cdot \sin(\theta) \)
   - \( z = r \cdot \cos(\phi) \)

   These equations offer an easier approach for computation, especially in code.

### Why Parametric Equations?

When generating coordinates for a mesh, **parametric equations** are easier to implement than implicit equations. Implicit equations define a shape as a set of points satisfying a condition but don’t offer a direct way to generate a list of coordinates, making them computationally difficult to handle. In contrast, parametric equations explicitly define how to compute each point, making them more efficient and simpler to use in code.

## Heart Geometry

The 3D heart is generated using **Julia’s Heart** parametric equations. The mesh is constructed by generating vertices based on the parametric formula and then defining faces (triangles) that connect these vertices. Normals are calculated for proper lighting and shading effects.

### Custom Heart Geometry

```javascript
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
      const y =
        Math.sin(v) *
        (15 * Math.cos(u) -
          5 * Math.cos(2 * u) -
          2 * Math.cos(3 * u) -
          Math.cos(2 * u));

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
```

## Recipe for a Mesh

To generate a 3D mesh, the following components are necessary:

- **Vertices**: Define the shape of the object in 3D space.
- **Faces**: Connect vertices to form surfaces.
- **Normals**: Provide lighting information for realistic rendering.

Without these components, the mesh would not have its full 3D representation. Vertices without faces are just floating points, faces without normals would lack proper lighting, and normals without faces wouldn’t affect any surfaces.

## Installation

1. Clone the repository:

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
