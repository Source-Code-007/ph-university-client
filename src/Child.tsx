import GrandChild from "./GrandChild";
import { decrement, increment } from "./redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

const Child = () => {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();


  return (
    <div className="border border-green-500 rounded-md p-14">
      <div className="flex gap-1 items-center justify-center">
        <button
          className="p-2 bg-purple-500 rounded-md text-white font-semibold"
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

      <GrandChild />

      <div className="flex gap-1">
        {Array.from({ length: count }).map((_, i) =>
          (i + 1) % 5 === 0 ? (
            <p
              key={i}
              className="h-[30px] w-[1px] bg-black rotate-45 mx-2 -translate-x-[20px] -translate-y-1"
            ></p>
          ) : (
            <p key={i} className="h-[20px] w-[1px] bg-black"></p>
          )
        )}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: count }).map(
          (_, i) =>
            (i + 1) % 5 === 0 && <div className="p-6 bg-green-500"></div> 
        )}
      </div>
    </div>
  );
};

export default Child;
