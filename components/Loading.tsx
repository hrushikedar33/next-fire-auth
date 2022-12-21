import { SignalIcon } from "@heroicons/react/24/solid";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="grid-cols-1 items-center">
      <SignalIcon className="h-20 w-20 text-red-700 mx-auto mt-4 animate-spin" />
    </div>
  );
};

export default Loading;
