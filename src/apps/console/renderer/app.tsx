import { Versions } from '~/components/versions';

export function App() {
  const versions = window.electron.process.versions;

  return (
    <main className="h-screen grid place-items-center place-content-center gap-4 p-6">
      <h1 className="font-bold text-3xl">Worshipflow | Console App</h1>

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
