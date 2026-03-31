function HeroFooter() {
  return (
    <>
{/* ========== FOOTER ========== */}
<footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
  {/* Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
    <div className="col-span-full hidden lg:col-span-1 lg:block">
      <a className="flex-none font-semibold text-xl text-foreground focus:outline-hidden focus:opacity-80" href="#" aria-label="Brand">FinVue</a>
      <p className="mt-3 text-xs sm:text-sm text-muted-foreground-2">
        The modern standard for personal finance
management and wealth tracking.
      </p>
    </div>
    {/* End Col */}

    <div>
      <h4 className="text-xs font-semibold text-foreground uppercase">Product</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Features</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Pricing</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Security</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Mobile App</a></p>
      </div>
    </div>
    {/* End Col */}

    <div>
      <h4 className="text-xs font-semibold text-foreground uppercase">Company</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">About us</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Careers</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Blog</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Press</a></p>
      </div>
    </div>
    {/* End Col */}

    <div>
      <h4 className="text-xs font-semibold text-foreground uppercase">Legal</h4>

      <div className="mt-3 grid space-y-3 text-sm">
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Privacy Policy</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Terms of Service</a></p>
        <p><a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Cookie Policy</a></p>
      </div>
    </div>
    {/* End Col */}
  </div>
  {/* End Grid */}

  <div className="pt-5 mt-5 border-t border-line-2">
    <div className="sm:flex sm:justify-between sm:items-center">
      <div className="flex flex-wrap items-center gap-3">

        <div className="space-x-4 text-sm">
          <a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">© 2023 FinVue Inc. All rights reserved.</a>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="mt-3 sm:hidden">
          <a className="flex-none font-semibold text-xl text-foreground focus:outline-hidden focus:opacity-80" href="#" aria-label="Brand">Brand</a>
        </div>
         <div className="space-x-4 text-sm">
          <a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Status</a>
        </div>
         <div className="space-x-4 text-sm">
          <a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Security</a>
        </div>
         <div className="space-x-4 text-sm">
          <a className="inline-flex gap-x-2 text-muted-foreground-2 hover:text-foreground focus:outline-hidden focus:text-foreground" href="#">Contact</a>
        </div>
      </div>
      {/* End Col */}
    </div>
  </div>
</footer>
{/* ========== END FOOTER ========== */}
</>
  );
}
export default HeroFooter;
