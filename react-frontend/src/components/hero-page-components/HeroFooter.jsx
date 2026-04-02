function HeroFooter() {
  return (
    <>
      {/* ========== FOOTER ========== */}
      <footer className="mt-auto w-full py-10 bg-background">
        
        <div className="w-full px-4 sm:px-6 lg:px-8">
          
          <div>
            
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
              <div className="col-span-full hidden lg:col-span-1 lg:block">
                <a className="flex-none font-semibold text-xl text-foreground" href="#">
                  FinVue
                </a>
                <p className="mt-3 text-xs sm:text-sm text-gray-400">
                  The modern standard for personal finance management and wealth tracking.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase">Product</h4>
                <div className="mt-3 grid space-y-3 text-sm">
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Features</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Pricing</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Security</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Mobile App</a></p>
                </div>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase">Company</h4>
                <div className="mt-3 grid space-y-3 text-sm">
                  <p><a className="text-gray-400 hover:text-foreground" href="#">About us</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Careers</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Blog</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Press</a></p>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase">Legal</h4>
                <div className="mt-3 grid space-y-3 text-sm">
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Privacy Policy</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Terms of Service</a></p>
                  <p><a className="text-gray-400 hover:text-foreground" href="#">Cookie Policy</a></p>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-5 mt-5 border-t border-gray-100">
              <div className="sm:flex sm:justify-between sm:items-center">
                
                <div className="text-sm text-gray-400">
                  © 2023 FinVue Inc. All rights reserved.
                </div>

                <div className="flex gap-4 mt-3 sm:mt-0 text-sm">
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