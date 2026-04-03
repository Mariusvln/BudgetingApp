function HeroFooter() {

  return (

    <>

      {/* ========== FOOTER ========== */}

      <footer className="mt-auto w-full bg-background py-10">

        <div className="mx-auto w-full max-w-[1820px] px-4 sm:px-6 lg:px-8">

          <div>

            {/* Grid */}

            <div className="mb-10 grid grid-cols-2 gap-6 items-start md:grid-cols-4 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">

              {/* Brand */}

              <div className="col-span-full lg:col-span-1 flex flex-col">

                <a className="flex-none text-xl font-semibold text-foreground" href="#">

                  FinVue

                </a>

                <p className="mt-3 max-w-md text-xs sm:text-sm text-gray-400">

                  The modern standard for personal finance management and wealth tracking.

                </p>

              </div>



              {/* Product */}

              <div>

                <h4 className="text-xs font-semibold uppercase text-foreground">Product</h4>

                <div className="mt-3 grid space-y-3 text-sm">

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Features</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Pricing</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Security</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Mobile App</a></p>

                </div>

              </div>



              {/* Company */}

              <div>

                <h4 className="text-xs font-semibold uppercase text-foreground">Company</h4>

                <div className="mt-3 grid space-y-3 text-sm">

                  <p><a className="text-gray-400 hover:text-foreground" href="#">About us</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Careers</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Blog</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Press</a></p>

                </div>

              </div>



              {/* Legal */}

              <div>

                <h4 className="text-xs font-semibold uppercase text-foreground">Legal</h4>

                <div className="mt-3 grid space-y-3 text-sm">

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Privacy Policy</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Terms of Service</a></p>

                  <p><a className="text-gray-400 hover:text-foreground" href="#">Cookie Policy</a></p>

                </div>

              </div>

            </div>



            {/* Bottom */}

            <div className="mt-5 border-t border-gray-100 pt-5">

              <div className="sm:flex sm:items-center sm:justify-between">

                <div className="text-sm text-gray-400">

                  © 2023 FinVue Inc. All rights reserved.

                </div>



                <div className="mt-3 flex gap-4 text-sm sm:mt-0">

                  <a className="text-gray-400 hover:text-foreground" href="#">Status</a>

                  <a className="text-gray-400 hover:text-foreground" href="#">Security</a>

                  <a className="text-gray-400 hover:text-foreground" href="#">Contact</a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </footer>

      {/* ========== END FOOTER ========== */}

    </>

  );

}



export default HeroFooter;