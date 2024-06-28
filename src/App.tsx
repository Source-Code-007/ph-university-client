import Child from "./Child";
import { useAppSelector } from "./redux/hook";

function App() {
  const { count } = useAppSelector((state) => state.counter);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-4 rounded border border-indigo-500 text-center">
        <p className="font-bold">{count} from parent</p>

        <Child />
      </div>
    </div>
  );
}

export default App;
