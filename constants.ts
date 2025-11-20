import { ToolType } from './types';

export const DEFAULT_STROKE_WIDTH = 4;
export const DEFAULT_HIGHLIGHTER_WIDTH = 20;
export const DEFAULT_ERASER_WIDTH = 30;

export const COLORS = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#22c55e', // Green
  '#3b82f6', // Blue
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#ffffff', // White
  '#94a3b8', // Gray
  '#000000', // Black
];

export const TOOL_CONFIGS = {
  [ToolType.CURSOR]: { label: 'Cursor', icon: 'MousePointer2' },
  [ToolType.PEN]: { label: 'Pen', icon: 'Pen' },
  [ToolType.HIGHLIGHTER]: { label: 'Highlighter', icon: 'Highlighter' },
  [ToolType.ERASER]: { label: 'Eraser', icon: 'Eraser' },
  [ToolType.RECTANGLE]: { label: 'Rectangle', icon: 'Square' },
  [ToolType.CIRCLE]: { label: 'Circle', icon: 'Circle' },
  [ToolType.LINE]: { label: 'Line', icon: 'Minus' },
  [ToolType.ARROW]: { label: 'Arrow', icon: 'ArrowUpRight' },
  [ToolType.TEXT]: { label: 'Text', icon: 'Type' },
};