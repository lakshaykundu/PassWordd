import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState, useEffect } from "react";
const Manager = () => {
  const spanElement = useRef();
  const passRef = useRef();
  const [form, setform] = useState({ site: "", user: "", pass: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000");
    let Passwords = await req.JSON();
    setpasswordArray(Passwords);
  };
  useEffect(() => {
    getPasswords();
  }, []);

  const Showpassword = () => {
    passRef.current.type = "text";
    if (spanElement.current.innerText.includes("visibility_off")) {
      spanElement.current.innerText = "visibility";
      passRef.current.type = "password";
    } else {
      spanElement.current.innerText = "visibility_off";
      passRef.current.type = "text";
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const Savepassword = async () => {
    if (form.site.length > 3 && form.user.length > 3 && form.pass.length > 3) {
      await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify([...passwordArray, { id: form.id }]),
      });
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]),
      });

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      console.log([...passwordArray, form]);
      setform({ site: "", user: "", pass: "" });
      toast("Password save Succesfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Password Not saved");
    }
  };
  const copyText = (text) => {
    toast(" Copy to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  const editPass = (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const deletePass = async (id) => {
    let c = confirm("Do you really wanna delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify([...passwordArray, { id }]),
      });
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
    }
    toast("Password deleted Succesfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 "></div>
      <div className="p-2 md:p-0 md:mycon">
        <h1 className="text-4xl text-center">
          <span className=" text-green-700 font-bold">&lt;</span> Pass
          <span className=" text-green-700 font-bold">OP</span> /&gt;
        </h1>
        <p className="text-lg text-green-900 text-center">
          Your own Passward manger
        </p>
        <div className="flex flex-col gap-8 p-4 items-center text-black">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            name="site"
            type="text"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              value={form.user}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="user"
            />
            <div className="flex justify-around rounded-full border border-green-500 w-full p-4 py-1">
              <input
                value={form.pass}
                ref={passRef}
                onChange={handleChange}
                placeholder="Enter Password"
                className=""
                type="password"
                name="pass"
              />
              <span
                onClick={Showpassword}
                ref={spanElement}
                className="material-symbols-outlined cursor-pointer"
              >
                visibility
              </span>
            </div>
          </div>
          <button
            onClick={Savepassword}
            className="flex justify-end items-center w-fit px-4 py-2 bg-green-500 rounded-full hover:bg-green-400 "
          >
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-3xl py-4s">My Passwords</h2>
          {passwordArray.length === 0 && <div> No password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className=" bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white ">
                        <div className="flex justify-around items-center text-center O">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <span
                            className="material-symbols-outlined size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            content_copy
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className="flex justify-around items-center text-center">
                          {item.user}
                          <span
                            className="material-symbols-outlined size-7 cursor-pointer"
                            onClick={() => copyText(item.user)}
                          >
                            content_copy
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className="flex justify-around items-center text-center">
                          {item.pass}
                          <span
                            className="material-symbols-outlined size-7 cursor-pointer "
                            onClick={() => copyText(item.pass)}
                          >
                            content_copy
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <span
                          className="material-symbols-outlined cursor-pointer"
                          onClick={() => {
                            deletePass(item.id);
                          }}
                        >
                          delete
                        </span>
                        <span
                          className="material-symbols-outlined cursor-pointer"
                          onClick={() => {
                            editPass(item.id);
                          }}
                        >
                          edit
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
