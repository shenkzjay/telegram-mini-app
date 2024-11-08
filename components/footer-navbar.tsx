export const FooterNavbar = () => {
  return (
    <nav className="py-4">
      <ul className="flex flex-row mx-6 text-xs bg-[#262626] p-2 gap-2 rounded-xl text-gray-400">
        <li className="p-4 hover:bg-[#333333] active:bg-[#333] w-full rounded-xl text-center cursor-pointer">
          <a href="/earn">Earn</a>
        </li>
        <li className="p-4 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer">
          <a href="/task">Task</a>
        </li>
        <li className="p-4 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer">
          <a href="/wallet">Wallet</a>
        </li>
        <li className="p-4 hover:bg-[#333333] w-full rounded-xl text-center cursor-pointer">
          <a href="/friends">Friends</a>
        </li>
      </ul>
    </nav>
  );
};
