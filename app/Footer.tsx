import Link from "next/link";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-black/40 p-2 text-center font-semibold">
      Created by:{" "}
      <Link
        href={"https://github.com/hrushikedar33"}
        className="underline text-red-500"
      >
        hrushikedar33
      </Link>
    </div>
  );
};

export default Footer;
