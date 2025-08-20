import { Layout } from "./components";
import { Wordlee } from "./features/wordlee/wordlee";

function App() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mt-4">Wordlee</h1>
      <p>Guess the word!</p>
      <Wordlee />
    </Layout>
  );
}

export default App;
