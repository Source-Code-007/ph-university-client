import { decrement, increment } from "./redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

const GrandChild = () => {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div className="border border-purple-500 rounded-md p-14 m-2">
      <div className="flex gap-1 items-center justify-center">
        <button
          className="p-2 bg-cyan-500 rounded-md text-black font-semibold"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <p className="font-bold">{count}</p>
        <button
          className="p-2 bg-red-500 rounded-md text-white-500 font-semibold"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default GrandChild;
