const Navbar = () => {
  return (
    <nav className=" bg-slate-800 text-white">
      <div className="mycon font-bold flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className=" text-green-700 font-bold">&lt;</span> Pass
          <span className=" text-green-700 font-bold">OP</span> /&gt;
        </div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/">
              contact
            </a>
            <a className="hover:font-bold" href="/">
              about
            </a>
            <a className="hover:font-bold" href="/">
              Help
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
