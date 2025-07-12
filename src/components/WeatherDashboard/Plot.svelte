<script lang="ts">
  import { Chart, type ChartDataset, type ChartType } from "chart.js/auto";
  import { type Attachment } from "svelte/attachments";
  let {
    type,
    label,
    data,
    labels,
  }: {
    type: ChartType;
    label: string;
    data: Array<number>;
    labels: Array<string>;
  } = $props();

  const drawGraph: Attachment = (node: Element) => {
    const dataset: ChartDataset = {
      label: label,
      data: data,
      fill: false,
    };

    let graph = new Chart(node as HTMLCanvasElement, {
      type: type,
      data: {
        labels: $state.snapshot(labels),
        datasets: [dataset],
      },
    });

    return () => {
      graph.destroy();
    };
  };
</script>

<canvas {@attach drawGraph}></canvas>
