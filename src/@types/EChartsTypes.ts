// core
import { ComposeOption } from "echarts/core";
// charts
import { LineSeriesOption } from "echarts/charts";
// components
import {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
} from "echarts/components";
// features
// renderers

export type ECOption = ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>;
