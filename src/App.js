import { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [auxText, setAuxText] = useState(false);
  const [userAuxText, setUserAuxText] = useState(false);

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const hasMinLength = inputValue.length >= 6;
    const hasUppercase = /[A-Z]/.test(inputValue);
    setAuxText(!(hasMinLength && hasUppercase));
  };

  const handleOnClick = () => {
    //aqui se podria hacer un fecth
    setUserAuxText(true);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="user"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User
            </label>
            <div className="mt-2">
              <input
                id="user"
                name="user"
                type="text"
                autoComplete="hidden"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {userAuxText && (
              <div className=" text-xs text-red-400">user allready exist</div>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                maxLength="8"
                required
                value={password}
                onChange={handleOnChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {auxText && (
              <div className=" text-xs text-red-400">
                You need a password with 6 characters and a capital letter
              </div>
            )}
          </div>
          {user.length >= 1 && password.length >= 6 && !auxText ? (
            <>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={city}
                    autoComplete="hidden"
                    required
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </>
          ) : null}

          <div>
            <button
              onClick={handleOnClick}
              type="button"
              disabled={!user || !email || !city || !password}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-10"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
