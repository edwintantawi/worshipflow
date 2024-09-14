import electronLogo from '~/assets/electron.svg';
import { Button } from '~/components/ui/button';
import { Versions } from '~/components/versions';

export function App() {
  const versions = window.electron.process.versions;

  function handleClickAction() {
    window.api.action.send({
      type: 'SET_TEXT',
      payload: { content: '[ACTION][SET_TEXT] From Console to Projector' },
    });
  }

  return (
    <main className="h-screen grid place-items-center place-content-center gap-4 p-6">
      <img alt="logo" className="w-20 h-20" src={electronLogo} />
      <h1 className="font-bold text-3xl">Worshipflow | Console App</h1>
      <div className="space-x-2">
        <Button asChild variant="outline">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </Button>
        <Button onClick={handleClickAction}>Send action to projector</Button>
      </div>
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
