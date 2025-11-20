export enum ToolType {
  PEN = 'PEN',
  HIGHLIGHTER = 'HIGHLIGHTER',
  ERASER = 'ERASER',
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
  LINE = 'LINE',
  ARROW = 'ARROW',
  TEXT = 'TEXT',
  SELECT = 'SELECT' // Basic move/pan if we had infinite canvas, reserved
}

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface DrawStyle {
  color: string;
  width: number;
  opacity: number;
}

export interface AIRequestState {
  loading: boolean;
  error: string | null;
  result: string | null; // Text result or Image URL
}

export enum AITask {
  ANALYZE = 'ANALYZE',
  GENERATE_BG = 'GENERATE_BG',
  FIX_GRAMMAR = 'FIX_GRAMMAR'
}
