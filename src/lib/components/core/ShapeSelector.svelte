<script lang="ts">
  import { run } from 'svelte/legacy';

  import { createEventDispatcher } from 'svelte';
  import { Shape } from '../../Enums/Shape';
  import { Triangle, Circle, Square } from 'lucide-svelte';

  interface Props {
    resetEnabled: boolean;
  }

  let { resetEnabled }: Props = $props();

  const dispatch = createEventDispatcher<{
    shapes: Shape[];
  }>();

  let selectedShapes: (Shape | null)[] = $state([null, null]);

  const shapeOptions = [
    { type: Shape.Triangle, icon: Triangle, label: 'Triangle' },
    { type: Shape.Circle, icon: Circle, label: 'Circle' },
    { type: Shape.Square, icon: Square, label: 'Square' }
  ];

  function selectShape(shape: Shape) {
    const emptyIndex = selectedShapes.findIndex(s => s === null);
    if (emptyIndex !== -1) {
      selectedShapes[emptyIndex] = shape;
    } else {
      selectedShapes = [selectedShapes[1], shape];
    }
    selectedShapes = [...selectedShapes];
    if (selectedShapes.every(s => s !== null)) {
      dispatch('shapes', selectedShapes as Shape[]);
    }
  }

  run(() => {
    if(resetEnabled === false) {
      selectedShapes = [null, null];
    }
  });

  function removeShape(index: number) {
    selectedShapes[index] = null;
    selectedShapes = [...selectedShapes];
  }

  function getShapeName(shape: Shape): string {
    return Shape[shape];
  }
</script>

<div class="container">
  <h3>Select the shapes on your wall</h3>
  <p class="instruction">Click a shape to select it. Click a selected shape to remove it.</p>
  
  <div class="shape-selector">
    {#each selectedShapes as selectedShape, index}
      <div 
        class="shape-slot" 
        onclick={() => removeShape(index)} 
        aria-label={selectedShape ? `Remove ${getShapeName(selectedShape)}` : `Empty slot ${index + 1}`}
      >
        {#if selectedShape !== null}
          {@const SvelteComponent = shapeOptions.find(s => s.type === selectedShape)?.icon}
          <SvelteComponent size={48} />
        {:else}
          <div class="empty-slot">?</div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="shape-options">
    {#each shapeOptions as { type, icon, label }}
      {@const SvelteComponent_1 = icon}
      <button 
        class="shape-button" 
        onclick={() => selectShape(type)}
        aria-label={`Select ${label}`}
      >
        <SvelteComponent_1 size={32} />
      </button>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color);
    max-width: 400px;
    margin: 0 auto;
  }

  h3 {
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .instruction {
    color: var(--text-color);
    font-size: 0.9rem;
    text-align: center;
  }

  .shape-selector {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .shape-slot {
    width: 80px;
    height: 80px;
    border: 2px dashed var(--border-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .empty-slot {
    font-size: 2rem;
    color: var(--text-color);
  }

  .shape-options {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .shape-button {
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 8px;
    background-color: var(--button-bg-color);
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media(hover: hover) and (pointer: fine) {
    .shape-button:hover {
      background-color: var(--hover-background-color);
    }
  }
</style>
