import { screen } from 'electron';

export function getExternalDisplay(): Electron.Display | undefined {
  const displays = screen.getAllDisplays();
  return displays.find((display) => display.bounds.x !== 0 || display.bounds.y !== 0);
}
