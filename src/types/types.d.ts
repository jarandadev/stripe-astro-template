interface Settings {
  theme: 'dark' | 'light';
  columns: number;
  background: {
    color: string;
    pattern: 'none' | 'dots' | 'squares';
    patternColor: string;
    patternOpacity: number;
    patternSize: number;
  }
}