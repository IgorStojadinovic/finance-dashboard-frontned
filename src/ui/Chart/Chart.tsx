import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipModel,
} from 'chart.js';
import { Budget } from '../../lib/types/types';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides.doughnut.cutout = '110';
ChartJS.overrides.doughnut.radius = 110;

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function externalTooltip({
  chart,
  tooltip,
}: {
  chart: ChartJS;
  tooltip: TooltipModel<'doughnut'>;
}) {
  const el = chart.canvas.parentElement?.querySelector<HTMLElement>(
    '[data-chart-tooltip]'
  );
  if (!el) return;

  const point = tooltip.dataPoints?.[0];
  if (tooltip.opacity === 0 || !point) {
    el.style.opacity = '0';
    return;
  }

  const arc = point.element as unknown as {
    x: number;
    y: number;
    startAngle: number;
    endAngle: number;
    outerRadius: number;
  };
  const angle = (arc.startAngle + arc.endAngle) / 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = arc.x + cos * (arc.outerRadius + 22);
  const y = arc.y + sin * (arc.outerRadius + 22);
  const shiftX = cos < -0.35 ? '-100%' : cos > 0.35 ? '0%' : '-50%';
  const shiftY = sin < -0.35 ? '-100%' : sin > 0.35 ? '0%' : '-50%';

  const label = el.querySelector<HTMLElement>('[data-tip-label]');
  const value = el.querySelector<HTMLElement>('[data-tip-value]');
  if (label) label.textContent = point.label ?? '';
  if (value) value.textContent = money.format(Number(point.parsed));

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.transform = `translate(${shiftX}, ${shiftY})`;
  el.style.opacity = '1';
}

const Chart = ({ budgetsData }: { budgetsData: Budget[] }) => {
  const data = {
    labels: budgetsData.map(budget => budget.category),
    datasets: [
      {
        data: budgetsData.map(budget => budget.spent),
        backgroundColor: budgetsData.map(budget => budget.hex),
        borderWidth: 0,
        hoverOffset: 0,
        spacing: 2,
      },
    ],
  };

  return (
    <div className='px-8 py-6'>
      <div className='relative'>
        <Doughnut
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
                external: externalTooltip,
              },
            },
          }}
        />

        <div
          data-chart-tooltip
          className='pointer-events-none absolute z-10 flex items-center gap-2 rounded-md bg-grey-900 px-3 py-1.5 text-white opacity-0 ring-2 ring-white'
        >
          <span data-tip-label className='text-preset-5 capitalize' />
          <span data-tip-value className='text-preset-5-bold' />
        </div>

        <div className='pointer-events-none absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center'>
          <h3 className='text-preset-1'>
            {budgetsData.reduce((acc, budget) => acc + budget.spent, 0)}$
          </h3>
          <span className='text-preset-5'>
            of{' '}
            {budgetsData.reduce(
              (acc, budget) => acc + budget.spending_limit,
              0
            )}
            $ limit
          </span>
        </div>
      </div>
    </div>
  );
};

export { Chart };
