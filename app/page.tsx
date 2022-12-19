type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="my-[7vh] md:my-[10vh] w-full md:max-w-xl mx-auto">
      <div className="flex flex-col mx-2 p-6 bg-gray-900 rounded-md shadow-xl">
        <h1 className="font-semibold mb-2 text-xl uppercase tracking-widest">
          This template is buit on top of:
        </h1>
        <hr className="border-2 mb-2 bg-blue-700 border-blue-700 rounded-xl" />
        <ul className="list-disc list-inside">
          <li>Next.js</li>
          <li>React.js</li>
          <li>Typescript</li>
          <li>Firebase</li>
          <li>React-Firebase-Hooks</li>
          <li>Tailwind CSS</li>
        </ul>
        <h1 className="font-semibold mt-4 mb-2 text-xl uppercase tracking-widest">
          This template contains:
        </h1>
        <hr className="border-2 mb-2 bg-blue-700 border-blue-700 rounded-xl" />
        <ul className="list-disc list-inside">
          <li>Home Page</li>
          <li>Login Page</li>
          <li>Signup Page</li>
          <li>Profile</li>
          <li>Forgot Password Page</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
