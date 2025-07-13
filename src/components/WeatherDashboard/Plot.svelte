<script lang="ts">
  import { Chart, type ChartDataset, type ChartType } from "chart.js/auto";
  import { type Attachment } from "svelte/attachments";
  let {
    type,
    label,
    data,
    labels,
    lollipop = false,
  }: {
    type: ChartType;
    label: string;
    data: Array<number>;
    labels: Array<any>;
    lollipop: boolean;
  } = $props();

  const drawGraph: Attachment = (node: Element) => {
    const lineDataset: ChartDataset = {
      label: label,
      data: data,
    };
    const lollipopDataset: ChartDataset = {
      label: `${label}_acf`,
      data: data,
      borderWidth: 2,
      pointRadius: 8,
      pointHoverRadius: 10,
      showLine: false,
      type: "scatter",
      backgroundColor: "red",
    };

    let datasets: ChartDataset[] = [];

    if (lollipop) {
      datasets.push(lollipopDataset);
    } else {
      datasets.push(lineDataset);
    }

    let graph = new Chart(node as HTMLCanvasElement, {
      type: type,
      data: {
        labels: $state.snapshot(labels),
        datasets,
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      graph.destroy();
    };
  };
</script>

<div class="canvas-container">
  <canvas {@attach drawGraph}></canvas>
</div>

<style>
  .canvas-container {
    width: 100%;
  }
  @media only screen and (min-width: 1024px) {
    .canvas-container {
      width: 50%;
    }
  }
</style>
