const DebugBreakpoint = () => {
  let helper = <div></div>;

  const env = process.env.NODE_ENV;
  if (env == 'development') {
    helper = (
      <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50 p-2 bg-colr-d-bg text-amber-500 rounded">
        <div className="sm:hidden">Default Mobile</div>
        <div className="hidden sm:block md:hidden">SM</div>
        <div className="hidden md:block lg:hidden">MD</div>
        <div className="hidden lg:block xl:hidden">LG</div>
        <div className="hidden xl:block 2xl:hidden">XL</div>
        <div className="hidden 2xl:block">2XL</div>
        {/* Add your custom breakpoint if necessary */}
        <div className="hidden custom:block">Custom</div>
      </div>
    );
  }

  return helper;
};

export default DebugBreakpoint;
