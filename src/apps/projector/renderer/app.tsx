import * as React from 'react';
import electronLogo from '~/assets/electron.svg';
import { Button } from '~/components/ui/button';
import { Versions } from '~/components/versions';

export function App() {
  const versions = window.electron.process.versions;
  const ipcHandle = () => window.electron.ipcRenderer.send('ping');
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    window.action.on('SET_TEXT', (payload) => {
      setText(payload.content);
    });
  }, []);

  return (
    <main className="h-screen grid place-items-center place-content-center gap-4 p-6">
      <img alt="logo" className="w-20 h-20" src={electronLogo} />
      <h1 className="font-bold text-3xl">Worshipflow | Projector App</h1>
      <div className="space-x-2">
        <Button asChild variant="outline">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </Button>
        <Button onClick={ipcHandle}>Send IPC</Button>
      </div>
      <p className="text-center my-4">{text}</p>
      <Versions
        process={{
          chrome: versions.chrome,
          electron: versions.electron,
          node: versions.node,
        }}
      />
    </main>
  );
}
