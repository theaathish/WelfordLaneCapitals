'use client';

import * as React from 'react';
import * as Recharts from 'recharts';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* 1. Extra Recharts types                                            */
/* ------------------------------------------------------------------ */
import type {
  TooltipProps,
  LegendProps,
} from 'recharts'; // convenience
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import type { LegendPayload } from 'recharts';

/* ------------------------------------------------------------------ */
/* 2. Local types / constants                                         */
/* ------------------------------------------------------------------ */

const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

interface ChartContextProps {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error('useChart must be used within <ChartContainer/>');
  return ctx;
}

/* ------------------------------------------------------------------ */
/* 3. Container                                                       */
/* ------------------------------------------------------------------ */

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...rest }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`;
  const ResponsiveContainer = Recharts.ResponsiveContainer as React.ElementType;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          `
          flex aspect-video justify-center text-xs
          [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground
          [&_.recharts-cartesian-grid_line\\[stroke='#ccc'\\]]:stroke-border/50
          [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border
          [&_.recharts-dot\\[stroke='#fff'\\]]:stroke-transparent
          [&_.recharts-layer]:outline-none
          [&_.recharts-polar-grid_\\[stroke='#ccc'\\]]:stroke-border
          [&_.recharts-radial-bar-background-sector]:fill-muted
          [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted
          [&_.recharts-reference-line_\\[stroke='#ccc'\\]]:stroke-border
          [&_.recharts-sector\\[stroke='#fff'\\]]:stroke-transparent
          [&_.recharts-sector]:outline-none
          [&_.recharts-surface]:outline-none
          `,
          className
        )}
        {...rest}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

/* ------------------------------------------------------------------ */
/* 4. Per-chart CSS variables                                         */
/* ------------------------------------------------------------------ */

const ChartStyle: React.FC<{ id: string; config: ChartConfig }> = ({
  id,
  config,
}) => {
  const colorEntries = Object.entries(config).filter(
    ([, c]) => c.color || c.theme
  );
  if (!colorEntries.length) return null;

  const css = Object.entries(THEMES)
    .map(([themeKey, prefix]) => {
      const vars = colorEntries
        .map(([key, item]) => {
          const col =
            item.theme?.[themeKey as keyof typeof item.theme] ?? item.color;
          return col ? `  --color-${key}: ${col};` : '';
        })
        .filter(Boolean)
        .join('\n');
      return `${prefix} [data-chart='${id}'] {\n${vars}\n}`;
    })
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

/* ------------------------------------------------------------------ */
/* 5. Tooltip                                                         */
/* ------------------------------------------------------------------ */

export const ChartTooltip = Recharts.Tooltip;

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    TooltipProps<ValueType, NameType> & {
      label?: React.ReactNode;
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: 'line' | 'dot' | 'dashed';
      nameKey?: string;
      labelKey?: string;
      color?: string;
      payload?: any[];
    }
>((props, ref) => {
  /* ----- de-structure with defaults ----- */
  const {
    className,
    active,
    payload,
    label,
    hideLabel = false,
    hideIndicator = false,
    indicator = 'dot',
    nameKey,
    labelKey,
    formatter,
    labelFormatter,
    color,
    ...rest
  } = props;

  const { config } = useChart();

  /* ----- main label (top row) ----- */
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload;
    const key = labelKey ?? item.dataKey ?? item.name ?? 'value';
    const itemCfg = getPayloadConfig(config, item, key);

    const resolved =
      !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label ?? label
        : itemCfg?.label;

    if (!resolved) return null;

    if (labelFormatter)
      return (
        <div className="font-medium">
          {labelFormatter(resolved, payload)}
        </div>
      );

    return <div className="font-medium">{resolved}</div>;
  }, [hideLabel, payload, label, labelKey, labelFormatter, config]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <div
      ref={ref}
      className={cn(
        'grid min-w-[8rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
      {...rest}
    >
      {!nestLabel && tooltipLabel}

      {payload.map((item: any, index: number) => {
        const key = nameKey ?? item.name ?? item.dataKey ?? 'value';
        const itemCfg = getPayloadConfig(config, item, key);
        const indicatorColor = color ?? item.payload?.fill ?? item.color;

        return (
          <div
            key={item.dataKey ?? index}
            className={cn(
              'flex w-full flex-wrap items-stretch gap-2',
              indicator === 'dot' && 'items-center'
            )}
          >
            {/* ----- custom formatter path ----- */}
            {formatter && item.value !== undefined && item.name ? (
              formatter(item.value, item.name, item, index, item.payload)
            ) : (
              <>
                {/* icon / indicator */}
                {itemCfg?.icon ? (
                  <itemCfg.icon />
                ) : (
                  !hideIndicator && (
                    <div
                      className={cn(
                        'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                        {
                          'h-2.5 w-2.5': indicator === 'dot',
                          'w-1': indicator === 'line',
                          'w-0 border-[1.5px] border-dashed bg-transparent':
                            indicator === 'dashed',
                          'my-0.5': nestLabel && indicator === 'dashed',
                        }
                      )}
                      style={
                        {
                          '--color-bg': indicatorColor,
                          '--color-border': indicatorColor,
                        } as React.CSSProperties
                      }
                    />
                  )
                )}

                {/* label + value */}
                <div
                  className={cn(
                    'flex flex-1 justify-between leading-none',
                    nestLabel ? 'items-end' : 'items-center'
                  )}
                >
                  <div className="grid gap-1.5">
                    {nestLabel && tooltipLabel}
                    <span className="text-muted-foreground">
                      {itemCfg?.label ?? item.name}
                    </span>
                  </div>

                  {item.value !== undefined && (
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {Number(item.value).toLocaleString()}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
});
ChartTooltipContent.displayName = 'ChartTooltipContent';

/* ------------------------------------------------------------------ */
/* 6. Legend                                                          */
/* ------------------------------------------------------------------ */

export const ChartLegend = Recharts.Legend;

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: LegendPayload[];
    verticalAlign?: LegendProps['verticalAlign'];
    hideIcon?: boolean;
    nameKey?: string;
  }
>((props, ref) => {
  const {
    className,
    payload = [],
    verticalAlign = 'bottom',
    hideIcon = false,
    nameKey,
    ...rest
  } = props;

  const { config } = useChart();

  if (!payload.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
      {...rest}
    >
      {payload.map((item: LegendPayload) => {
        const key = nameKey ?? (item.dataKey as string) ?? 'value';
        const itemCfg = getPayloadConfig(config, item, key);

        return (
          <div
            key={item.value as string | number}
            className="flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
          >
            {itemCfg?.icon && !hideIcon ? (
              <itemCfg.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemCfg?.label ?? item.value}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

/* ------------------------------------------------------------------ */
/* 7. Helper                                                          */
/* ------------------------------------------------------------------ */

function getPayloadConfig(
  config: ChartConfig,
  payload: any,
  defaultKey: string
) {
  if (!payload || typeof payload !== 'object') return undefined;

  const nested =
    payload.payload && typeof payload.payload === 'object'
      ? payload.payload
      : undefined;

  let key = defaultKey;

  if (typeof payload[defaultKey] === 'string') {
    key = payload[defaultKey];
  } else if (nested && typeof nested[defaultKey] === 'string') {
    key = nested[defaultKey];
  }

  return config[key] ?? config[defaultKey];
}

/* ------------------------------------------------------------------ */
/* 8. Re-exports                                                      */
/* ------------------------------------------------------------------ */

export { ChartStyle };
