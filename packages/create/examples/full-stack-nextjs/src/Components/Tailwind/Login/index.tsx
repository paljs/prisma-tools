import React from 'react';

const Login: React.FC = () => {
  return (
    <main>
      <section className="absolute w-full h-full">
        <div
          className="absolute top-0 w-full h-full bg-gray-900"
          style={{
            backgroundImage: 'url(/register_bg_2.png)',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                    >
                      <svg className="w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" version="1.1">
                        <defs />
                        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="UI/icons/dark/github" fill="#182359">
                            <path
                              d="M17.9985267,2 C9.16436969,2 2,9.16338746 2,18.0004911 C2,25.0695847 6.58405721,31.0660855 12.9420179,33.1818042 C13.7425335,33.3291384 14.0342552,32.8350778 14.0342552,32.4107554 C14.0342552,32.0306332 14.020504,31.0248319 14.0126462,29.6899843 C9.56217195,30.6564965 8.62316216,27.5447988 8.62316216,27.5447988 C7.89533135,25.696246 6.84631204,25.2041499 6.84631204,25.2041499 C5.3935971,24.2120998 6.95632156,24.2317444 6.95632156,24.2317444 C8.56226404,24.3447006 9.40697996,25.8809049 9.40697996,25.8809049 C10.834157,28.3256699 13.1522146,27.6194481 14.063722,27.2098591 C14.2090917,26.1765554 14.6226097,25.4713159 15.0793456,25.0715492 C11.5266276,24.6678535 7.7912152,23.294699 7.7912152,17.163633 C7.7912152,15.417232 8.41492986,13.9880905 9.43841125,12.8703152 C9.27339697,12.4656374 8.72433162,10.8380859 9.5955677,8.63593112 C9.5955677,8.63593112 10.9382731,8.20571534 13.9949661,10.2762516 C15.27088,9.9206851 16.6401056,9.7438841 18.0004911,9.7370085 C19.3598944,9.7438841 20.7281378,9.9206851 22.0060161,10.2762516 C25.0607447,8.20571534 26.4014856,8.63593112 26.4014856,8.63593112 C27.2746861,10.8380859 26.7256208,12.4656374 26.5615888,12.8703152 C27.5870346,13.9880905 28.2058381,15.417232 28.2058381,17.163633 C28.2058381,23.3104147 24.4645324,24.6629424 20.9010099,25.0587802 C21.4746309,25.5528408 21.9863716,26.5291752 21.9863716,28.0211793 C21.9863716,30.1604715 21.966727,31.8862457 21.966727,32.4107554 C21.966727,32.8390067 22.255502,33.3369962 23.0668222,33.180822 C29.4198717,31.0601921 34,25.0676202 34,18.0004911 C34,9.16338746 26.8356303,2 17.9985267,2"
                              id="icons/icon-github"
                            />
                          </g>
                        </g>
                      </svg>
                      Github
                    </button>
                    <button
                      className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style={{ transition: 'all .15s ease' }}
                    >
                      <svg className="w-5 mr-1" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs />
                        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="UI/icons/color/google">
                            <g id="Group" transform="translate(2.000000, 2.000000)">
                              <path
                                d="M32.4365525,16.6024012 C32.4365525,15.4515967 32.3313665,14.344128 32.1357206,13.2820585 L16.5492615,13.2820585 L16.5492615,19.5616128 L25.4557094,19.5616128 C25.0721312,21.5908257 23.9059692,23.3098098 22.1535707,24.4613022 L22.1535707,28.5341733 L27.5019274,28.5341733 C30.631561,25.7077204 32.4365525,21.5461142 32.4365525,16.6024012 L32.4365525,16.6024012 Z"
                                id="Shape"
                                fill="#4285F4"
                              />
                              <path
                                d="M16.5492615,32.4674071 C21.0175621,32.4674071 24.7635856,31.0139403 27.5019274,28.5341733 L22.1535707,24.4613022 C20.6718508,25.4353244 18.7756982,26.0110706 16.5492615,26.0110706 C12.2387399,26.0110706 8.59088994,23.1557272 7.2893887,19.3181072 L1.76011213,19.3181072 L1.76011213,23.5244249 C4.48302664,28.8299569 10.0796222,32.4674071 16.5492615,32.4674071 L16.5492615,32.4674071 Z"
                                id="Shape"
                                fill="#34A853"
                              />
                              <path
                                d="M7.2893887,19.3181072 C6.95840347,18.344085 6.77047118,17.3033395 6.77047118,16.2337035 C6.77047118,15.1640676 6.95840347,14.1233221 7.2893887,13.1492999 L7.2893887,8.94298219 L1.76011213,8.94298219 C0.639530783,11.1345322 0,13.6142992 0,16.2337035 C0,18.8531079 0.639530783,21.3328749 1.76011213,23.5244249 L7.2893887,19.3181072 L7.2893887,19.3181072 Z"
                                id="Shape"
                                fill="#FBBC05"
                              />
                              <path
                                d="M16.5492615,6.4563365 C18.9790577,6.4563365 21.160615,7.27558824 22.8758478,8.88382548 L27.6225407,4.22764161 C24.755872,1.60892511 21.0098485,0 16.5492615,0 C10.0803235,0 4.48302664,3.63813805 1.76011213,8.94298219 L7.2893887,13.1492999 C8.59088994,9.31236774 12.2394411,6.4563365 16.5492615,6.4563365 Z"
                                id="Shape"
                                fill="#EA4335"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style={{ transition: 'all .15s ease' }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style={{ transition: 'all .15s ease' }}
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                          style={{ transition: 'all .15s ease' }}
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2">
                  <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-gray-300">
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-gray-300">
                    <small>Create new account</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
